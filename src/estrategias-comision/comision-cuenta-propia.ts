import { EstrategiaComision } from './estrategia-comision';

export class ComisionCuentaPropia implements EstrategiaComision {
  readonly nombreEstrategia = 'Cuenta propia (mismo banco)';

  calcularComision(montoATransferir: number): number {
    return 0;
  }
}

