import { ComprobanteTransferencia, CuentaBancaria } from '../dominio/cuenta-bancaria';
import { ErrorTransferencia } from '../dominio/errores-transferencia';
import { RepositorioCuentas } from '../repositorio/repositorio-cuentas';
import { Resultado, crearExito, crearFallo } from '../compartido/resultado';

import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';

export class ServicioTransferencias {
  constructor(private readonly repositorioCuentas: RepositorioCuentas) {}

  transferir(
    numeroCuentaOrigen: string,
    numeroCuentaDestino: string,
    montoATransferir: number,
    estrategiaComision: EstrategiaComision,
  ): Resultado<ComprobanteTransferencia, ErrorTransferencia> {

    if (montoATransferir <= 0) {
      return crearFallo({ tipo: 'MONTO_INVALIDO', montoSolicitado: montoATransferir });
    }

    if (numeroCuentaOrigen === numeroCuentaDestino) {
      return crearFallo({ tipo: 'MISMA_CUENTA', numeroCuenta: numeroCuentaOrigen });
    }

    const resultadoCuentaOrigen = this.repositorioCuentas.buscarPorNumero(numeroCuentaOrigen);
    if (!resultadoCuentaOrigen.fueExitoso) {
      return resultadoCuentaOrigen;
    }
    const cuentaOrigen = resultadoCuentaOrigen.valor;

    
    const resultadoCuentaDestino = this.repositorioCuentas.buscarPorNumero(numeroCuentaDestino);
    if (!resultadoCuentaDestino.fueExitoso) {
      return resultadoCuentaDestino;
    }
    const cuentaDestino = resultadoCuentaDestino.valor;

    if (cuentaOrigen.estaBloqueada) {
      return crearFallo({ tipo: 'CUENTA_BLOQUEADA', numeroCuenta: cuentaOrigen.numeroCuenta });
    }

    // if (cuentaOrigen.saldo < montoATransferir) {
    //   return crearFallo({
    //     tipo: 'FONDOS_INSUFICIENTES',
    //     saldoDisponible: cuentaOrigen.saldo,
    //     montoSolicitado: montoATransferir,
    //   });

    const comisionCalculada = estrategiaComision.calcularComision(montoATransferir);

    const totalADebitar = montoATransferir + comisionCalculada;

    if (cuentaOrigen.saldo < totalADebitar) {
      return crearFallo({
        tipo: 'FONDOS_INSUFICIENTES',
        saldoDisponible: cuentaOrigen.saldo,
        montoSolicitado: montoATransferir,
        comisionCalculada,
      });
    }

    
    const cuentaOrigenActualizada: CuentaBancaria = {
      ...cuentaOrigen,
      // saldo: cuentaOrigen.saldo - montoATransferir,
      saldo: cuentaOrigen.saldo - totalADebitar,
    };
    const cuentaDestinoActualizada: CuentaBancaria = {
      ...cuentaDestino,
      saldo: cuentaDestino.saldo + montoATransferir,
    };

    this.repositorioCuentas.guardar(cuentaOrigenActualizada);
    this.repositorioCuentas.guardar(cuentaDestinoActualizada);

    return crearExito({
      numeroCuentaOrigen,
      numeroCuentaDestino,
      montoTransferido: montoATransferir,
      comisionCobrada: comisionCalculada,
      tipoComisionAplicada: estrategiaComision.nombreEstrategia,
      saldoRestanteOrigen: cuentaOrigenActualizada.saldo,
      fechaOperacion: new Date(),
    });
  }
}
