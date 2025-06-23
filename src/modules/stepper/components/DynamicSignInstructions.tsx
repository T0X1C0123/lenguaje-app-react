import type React from "react"
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import { useNavigation } from "../context/NavigationContext"

// Instrucciones específicas para cada letra (esto podría venir de una API)
const letterInstructions: Record<string, { instructions: string; tips: string[] }> = {
  A: {
    instructions: "Puño cerrado con el pulgar al lado, no sobre los dedos.",
    tips: ["Mantén el puño firme", "El pulgar debe estar relajado al costado"],
  },
  B: {
    instructions: "Mano abierta con los dedos juntos y el pulgar doblado hacia la palma.",
    tips: ["Mantén los dedos rectos", "El pulgar debe tocar la palma"],
  },
  C: {
    instructions: "Forma una 'C' con la mano, curvando los dedos.",
    tips: ["Mantén la curvatura natural", "No cierres completamente la mano"],
  },
  D: {
    instructions: "Dedo índice extendido, otros dedos doblados con el pulgar tocándolos.",
    tips: ["Solo el índice debe estar recto", "Mantén el pulgar firme"],
  },
  E: {
    instructions: "Todos los dedos doblados hacia la palma, pulgar sobre los dedos.",
    tips: ["Forma un puño cerrado", "El pulgar debe cubrir los otros dedos"],
  },
  F: {
    instructions: "Pulgar e índice se tocan formando un círculo, otros dedos extendidos.",
    tips: ["Forma un círculo perfecto", "Mantén los otros dedos rectos"],
  },
  G: {
    instructions: "Índice y pulgar extendidos horizontalmente, otros dedos cerrados.",
    tips: ["Forma una 'L' horizontal", "Mantén los dedos paralelos al suelo"],
  },
  H: {
    instructions: "Índice y medio extendidos horizontalmente, otros dedos cerrados.",
    tips: ["Dos dedos paralelos", "Mantén la posición horizontal"],
  },
  I: {
    instructions: "Solo el meñique extendido, otros dedos cerrados con el pulgar.",
    tips: ["Solo el meñique debe estar visible", "Mantén el puño firme"],
  },
  J: {
    instructions: "Meñique extendido hacia arriba, otros dedos cerrados. Mueve la mano en un pequeño arco.",
    tips: ["El meñique debe apuntar hacia arriba", "Haz un movimiento suave en arco"],
  },
  K: {
    instructions: "Índice y medio extendidos en forma de V, pulgar entre ellos, otros dedos cerrados.",
    tips: ["Forma una V con índice y medio", "El pulgar debe estar visible entre los dedos"],
  },
  L: {
    instructions: "Índice extendido hacia arriba, pulgar extendido hacia el lado, otros dedos cerrados.",
    tips: ["Forma una L perfecta", "Mantén los dedos bien rectos"],
  },
  M: {
    instructions: "Pulgar bajo los tres primeros dedos doblados, meñique cerrado.",
    tips: ["El pulgar debe estar completamente cubierto", "Mantén los tres dedos juntos"],
  },
  N: {
    instructions: "Pulgar bajo los dos primeros dedos doblados, otros dedos cerrados.",
    tips: ["Solo dos dedos sobre el pulgar", "Similar a M pero con menos dedos"],
  },
  Ñ: {
    instructions: "Como la N pero con un movimiento ondulado de la muñeca, simulando la tilde de la ñ.",
    tips: ["Haz primero la seña de N", "Agrega un movimiento ondulado suave", "El movimiento debe ser fluido"],
  },
  O: {
    instructions: "Todos los dedos curvados formando un círculo, como si sostuvieras una pelota pequeña.",
    tips: ["Forma un círculo perfecto", "Mantén la curvatura natural de los dedos"],
  },
  P: {
    instructions: "Como K pero apuntando hacia abajo, índice y medio hacia el suelo.",
    tips: ["Similar a K pero invertida", "Los dedos apuntan hacia abajo"],
  },
  Q: {
    instructions: "Como G pero apuntando hacia abajo, índice y pulgar hacia el suelo.",
    tips: ["Similar a G pero invertida", "Mantén la forma de L hacia abajo"],
  },
  R: {
    instructions: "Índice y medio cruzados, otros dedos cerrados con el pulgar.",
    tips: ["Cruza índice y medio", "Mantén los otros dedos bien cerrados"],
  },
  rr: {
    instructions: "Seña de R repetida dos veces rápidamente, o índice y medio vibrando rápidamente.",
    tips: ["Haz la R dos veces seguidas", "El movimiento debe ser rápido", "Mantén la fluidez entre repeticiones"],
  },
  S: {
    instructions: "Puño cerrado con el pulgar sobre los dedos, como la letra A pero con pulgar encima.",
    tips: ["Puño completamente cerrado", "El pulgar debe cubrir los otros dedos"],
  },
  T: {
    instructions: "Pulgar entre índice y medio doblados, otros dedos cerrados.",
    tips: ["El pulgar debe estar visible entre los dedos", "Mantén los dedos bien doblados"],
  },
  U: {
    instructions: "Índice y medio extendidos juntos hacia arriba, otros dedos cerrados.",
    tips: ["Dos dedos juntos y rectos", "Mantén los dedos bien unidos"],
  },
  V: {
    instructions: "Índice y medio extendidos separados en forma de V, otros dedos cerrados.",
    tips: ["Forma una V clara", "Separa bien los dos dedos"],
  },
  W: {
    instructions: "Índice, medio y anular extendidos separados, pulgar y meñique cerrados.",
    tips: ["Tres dedos separados", "Mantén los dedos bien rectos"],
  },
  X: {
    instructions: "Índice doblado en forma de gancho, otros dedos cerrados.",
    tips: ["Solo el índice curvado", "Forma un gancho con el índice"],
  },
  Y: {
    instructions: "Pulgar y meñique extendidos, otros dedos cerrados.",
    tips: ["Solo pulgar y meñique visibles", "Mantén los dedos bien separados"],
  },
  Z: {
    instructions: "Índice extendido, traza la forma de la letra Z en el aire.",
    tips: ["Dibuja una Z en el aire", "Haz el movimiento de forma clara y definida"],
  },
}

export const DynamicSignInstructions: React.FC = () => {
  const { currentLetter } = useNavigation()

  if (!currentLetter) {
    return null
  }

  const letterData = letterInstructions[currentLetter.nombre] || {
    instructions: `Instrucciones para la letra ${currentLetter.nombre}`,
    tips: ["Practica la posición", "Mantén la mano relajada"],
  }

  return (
    <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
      {/* <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {currentLetter.descripcion}
      </Typography> */}

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Descripción:
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {letterData.instructions}
      </Typography>

      {/* <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Consejos:
        </Typography>
        <List disablePadding>
          {letterData.tips.map((tip, index) => (
            <ListItem key={index} sx={{ py: 0.5 }} disablePadding>
              <ListItemIcon sx={{ minWidth: 25 }}>
                <CircleIcon sx={{ fontSize: "0.5rem" }} />
              </ListItemIcon>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
      </Paper> */}

      {/* {currentLetter.categorias_relacionadas.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Categorías: {currentLetter.categorias_relacionadas.map((cat) => cat.nombre).join(", ")}
          </Typography>
        </Box>
      )} */}
    </Box>
  )
}
