"use client"

import { Card, CardContent, Box, Avatar } from "@mui/material"
import type { QuizOption } from "../types"
import { CheckCircle, XCircle } from "lucide-react"

interface AnswerCardProps {
  option: QuizOption
  isSelected: boolean
  onSelect: () => void
  answered: boolean
  isCorrect: boolean
  isIncorrect: boolean
  onDoubleClick: () => void
}

export default function AnswerCard({
  option,
  isSelected,
  onSelect,
  answered,
  isCorrect,
  isIncorrect,
  onDoubleClick,
}: AnswerCardProps) {
  return (
    <Card
      sx={{
        height: "200px",
        width: "100%",
        // CAMBIO: Fondo más sutil y menos intenso
        bgcolor: "rgba(255, 255, 255, 0.8)",
        // CAMBIO: Gradiente muy sutil
        backgroundImage: `
          linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
        `,
        border: (() => {
          if (isCorrect) return "2px solid #38a169" // CAMBIO: Verde más suave
          if (isIncorrect) return "2px solid #e53e3e" // CAMBIO: Rojo más suave
          if (isSelected) return "2px solid #5c7cfa" // CAMBIO: Azul más suave
          return "2px solid rgba(92, 124, 250, 0.15)" // CAMBIO: Borde muy sutil
        })(),
        borderRadius: 3,
        cursor: answered ? "default" : "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        // CAMBIO: Sombras más suaves
        boxShadow: isSelected ? "0 4px 20px rgba(92, 124, 250, 0.15)" : "0 2px 8px rgba(92, 124, 250, 0.06)",
        "&:hover": {
          border: (() => {
            if (answered) {
              if (isCorrect) return "2px solid #38a169"
              if (isIncorrect) return "2px solid #e53e3e"
              if (isSelected) return "2px solid #5c7cfa"
              return "2px solid rgba(92, 124, 250, 0.15)"
            }
            return "2px solid #748ffc" // CAMBIO: Azul más suave en hover
          })(),
          transform: answered ? "none" : "translateY(-2px)",
          // CAMBIO: Sombras más suaves en hover
          boxShadow: answered
            ? isSelected
              ? "0 4px 20px rgba(92, 124, 250, 0.15)"
              : "0 2px 8px rgba(92, 124, 250, 0.06)"
            : "0 6px 25px rgba(116, 143, 252, 0.2)",
          // CAMBIO: Gradiente más sutil en hover
          backgroundImage: answered
            ? `linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)`
            : `linear-gradient(135deg, rgba(92, 124, 250, 0.04) 0%, rgba(116, 143, 252, 0.04) 100%)`,
        },
      }}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      {isCorrect && (
        <Box
          sx={{
            position: "absolute",
            top: -12,
            right: -12,
            bgcolor: "#38a169", // CAMBIO: Verde más suave
            borderRadius: "50%",
            p: 0.3,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(56, 161, 105, 0.3)",
          }}
        >
          <CheckCircle size={24} color="#fff" />
        </Box>
      )}

      {isIncorrect && (
        <Box
          sx={{
            position: "absolute",
            top: -12,
            right: -12,
            bgcolor: "#e53e3e", // CAMBIO: Rojo más suave
            borderRadius: "50%",
            p: 0.3,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(229, 62, 62, 0.3)",
          }}
        >
          <XCircle size={24} color="#fff" />
        </Box>
      )}

      <CardContent sx={{ display: "flex", flexDirection: "column", p: 2, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "150px",
            position: "relative",
            // CAMBIO: Fondo muy sutil
            bgcolor: "rgba(92, 124, 250, 0.03)",
            borderRadius: 2,
            mb: 1,
            border: "1px solid rgba(92, 124, 250, 0.08)", // CAMBIO: Borde muy sutil
            overflow: "hidden",
          }}
        >
          <img
            src={`http://127.0.0.1:8000/${option.sena.url_img}`}
            alt={`Seña para ${option.sena.nombre}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=150&width=150&text=${option.sena.nombre}`
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "auto" }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: isCorrect ? "#38a169" : isIncorrect ? "#e53e3e" : "rgba(92, 124, 250, 0.1)", // CAMBIO: Fondo muy sutil
              fontSize: 14,
              fontWeight: "bold",
              border: "1px solid rgba(92, 124, 250, 0.15)", // CAMBIO: Borde sutil
              color: isCorrect || isIncorrect ? "#fff" : "#5c7cfa", // CAMBIO: Texto azul suave
            }}
          >
            {option.id}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}
