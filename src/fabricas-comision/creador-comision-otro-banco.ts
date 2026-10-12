import { CreadorEstrategiaComision } from './creador-estrategia-comision';
import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ComisionOtroBanco } from '../estrategias-comision/comision-otro-banco';

export class CreadorComisionOtroBanco extends CreadorEstrategiaComision {
  readonly tipoTransferencia = 'OTRO_BANCO';
  readonly montoMaximoPermitido = 50000;

  protected crearEstrategia(): EstrategiaComision {
    return new ComisionOtroBanco();
  }
}
