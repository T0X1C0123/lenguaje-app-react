export interface Sena {
  id: number
  nombre: string
  descripcion: string
  url_img: string
  categoria: any
  categorias_relacionadas: Array<{
    id: number
    nombre: string
  }>
}

export interface Question {
  id: number
  text: string
  correctOptionId: number
  options: QuizOption[]
  isNew?: boolean
}

export interface QuizOption {
  id: number
  sena: Sena
}

export interface QuizState {
  currentQuestionIndex: number
  lives: number
  progress: number
  answered: boolean
  isCorrect: boolean | null
  selectedOption: number | null
  completed: boolean
  gameOver: boolean
  loading: boolean
  error: string | null
}
