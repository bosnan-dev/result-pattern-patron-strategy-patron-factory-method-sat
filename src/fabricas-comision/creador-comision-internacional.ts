import { CreadorEstrategiaComision } from './creador-estrategia-comision';
import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ComisionInternacional } from '../estrategias-comision/comision-internacional';

export class CreadorComisionInternacional extends CreadorEstrategiaComision {
  readonly tipoTransferencia = 'INTERNACIONAL';
  readonly montoMaximoPermitido = 20000;

  protected crearEstrategia(): EstrategiaComision {
    return new ComisionInternacional();
  }
}
