export interface CuentaBancaria {
  readonly numeroCuenta: string;
  readonly titular: string;
  readonly saldo: number;
  readonly estaBloqueada: boolean;
}

export interface ComprobanteTransferencia {
  readonly numeroCuentaOrigen: string;
  readonly numeroCuentaDestino: string;
  readonly montoTransferido: number;
  readonly comisionCobrada: number;
  readonly tipoComisionAplicada: string;
  readonly saldoRestanteOrigen: number;
  readonly fechaOperacion: Date;
}
