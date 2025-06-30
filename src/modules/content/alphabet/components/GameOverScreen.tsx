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
        <Frown size={80} color="#e53e3e" /> {/* CAMBIO: Rojo más suave */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#e53e3e" }}>
          ¡Fin del juego!
        </Typography>
        <Typography variant="body1">
          Has perdido todas tus vidas. ¡Inténtalo de nuevo para mejorar tu puntuación!
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: 12,
            // CAMBIO: Fondo más sutil
            bgcolor: "rgba(92, 124, 250, 0.1)",
            borderRadius: 6,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: `${score}%`,
              height: "100%",
              bgcolor: "#e53e3e", // CAMBIO: Rojo más suave
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
            bgcolor: "#e53e3e", // CAMBIO: Rojo más suave
            "&:hover": {
              bgcolor: "#c53030", // CAMBIO: Hover más suave
            },
          }}
        >
          INTENTAR DE NUEVO
        </Button>
      </Box>
    </Container>
  )
}
