import type { Question } from "../types"

export const questions: Question[] = [
  {
    id: 1,
    text: '¿Cuál de estos es "agua"?',
    correctOptionId: 3,
    isNew: true,
    options: [
      { id: 1, label: "milk", iconType: "milk" },
      { id: 2, label: "coffee", iconType: "coffee" },
      { id: 3, label: "water", iconType: "water" },
    ],
  },
  {
    id: 2,
    text: '¿Cuál de estos es "leche"?',
    correctOptionId: 1, 
    options: [
      { id: 1, label: "milk", iconType: "milk" },
      { id: 2, label: "coffee", iconType: "coffee" },
      { id: 3, label: "water", iconType: "water" },
    ],
  },
  {
    id: 3,
    text: '¿Cuál de estos es "café"?',
    correctOptionId: 2,
    options: [
      { id: 1, label: "milk", iconType: "milk" },
      { id: 2, label: "coffee", iconType: "coffee" },
      { id: 3, label: "water", iconType: "water" },
    ],
  },
]
