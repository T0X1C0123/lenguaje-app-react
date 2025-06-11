export interface Question {
  id: number
  text: string
  correctOptionId: number
  options: Option[]
  isNew?: boolean
}

export interface Option {
  id: number
  label: string
  iconType: "milk" | "coffee" | "water"
}

export interface QuizState {
  currentQuestionIndex: number
  lives: number
  progress: number
  answered: boolean
  isCorrect: boolean | null
  selectedOption: number | null
  completed: boolean
  gameOver: boolean // New property to track game over state
}
