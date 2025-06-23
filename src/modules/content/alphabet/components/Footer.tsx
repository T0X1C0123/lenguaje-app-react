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

  if (answered) {
    buttonText = isCorrect ? "¡CORRECTO!" : "INCORRECTO"
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        // CAMBIO: Fondo más sutil
        // bgcolor: "rgba(248, 250, 255, 0.95)",
        bgcolor: '#EBF4FF',
        backgroundImage: `
          linear-gradient(135deg, rgba(92, 124, 250, 0.03) 0%, rgba(116, 143, 252, 0.03) 100%)
        `,
        borderTop: "1px solid rgba(92, 124, 250, 0.12)", // CAMBIO: Borde más sutil
        backdropFilter: "blur(8px)",
      }}
    >
      <Button
        variant="outlined"
        onClick={onSkip}
        disabled={isSkipDisabled}
        sx={{
          borderRadius: 4,
          px: 3,
          // CAMBIO: Colores más suaves
          color: isSkipDisabled ? "rgba(92, 124, 250, 0.4)" : "#718096",
          borderColor: "rgba(92, 124, 250, 0.2)",
          fontWeight: "bold",
          "&:hover": {
            borderColor: "#5c7cfa",
            bgcolor: "rgba(92, 124, 250, 0.04)",
          },
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
          bgcolor: (() => {
            if (isCheckDisabled) return "rgba(92, 124, 250, 0.15)" // CAMBIO: Azul muy sutil
            if (answered) return isCorrect ? "#38a169" : "#e53e3e" // CAMBIO: Colores más suaves
            return "#5c7cfa" // CAMBIO: Azul más suave
          })(),
          color: isCheckDisabled ? "rgba(92, 124, 250, 0.6)" : "#ffffff",
          "&:hover": {
            bgcolor: (() => {
              if (isCheckDisabled) return "rgba(92, 124, 250, 0.15)"
              if (answered) return isCorrect ? "#2f855a" : "#c53030" // CAMBIO: Hover más suave
              return "#4c63d2" // CAMBIO: Hover azul más suave
            })(),
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  )
}
