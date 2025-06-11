"use client"

import { Box, Typography, Button, Container } from "@mui/material"
import { Frown } from "lucide-react"

interface GameOverScreenProps {
  score: number
  onRestart: () => void
}

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
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
        <Frown size={80} color="#FF4B4B" />

        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#FF4B4B" }}>
          ¡Fin del juego!
        </Typography>

        <Typography variant="body1">
          Has perdido todas tus vidas. ¡Inténtalo de nuevo para mejorar tu puntuación!
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
              bgcolor: "#FF4B4B",
              borderRadius: 6,
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Puntuación final: {Math.round(score)}%
        </Typography>

        <Button
          variant="contained"
          onClick={onRestart}
          sx={{
            borderRadius: 4,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1.1rem",
            bgcolor: "#FF4B4B",
            "&:hover": {
              bgcolor: "#E03A3A",
            },
          }}
        >
          INTENTAR DE NUEVO
        </Button>
      </Box>
    </Container>
  )
}
