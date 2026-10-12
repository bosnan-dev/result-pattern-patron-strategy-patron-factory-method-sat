import { TipoTransferencia } from './tipo-transferencia';

export type ErrorTransferencia =
  | { readonly tipo: 'CUENTA_NO_ENCONTRADA'; readonly numeroCuenta: string }
  | { readonly tipo: 'CUENTA_BLOQUEADA'; readonly numeroCuenta: string }
  | { readonly tipo: 'MISMA_CUENTA'; readonly numeroCuenta: string }
  | { readonly tipo: 'MONTO_INVALIDO'; readonly montoSolicitado: number }
  | {
      readonly tipo: 'FONDOS_INSUFICIENTES';
      readonly saldoDisponible: number;
      readonly montoSolicitado: number;
      readonly comisionCalculada: number;
    }
  | { readonly tipo: 'TIPO_TRANSFERENCIA_DESCONOCIDO'; readonly tipoRecibido: string }
  | {
      readonly tipo: 'MONTO_EXCEDE_LIMITE';
      readonly tipoTransferencia: TipoTransferencia;
      readonly montoSolicitado: number;
      readonly montoMaximoPermitido: number;
    };

