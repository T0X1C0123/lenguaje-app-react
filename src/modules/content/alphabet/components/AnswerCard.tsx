"use client"

import { Card, CardContent, Box, Typography, Avatar } from "@mui/material"
import type { Option } from "../types"
import MilkIcon from "./icons/MilkIcon"
import CoffeeIcon from "./icons/CoffeeIcon"
import WaterIcon from "./icons/WaterIcon"
import { CheckCircle, XCircle } from "lucide-react"

interface AnswerCardProps {
  option: Option
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
  // Determine border color based on state
  let borderColor = isSelected ? "#2563EB" : "rgba(255,255,255,0.1)"

  if (isCorrect) {
    borderColor = "#58CC02" // Green for correct
  } else if (isIncorrect) {
    borderColor = "#FF4B4B" // Red for incorrect
  }

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        border: `2px solid ${borderColor}`,
        borderRadius: 3,
        cursor: answered ? "default" : "pointer",
        transition: "all 0.2s",
        position: "relative",
        "&:hover": {
          border: answered ? `2px solid ${borderColor}` : "1px solid rgba(255,255,255,0.3)",
        },
      }}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      {isCorrect && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            bgcolor: "#58CC02",
            borderRadius: "50%",
            p: 0.2,
          }}
        >
          <CheckCircle size={24} color="#fff" />
        </Box>
      )}

      {isIncorrect && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            bgcolor: "#FF4B4B",
            borderRadius: "50%",
            p: 0.2,
          }}
        >
          <XCircle size={24} color="#fff" />
        </Box>
      )}

      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          {option.iconType === "milk" && <MilkIcon />}
          {option.iconType === "coffee" && <CoffeeIcon />}
          {option.iconType === "water" && <WaterIcon />}
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {option.label}
        </Typography>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            bgcolor: isCorrect ? "#58CC02" : isIncorrect ? "#FF4B4B" : "rgba(255,255,255,0.1)",
            fontSize: 14,
          }}
        >
          {option.id}
        </Avatar>
      </CardContent>
    </Card>
  )
}
