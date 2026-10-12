export interface EstrategiaComision {
  readonly nombreEstrategia: string;
  calcularComision(montoATransferir: number): number;
}