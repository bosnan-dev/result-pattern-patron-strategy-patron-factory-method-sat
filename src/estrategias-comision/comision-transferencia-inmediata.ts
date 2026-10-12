import { EstrategiaComision } from './estrategia-comision';

export class ComisionTransferenciaInmediata implements EstrategiaComision {
  readonly nombreEstrategia = 'Transferencia inmediata (24/7)';
  private readonly comisionFija = 25;

  calcularComision(montoATransferir: number): number {
    return this.comisionFija;
  }
}
