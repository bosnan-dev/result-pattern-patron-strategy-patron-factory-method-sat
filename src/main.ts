import { RepositorioCuentas } from './repositorio/repositorio-cuentas';
import { ServicioTransferencias } from './servicios/servicio-transferencias';
import { ErrorTransferencia } from './dominio/errores-transferencia';


// import { EstrategiaComision } from './estrategias-comision/estrategia-comision';
// import { ComisionOtroBanco } from './estrategias-comision/comision-otro-banco';
// import { ComisionInternacional } from './estrategias-comision/comision-internacional';
// import { ComisionCuentaPropia } from './estrategias-comision/comision-cuenta-propia';
// import { ComisionTransferenciaInmediata } from './estrategias-comision/comision-transferencia-inmediata';


import { RegistroCreadoresComision } from './fabricas-comision/registro-creadores-comision';
import { CreadorComisionCuentaPropia } from './fabricas-comision/creador-comision-cuenta-propia';
import { CreadorComisionOtroBanco } from './fabricas-comision/creador-comision-otro-banco';
import { CreadorComisionInternacional } from './fabricas-comision/creador-comision-internacional';
import { CreadorComisionTransferenciaInmediata } from './fabricas-comision/creador-comision-transferencia-inmediata';
//import { CreadorComisionPlanilla } from './fabricas-comision/creador-comision-planilla';

const repositorioCuentas = new RepositorioCuentas([
  { numeroCuenta: '1001', titular: 'María López', saldo: 1500, estaBloqueada: false },
  { numeroCuenta: '2002', titular: 'Carlos Pérez', saldo: 300, estaBloqueada: false },
  { numeroCuenta: '3003', titular: 'Ana García', saldo: 8000, estaBloqueada: true },
]);

const servicioTransferencias = new ServicioTransferencias(repositorioCuentas);

const registroCreadoresComision = new RegistroCreadoresComision([
  new CreadorComisionCuentaPropia(),
  new CreadorComisionOtroBanco(),
  new CreadorComisionInternacional(),
  new CreadorComisionTransferenciaInmediata(),
  //new CreadorComisionPlanilla(),
]);

function convertirErrorEnMensaje(errorTransferencia: ErrorTransferencia): string {
  switch (errorTransferencia.tipo) {
    case 'CUENTA_NO_ENCONTRADA':
      return `La cuenta ${errorTransferencia.numeroCuenta} no existe.`;
    case 'CUENTA_BLOQUEADA':
      return `La cuenta ${errorTransferencia.numeroCuenta} está bloqueada. Visite una agencia.`;
    case 'MISMA_CUENTA':
      return 'No puede transferir a la misma cuenta.';
    case 'MONTO_INVALIDO':
      return `El monto Q${errorTransferencia.montoSolicitado} no es válido.`;
    case 'FONDOS_INSUFICIENTES':
    //   return `Saldo insuficiente: tiene Q${errorTransferencia.saldoDisponible} y quiere enviar Q${errorTransferencia.montoSolicitado}.`;
         return `Saldo insuficiente: tiene Q${errorTransferencia.saldoDisponible} y necesita Q${errorTransferencia.montoSolicitado} + Q${errorTransferencia.comisionCalculada} de comisión.`;
    case 'TIPO_TRANSFERENCIA_DESCONOCIDO':
      return `El tipo de transferencia "${errorTransferencia.tipoRecibido}" no existe.`;
    case 'MONTO_EXCEDE_LIMITE':
      return `El límite para ${errorTransferencia.tipoTransferencia} es Q${errorTransferencia.montoMaximoPermitido} y solicitó Q${errorTransferencia.montoSolicitado}.`;
     default: {
      const errorNoContemplado: never = errorTransferencia;
      return errorNoContemplado;
    }
  }
}

function ejecutarTransferencia(
  numeroCuentaOrigen: string,
  numeroCuentaDestino: string,
  montoATransferir: number,
//   estrategiaComision: EstrategiaComision,
tipoTransferenciaSeleccionado: string,
): void {
   const resultadoCreador = registroCreadoresComision.obtenerCreador(tipoTransferenciaSeleccionado);  
  if (!resultadoCreador.fueExitoso) {
    console.log(`❌ ${convertirErrorEnMensaje(resultadoCreador.error)}`);
    return;
  }

const resultadoEstrategia = resultadoCreador.valor.prepararEstrategia(montoATransferir);
  if (!resultadoEstrategia.fueExitoso) {
    console.log(`❌ ${convertirErrorEnMensaje(resultadoEstrategia.error)}`);
    return;
  }

  const resultadoTransferencia = servicioTransferencias.transferir(
    numeroCuentaOrigen,
    numeroCuentaDestino,
    montoATransferir,
    // estrategiaComision,
    resultadoEstrategia.valor,
  );

  if (resultadoTransferencia.fueExitoso) {
    const comprobante = resultadoTransferencia.valor;
    console.log(
    //   `✅ Q${comprobante.montoTransferido} de ${comprobante.numeroCuentaOrigen} a ${comprobante.numeroCuentaDestino}. Saldo restante: Q${comprobante.saldoRestanteOrigen}`,
         `✅ [${comprobante.tipoComisionAplicada}] Q${comprobante.montoTransferido} + comisión Q${comprobante.comisionCobrada}. Saldo restante: Q${comprobante.saldoRestanteOrigen}`,
    );
  } else {
    console.log(`❌ ${convertirErrorEnMensaje(resultadoTransferencia.error)}`);
  }
}

// ejecutarTransferencia('1001', '2002', 500);
// ejecutarTransferencia('1001', '2002', 5000);
// ejecutarTransferencia('1001', '9999', 100);
// ejecutarTransferencia('3003', '1001', 100);
// ejecutarTransferencia('1001', '1001', 100);
// ejecutarTransferencia('1001', '2002', -50);


// const comisionCuentaPropia = new ComisionCuentaPropia();
// const comisionOtroBanco = new ComisionOtroBanco();
// const comisionInternacional = new ComisionInternacional();
// const comisionTransferenciaInmediata = new ComisionTransferenciaInmediata();


// ejecutarTransferencia('1001', '2002', 500, comisionCuentaPropia);
// ejecutarTransferencia('1001', '2002', 200, comisionOtroBanco);
// ejecutarTransferencia('1001', '2002', 300, comisionInternacional);
// ejecutarTransferencia('1001', '2002', 400, comisionInternacional);
// ejecutarTransferencia('1001', '9999', 100, comisionOtroBanco);
// ejecutarTransferencia('1001', '2002', 100, comisionTransferenciaInmediata);


ejecutarTransferencia('1001', '2002', 500, 'CUENTA_PROPIA');
ejecutarTransferencia('1001', '2002', 200, 'OTRO_BANCO');
ejecutarTransferencia('1001', '2002', 100, 'INMEDIATA');
ejecutarTransferencia('1001', '2002', 6000, 'INMEDIATA');
ejecutarTransferencia('1001', '2002', 300, 'INTERNACIONAL');
ejecutarTransferencia('1001', '2002', 100, 'CRIPTO');
ejecutarTransferencia('1001', '2002', 200, 'PLANILLA');
ejecutarTransferencia('1001', '9999', 100, 'OTRO_BANCO');