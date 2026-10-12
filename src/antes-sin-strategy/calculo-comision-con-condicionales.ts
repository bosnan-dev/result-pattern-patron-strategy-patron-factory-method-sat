export function calcularComisionConCondicionales(
  tipoTransferencia: string,
  montoATransferir: number,
): number {
  if (tipoTransferencia === 'CUENTA_PROPIA') {
    return 0;
  }

  if (tipoTransferencia === 'OTRO_BANCO') {
    return 10;
  }

  if (tipoTransferencia === 'INTERNACIONAL') {
    const comisionPorcentual = montoATransferir * 0.03;
    return comisionPorcentual < 50 ? 50 : comisionPorcentual;
  }

  return 0;
}

console.log('Cuenta propia Q500:', calcularComisionConCondicionales('CUENTA_PROPIA', 500));
console.log('Otro banco Q500:', calcularComisionConCondicionales('OTRO_BANCO', 500));
console.log('Internacional Q500:', calcularComisionConCondicionales('INTERNACIONAL', 500));
console.log('Internacional Q5000:', calcularComisionConCondicionales('INTERNACIONAL', 5000));
console.log('Escrito mal "INTERNACIONA":', calcularComisionConCondicionales('INTERNACIONA', 5000));
