import { CreadorEstrategiaComision } from './creador-estrategia-comision';
import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ComisionCuentaPropia } from '../estrategias-comision/comision-cuenta-propia';

export class CreadorComisionCuentaPropia extends CreadorEstrategiaComision {
  readonly tipoTransferencia = 'CUENTA_PROPIA';
  readonly montoMaximoPermitido = 100000;

  protected crearEstrategia(): EstrategiaComision {
    return new ComisionCuentaPropia();
  }
}
