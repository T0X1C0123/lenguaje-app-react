"use client"

import type React from "react"
import { ThemeProvider, CssBaseline, CircularProgress, Box, Typography, Button } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { themeStepper } from "../../styles/theme"
import { SignPage } from "./pages/SignPage"
import { NavigationProvider } from "./context/NavigationContext"
import { useLettersData } from "./hooks/useLettersData"
import { useProgress } from "../../context/ProgressContext"
import { useEffect } from "react"

const AppContent: React.FC = () => {
  const { letters, loading, error, refetchLetters } = useLettersData()
  const { updateLessonProgress } = useProgress()

  // Update progress as user navigates through letters
  useEffect(() => {
    if (letters.length > 0) {
      // Calculate progress based on letters viewed (this is a simple example)
      // You might want to implement a more sophisticated progress tracking
      const progressPerLetter = 100 / letters.length
      const currentProgress = progressPerLetter * 0.5 // 50% for viewing, 50% for quiz completion
      updateLessonProgress('abecedario', currentProgress)
    }
  }, [letters.length, updateLessonProgress])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6">Cargando letras...</Typography>
        <Typography variant="body2" color="text.secondary">
          Conectando con la API...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 3,
          px: 3,
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: "4rem", color: "error.main" }} />
        <Typography variant="h5" color="error">
          Error al cargar los datos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
          {error}
        </Typography>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={refetchLetters} sx={{ mt: 2 }}>
          Reintentar
        </Button>
        <Typography variant="caption" color="text.secondary">
          Asegúrate de que la API esté funcionando en: http://127.0.0.1:8000/api/senas
        </Typography>
      </Box>
    )
  }

  if (letters.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">No se encontraron letras</Typography>
        <Button variant="contained" onClick={refetchLetters}>
          Recargar
        </Button>
      </Box>
    )
  }

  return (
    <NavigationProvider letters={letters}>
      <SignPage />
    </NavigationProvider>
  )
}

const Stepper: React.FC = () => {
  return (
    <ThemeProvider theme={themeStepper}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  )
}

export default Stepper