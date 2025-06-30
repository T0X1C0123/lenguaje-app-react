export interface Categoria {
  id: number
  nombre: string
}

export interface LetraData {
  id: number
  nombre: string
  descripcion: string
  url_img: string
  categoria: string | null
  categorias_relacionadas: Categoria[]
}

export interface ApiResponse {
  data: LetraData[]
}

export interface NavigationState {
  currentIndex: number
  currentLetter: LetraData | null
  totalLetters: number
  letters: LetraData[]
}
