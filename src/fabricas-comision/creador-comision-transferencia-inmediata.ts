import { CreadorEstrategiaComision } from './creador-estrategia-comision';
import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ComisionTransferenciaInmediata } from '../estrategias-comision/comision-transferencia-inmediata';

export class CreadorComisionTransferenciaInmediata extends CreadorEstrategiaComision {
  readonly tipoTransferencia = 'INMEDIATA';
  readonly montoMaximoPermitido = 5000;

  protected crearEstrategia(): EstrategiaComision {
    return new ComisionTransferenciaInmediata();
  }
}
