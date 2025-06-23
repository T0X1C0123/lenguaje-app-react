import type React from "react"
import { Button, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

interface BackButtonProps {
  onClick: () => void
  text: string
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      sx={{
        color: "text.primary",
        justifyContent: "flex-start",
        pl: 0,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Typography variant="body1" color="text.primary">
        {text}
      </Typography>
    </Button>
  )
}
