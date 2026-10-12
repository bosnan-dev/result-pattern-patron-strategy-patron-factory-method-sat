import { CreadorEstrategiaComision } from './creador-estrategia-comision';
import { ErrorTransferencia } from '../dominio/errores-transferencia';
import { Resultado, crearExito, crearFallo } from '../compartido/resultado';

export class RegistroCreadoresComision {
  private readonly creadoresPorTipo = new Map<string, CreadorEstrategiaComision>();

  constructor(creadoresDisponibles: CreadorEstrategiaComision[]) {
    for (const creador of creadoresDisponibles) {
      this.creadoresPorTipo.set(creador.tipoTransferencia, creador);
    }
  }

  obtenerCreador(tipoSolicitado: string): Resultado<CreadorEstrategiaComision, ErrorTransferencia> {
    const creadorEncontrado = this.creadoresPorTipo.get(tipoSolicitado);

    if (!creadorEncontrado) {
      return crearFallo({ tipo: 'TIPO_TRANSFERENCIA_DESCONOCIDO', tipoRecibido: tipoSolicitado });
    }

    return crearExito(creadorEncontrado);
  }
}
