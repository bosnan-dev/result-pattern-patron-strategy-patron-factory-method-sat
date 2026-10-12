import { CuentaBancaria } from '../dominio/cuenta-bancaria';
import { ErrorTransferencia } from '../dominio/errores-transferencia';
import { Resultado, crearExito, crearFallo } from '../compartido/resultado';

export class RepositorioCuentas {
  private readonly cuentasPorNumero = new Map<string, CuentaBancaria>();

  constructor(cuentasIniciales: CuentaBancaria[]) {
    for (const cuenta of cuentasIniciales) {
      this.cuentasPorNumero.set(cuenta.numeroCuenta, cuenta);
    }
  }

  buscarPorNumero(numeroCuenta: string): Resultado<CuentaBancaria, ErrorTransferencia> {
    const cuentaEncontrada = this.cuentasPorNumero.get(numeroCuenta);

    if (!cuentaEncontrada) {
      return crearFallo({ tipo: 'CUENTA_NO_ENCONTRADA', numeroCuenta });
    }

    return crearExito(cuentaEncontrada);
  }

  guardar(cuentaActualizada: CuentaBancaria): void {
    this.cuentasPorNumero.set(cuentaActualizada.numeroCuenta, cuentaActualizada);
  }
}
