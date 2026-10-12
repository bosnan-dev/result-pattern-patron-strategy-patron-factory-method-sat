import { EstrategiaComision } from './estrategia-comision';

export class ComisionInternacional implements EstrategiaComision {
  readonly nombreEstrategia = 'Internacional';
  private readonly porcentajeComision = 0.03;
  private readonly comisionMinima = 50;

  calcularComision(montoATransferir: number): number {
    const comisionPorcentual = montoATransferir * this.porcentajeComision;
    return Math.max(comisionPorcentual, this.comisionMinima);
  }
}
