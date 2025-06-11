"use client"
import Grid from '@mui/material/Grid';
// import { Grid } from "@mui/material"
import AnswerCard from "./AnswerCard"
import type { Option } from "../types"

interface AnswerOptionsProps {
  options: Option[]
  selectedOption: number | null
  onSelectOption: (id: number) => void
  onCheckAnswer: () => void
  answered: boolean
  isCorrect: boolean | null
  correctOptionId: number
}

export default function AnswerOptions({
  options,
  selectedOption,
  onSelectOption,
  onCheckAnswer,
  answered,
  isCorrect,
  correctOptionId,
}: AnswerOptionsProps) {
  return (
    <Grid container spacing={2}>
      {options.map((option) => (
        <Grid  size={4} key={option.id}>
          <AnswerCard
            option={option}
            isSelected={selectedOption === option.id}
            onSelect={() => !answered && onSelectOption(option.id)}
            onDoubleClick={() => selectedOption === option.id && !answered && onCheckAnswer()}
            answered={answered}
            // Only show correct/incorrect for the selected option
            isCorrect={answered && selectedOption === option.id && selectedOption === correctOptionId}
            isIncorrect={answered && selectedOption === option.id && selectedOption !== correctOptionId}
          />
        </Grid>
      ))}
    </Grid>
  )
}
