import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ErrorTransferencia } from '../dominio/errores-transferencia';
import { TipoTransferencia } from '../dominio/tipo-transferencia';
import { Resultado, crearExito, crearFallo } from '../compartido/resultado';

export abstract class CreadorEstrategiaComision {
  abstract readonly tipoTransferencia: TipoTransferencia;
  abstract readonly montoMaximoPermitido: number;

  
  protected abstract crearEstrategia(): EstrategiaComision;

  prepararEstrategia(montoATransferir: number): Resultado<EstrategiaComision, ErrorTransferencia> {
    if (montoATransferir > this.montoMaximoPermitido) {
      return crearFallo({
        tipo: 'MONTO_EXCEDE_LIMITE',
        tipoTransferencia: this.tipoTransferencia,
        montoSolicitado: montoATransferir,
        montoMaximoPermitido: this.montoMaximoPermitido,
      });
    }

    return crearExito(this.crearEstrategia());
  }
}
