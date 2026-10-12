import { EstrategiaComision } from '../estrategias-comision/estrategia-comision';
import { ComisionCuentaPropia } from '../estrategias-comision/comision-cuenta-propia';
import { ComisionOtroBanco } from '../estrategias-comision/comision-otro-banco';
import { ComisionInternacional } from '../estrategias-comision/comision-internacional';
import { ComisionTransferenciaInmediata } from '../estrategias-comision/comision-transferencia-inmediata';

function elegirEstrategiaParaAppMovil(tipoSeleccionado: string): EstrategiaComision {
  switch (tipoSeleccionado) {
    case 'CUENTA_PROPIA':
      return new ComisionCuentaPropia();
    case 'OTRO_BANCO':
      return new ComisionOtroBanco();
    case 'INTERNACIONAL':
      return new ComisionInternacional();
    case 'INMEDIATA':
      return new ComisionTransferenciaInmediata();
    default:
      return new ComisionCuentaPropia();
  }
}

function elegirEstrategiaParaPlanillas(tipoSeleccionado: string): EstrategiaComision {
  switch (tipoSeleccionado) {
    case 'CUENTA_PROPIA':
      return new ComisionCuentaPropia();
    case 'OTRO_BANCO':
      return new ComisionOtroBanco();
    case 'INTERNACIONAL':
      return new ComisionInternacional();
    default:
      return new ComisionCuentaPropia();
  }
}

const estrategiaDesdeAppMovil = elegirEstrategiaParaAppMovil('INMEDIATA');
const estrategiaDesdePlanillas = elegirEstrategiaParaPlanillas('INMEDIATA');

console.log(
  'App móvil   →',
  estrategiaDesdeAppMovil.nombreEstrategia,
  '| comisión Q',
  estrategiaDesdeAppMovil.calcularComision(1000),
);
console.log(
  'Planillas   →',
  estrategiaDesdePlanillas.nombreEstrategia,
  '| comisión Q',
  estrategiaDesdePlanillas.calcularComision(1000),
);
console.log(
  'Tipo "CRIPTO" en app →',
  elegirEstrategiaParaAppMovil('CRIPTO').nombreEstrategia,
);
