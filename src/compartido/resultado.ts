export type ResultadoExitoso<TipoValor> = {
  readonly fueExitoso: true;
  readonly valor: TipoValor;
};

export type ResultadoFallido<TipoError> = {
  readonly fueExitoso: false;
  readonly error: TipoError;
};

export type Resultado<TipoValor, TipoError> =
  | ResultadoExitoso<TipoValor>
  | ResultadoFallido<TipoError>;

export function crearExito<TipoValor>(valor: TipoValor): ResultadoExitoso<TipoValor> {
  return { fueExitoso: true, valor };
}

export function crearFallo<TipoError>(error: TipoError): ResultadoFallido<TipoError> {
  return { fueExitoso: false, error };
}