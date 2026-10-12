import { EstrategiaComision } from './estrategia-comision';

export class ComisionOtroBanco implements EstrategiaComision {
  readonly nombreEstrategia = 'Otro banco nacional';
  private readonly comisionFija = 10;

  calcularComision(montoATransferir: number): number {
    return this.comisionFija;
  }
}
