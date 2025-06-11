"use client"

import { Box, Typography, Button, Container } from "@mui/material"
import { Trophy } from "lucide-react"

interface CompletionScreenProps {
  score: number
  livesRemaining: number
  onRestart: () => void
}

export default function CompletionScreen({ score, livesRemaining, onRestart }: CompletionScreenProps) {
  const isPerfect = livesRemaining === 3

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 4,
        }}
      >
        <Trophy size={80} color={isPerfect ? "#FFD700" : "#C0C0C0"} />

        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {isPerfect ? "¡Perfecto!" : "¡Lección completada!"}
        </Typography>

        <Typography variant="body1">
          {isPerfect
            ? "¡Has completado la lección sin errores!"
            : `Has completado la lección con ${livesRemaining} ${livesRemaining === 1 ? "vida" : "vidas"} restante${livesRemaining === 1 ? "" : "s"}.`}
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: 12,
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: 6,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: `${score}%`,
              height: "100%",
              bgcolor: isPerfect ? "#FFD700" : "#58CC02",
              borderRadius: 6,
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={onRestart}
          sx={{
            borderRadius: 4,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          CONTINUAR
        </Button>
      </Box>
    </Container>
  )
}
