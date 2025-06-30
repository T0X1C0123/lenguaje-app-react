
import type React from "react"
import { Box, Button } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigation } from "../context/NavigationContext"
import { useNavigate } from 'react-router';

export const NavigationButtons: React.FC = () => {
  const { goToPrevious, goToNext, canGoPrevious, canGoNext, currentIndex, totalLetters } = useNavigation()
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (currentIndex === totalLetters - 1) {
      // User completed all letters, redirect to alphabet page
      navigate('/leccion-abecedario');
    } else {
      goToNext()
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 6,
        mb: 4,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.8rem" }} />}
        onClick={goToPrevious}
        disabled={!canGoPrevious}
        sx={{
          borderColor: "rgba(0, 0, 0, 0.23)",
          color: "text.primary",
          "&:hover": {
            borderColor: "text.primary",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.8rem" }} />}
        onClick={handleNextClick}
        disabled={false} // Remove the disabled state since we handle completion differently
      >
        {currentIndex === totalLetters - 1 ? "Completar" : "Siguiente"}
      </Button>
    </Box>
  )
}
