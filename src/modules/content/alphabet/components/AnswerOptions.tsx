"use client"

import { Box } from "@mui/material"
import AnswerCard from "./AnswerCard"
import type { QuizOption } from "../types"

interface AnswerOptionsProps {
  options: QuizOption[]
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 3,
        flexWrap: "wrap",
        maxWidth: "100%",
        mx: "auto",
        px: 2,
        // Responsive behavior
        flexDirection: {
          xs: "column", // Stack vertically on extra small screens
          sm: "row", // Side by side on small screens and up
        },
        alignItem: {
          xs: "center", // Center align when stacked
          sm: "flex-start", // Top align when side by side
        },
      }}
    >
      {options.map((option) => (
        <Box
          key={option.id}
          sx={{
            flex: {
              xs: "none", // No flex on mobile (full width)
              sm: "0 0 auto", // Auto width on larger screens
            },
            minWidth: {
              xs: "280px", // Wider on mobile
              sm: "160px", // Standard width on larger screens
            },
            maxWidth: {
              xs: "320px", // Max width on mobile
              sm: "160px", // Fixed width on larger screens
            },
          }}
        >
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
        </Box>
      ))}
    </Box>
  )
}
