"use client"

import { Box, Button } from "@mui/material"

interface FooterProps {
  skipLabel: string
  checkLabel: string
  isCheckDisabled: boolean
  isSkipDisabled: boolean
  onSkip: () => void
  onCheck: () => void
  answered: boolean
  isCorrect: boolean | null
}

export default function Footer({
  skipLabel,
  checkLabel,
  isCheckDisabled,
  isSkipDisabled,
  onSkip,
  onCheck,
  answered,
  isCorrect,
}: FooterProps) {
  // Determine check button text based on state
  let buttonText = checkLabel
  let buttonColor = "#58CC02"

  if (answered) {
    buttonText = isCorrect ? "¡CORRECTO!" : "INCORRECTO"
    buttonColor = isCorrect ? "#58CC02" : "#FF4B4B"
  }

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="outlined"
        onClick={onSkip}
        disabled={isSkipDisabled}
        sx={{
          borderRadius: 4,
          px: 3,
          color: isSkipDisabled ? "rgba(255,255,255,0.3)" : "text.secondary",
          borderColor: "rgba(255,255,255,0.1)",
          fontWeight: "bold",
        }}
      >
        {skipLabel}
      </Button>
      <Button
        variant="contained"
        disabled={isCheckDisabled}
        onClick={onCheck}
        sx={{
          borderRadius: 4,
          px: 3,
          fontWeight: "bold",
          bgcolor: isCheckDisabled ? "rgba(255,255,255,0.1)" : buttonColor,
          color: isCheckDisabled ? "rgba(255,255,255,0.3)" : "#0A1019",
          "&:hover": {
            bgcolor: isCheckDisabled ? "rgba(255,255,255,0.1)" : buttonColor,
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  )
}
