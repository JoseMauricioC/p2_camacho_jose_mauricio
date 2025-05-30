import type { Pais } from './pais'

export interface Serie {
  id: number
  idPais: number
  tipoClasificacion: string
  titulo: string
  sinopsis: string
  director: string
  temporadas: number
  fechaEstreno: Date
  paises: Pais
}
