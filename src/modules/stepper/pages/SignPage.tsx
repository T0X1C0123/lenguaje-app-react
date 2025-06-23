"use client"

import type React from "react"
import { Container, Box } from "@mui/material"
import { BackButton } from "../components/BackButton"
import { SignDisplay } from "../components/SignDisplay"
import { DynamicSignInstructions } from "../components/DynamicSignInstructions"
import { NavigationButtons } from "../components/NavigationButtons"
import { useNavigate } from "react-router"
export const SignPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/nivel-iniciado')
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <BackButton onClick={handleBackClick} text="Volver al Inicio" />
      </Box>

      <SignDisplay />

      <DynamicSignInstructions />

      <NavigationButtons />
    </Container>
  )
}
