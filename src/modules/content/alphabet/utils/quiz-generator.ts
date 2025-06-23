import type { Sena, Question, QuizOption } from "../types"

export function generateQuestions(senas: Sena[], numQuestions = 10): Question[] {
  if (senas.length < 3) {
    throw new Error("Need at least 3 senas to generate questions")
  }

  const questions: Question[] = []
  const usedSenas = new Set<number>()

  for (let i = 0; i < Math.min(numQuestions, senas.length); i++) {
    // Select a random sena that hasn't been used as the correct answer
    let correctSena: Sena
    do {
      correctSena = senas[Math.floor(Math.random() * senas.length)]
    } while (usedSenas.has(correctSena.id))

    usedSenas.add(correctSena.id)

    // Select 2 random incorrect options
    const incorrectOptions: Sena[] = []
    while (incorrectOptions.length < 2) {
      const randomSena = senas[Math.floor(Math.random() * senas.length)]
      if (randomSena.id !== correctSena.id && !incorrectOptions.some((option) => option.id === randomSena.id)) {
        incorrectOptions.push(randomSena)
      }
    }

    // Create options array with correct answer in random position
    const allOptions = [correctSena, ...incorrectOptions]
    const shuffledOptions = shuffleArray(allOptions)

    const options: QuizOption[] = shuffledOptions.map((sena, index) => ({
      id: index + 1,
      sena,
    }))

    // Find the correct option ID after shuffling
    const correctOptionId = options.find((option) => option.sena.id === correctSena.id)?.id || 1

    questions.push({
      id: i + 1,
      text: `¿Cuál de estas es la seña para "${correctSena.nombre}"?`,
      correctOptionId,
      options,
      isNew: i < 3, // Mark first 3 questions as new
    })
  }

  return questions
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
