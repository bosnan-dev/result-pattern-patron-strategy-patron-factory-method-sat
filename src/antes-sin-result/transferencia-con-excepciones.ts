interface CuentaBancariaSimple {
  numeroCuenta: string;
  titular: string;
  saldo: number;
}

const cuentasRegistradas = new Map<string, CuentaBancariaSimple>([
  ['1001', { numeroCuenta: '1001', titular: 'María López', saldo: 1500 }],
  ['2002', { numeroCuenta: '2002', titular: 'Carlos Pérez', saldo: 300 }],
]);

export function transferirConExcepciones(
  numeroCuentaOrigen: string,
  numeroCuentaDestino: string,
  montoATransferir: number,
): number {
  const cuentaOrigen = cuentasRegistradas.get(numeroCuentaOrigen);
  if (!cuentaOrigen) {
    throw new Error('Cuenta origen no existe');
  }

  const cuentaDestino = cuentasRegistradas.get(numeroCuentaDestino);
  if (!cuentaDestino) {
    throw new Error('Cuenta destino no existe');
  }

  if (cuentaOrigen.saldo < montoATransferir) {
    throw new Error('Fondos insuficientes');
  }

  cuentaOrigen.saldo -= montoATransferir;
  cuentaDestino.saldo += montoATransferir;
  return cuentaOrigen.saldo;
}

try {
  const saldoRestante = transferirConExcepciones('1001', '2002', 5000);
  console.log('Saldo restante:', saldoRestante);
} catch (errorCapturado) {
  if (errorCapturado instanceof Error && errorCapturado.message === 'Fondos insuficientes') {
    console.log('Mostrar al cliente: no le alcanza el saldo');
  } else {
    console.log('Error desconocido:', errorCapturado);
  }
}
