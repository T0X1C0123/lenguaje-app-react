"use client"

import { useReducer, useEffect, useState } from "react"
import { Box, Container, ThemeProvider, CircularProgress, Alert, Typography } from "@mui/material"
import { lightTheme } from "../../../styles/theme"
import Header from "./components/Header"
import QuestionPrompt from "./components/QuestionPrompt"
import AnswerOptions from "./components/AnswerOptions"
import Footer from "./components/Footer"
import CompletionScreen from "./components/CompletionScreen"
import GameOverScreen from "./components/GameOverScreen"
import { senasApi } from "./services/api"
import { generateQuestions } from "./utils/quiz-generator"
import { useProgress } from "../../../context/ProgressContext"
import type { QuizState, Question } from "./types"

type QuizAction =
  | { type: "SELECT_OPTION"; payload: number }
  | { type: "CHECK_ANSWER"; payload: { isCorrect: boolean; newLives: number; gameOver: boolean; newProgress: number } }
  | { type: "NEXT_QUESTION" }
  | { type: "SKIP_QUESTION" }
  | { type: "RESET_QUIZ" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

const initialState: QuizState = {
  currentQuestionIndex: 0,
  lives: 3,
  progress: 0,
  answered: false,
  isCorrect: null,
  selectedOption: null,
  completed: false,
  gameOver: false,
  loading: true,
  error: null,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      }
    case "CHECK_ANSWER": {
      const { isCorrect, newLives, gameOver, newProgress } = action.payload

      return {
        ...state,
        answered: true,
        isCorrect,
        lives: newLives,
        progress: newProgress,
        gameOver,
      }
    }
    case "NEXT_QUESTION": {
      if (state.gameOver) {
        return state
      }

      const nextIndex = state.currentQuestionIndex + 1
      const isCompleted = nextIndex >= 4

      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        answered: false,
        isCorrect: null,
        selectedOption: null,
        completed: isCompleted,
      }
    }
    case "SKIP_QUESTION": {
      const nextIndex = state.currentQuestionIndex + 1
      const isCompleted = nextIndex >= 4

      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        answered: false,
        isCorrect: null,
        selectedOption: null,
        completed: isCompleted,
      }
    }
    case "RESET_QUIZ":
      return { ...initialState, loading: false }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default function LanguageQuizMUI() {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const [questions, setQuestions] = useState<Question[]>([])
  const { updateLessonProgress, completLesson } = useProgress()

  // Load questions from API
  useEffect(() => {
    async function loadQuestions() {
      try {
        dispatch({ type: "SET_LOADING", payload: true })
        console.log("Loading quiz questions...")

        const senas = await senasApi.getSenas()
        console.log("Loaded senas:", senas.length, "items")

        if (senas.length === 0) {
          throw new Error("No senas available")
        }

        const numQuestions = Math.min(4, senas.length)
        const generatedQuestions = generateQuestions(senas, numQuestions)
        setQuestions(generatedQuestions)
        dispatch({ type: "SET_LOADING", payload: false })

        console.log("Quiz ready with", generatedQuestions.length, "questions")
      } catch (error) {
        console.error("Error loading questions:", error)
        dispatch({
          type: "SET_ERROR",
          payload: "Error al cargar el quiz. Por favor, verifica que la API esté funcionando.",
        })
      }
    }

    loadQuestions()
  }, [])

  // Auto-advance to next question after delay when answered
  useEffect(() => {
    if (state.answered && !state.gameOver) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" })
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [state.answered, state.gameOver])

  // Update lesson progress when quiz state changes
  useEffect(() => {
    if (state.progress > 0) {
      updateLessonProgress('abecedario', state.progress)
    }
  }, [state.progress, updateLessonProgress])

  // Complete lesson when quiz is completed successfully
  useEffect(() => {
    if (state.completed && state.lives > 0) {
      completLesson('abecedario')
    }
  }, [state.completed, state.lives, completLesson])

  // Handle check answer with proper question data
  const handleCheckAnswer = () => {
    if (!state.selectedOption || !questions[state.currentQuestionIndex]) return

    const currentQuestion = questions[state.currentQuestionIndex]
    const isCorrect = state.selectedOption === currentQuestion.correctOptionId

    // Only reduce lives if the answer is incorrect
    const newLives = isCorrect ? state.lives : state.lives - 1
    const gameOver = newLives <= 0

    let newProgress = state.progress
    if (isCorrect) {
      newProgress = Math.min(100, state.progress + 100 / questions.length)
    } else {
      newProgress = Math.max(0, state.progress - 100 / questions.length / 2)
    }

    dispatch({
      type: "CHECK_ANSWER",
      payload: { isCorrect, newLives, gameOver, newProgress },
    })
  }

  const handleRestart = async () => {
    dispatch({ type: "RESET_QUIZ" })
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const senas = await senasApi.getSenas()
      const numQuestions = Math.min(4, senas.length)
      const generatedQuestions = generateQuestions(senas, numQuestions)
      setQuestions(generatedQuestions)
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error al reiniciar el quiz.",
      })
    }
  }

  // Loading state
  if (state.loading) {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(92, 124, 250, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(116, 143, 252, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
            `,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ mb: 2, color: "#5c7cfa" }} />
            <Typography variant="h6">Cargando quiz de señas...</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Obteniendo datos de la API...
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }

  // Error state
  if (state.error) {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(92, 124, 250, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(116, 143, 252, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
            `,
          }}
        >
          <Alert severity="error" sx={{ maxWidth: 500 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Error al cargar el quiz
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {state.error}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Asegúrate de que la API esté ejecutándose en: http://127.0.0.1:8000/api/senas
            </Typography>
            <Box sx={{ mt: 2 }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#5c7cfa",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Reintentar
              </button>
            </Box>
          </Alert>
        </Box>
      </ThemeProvider>
    )
  }

  // Show game over screen when lives reach 0
  if (state.gameOver) {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(92, 124, 250, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(116, 143, 252, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
            `,
          }}
        >
          <GameOverScreen score={state.progress} onRestart={handleRestart} />
        </Box>
      </ThemeProvider>
    )
  }

  // Show completion screen when all questions are answered
  if (state.completed) {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(92, 124, 250, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(116, 143, 252, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
            `,
          }}
        >
          <CompletionScreen score={state.progress} livesRemaining={state.lives} onRestart={handleRestart} />
        </Box>
      </ThemeProvider>
    )
  }

  const currentQuestion = questions[state.currentQuestionIndex]
  if (!currentQuestion) return null

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          bgcolor: "#EBF4FF",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(92, 124, 250, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(116, 143, 252, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(92, 124, 250, 0.02) 0%, rgba(116, 143, 252, 0.02) 100%)
          `,
        }}
      >
        <Header progress={state.progress} lives={state.lives} />
        <Container maxWidth="md" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <QuestionPrompt
            badgeText={currentQuestion.isNew ? "Seña nueva" : "Práctica"}
            question={currentQuestion.text}
          />

          <AnswerOptions
            options={currentQuestion.options}
            selectedOption={state.selectedOption}
            onSelectOption={(id) => dispatch({ type: "SELECT_OPTION", payload: id })}
            onCheckAnswer={handleCheckAnswer}
            answered={state.answered}
            isCorrect={state.isCorrect}
            correctOptionId={currentQuestion.correctOptionId}
          />
        </Container>
        <Footer
          skipLabel="SALTAR"
          checkLabel="COMPROBAR"
          isCheckDisabled={!state.selectedOption || state.answered}
          isSkipDisabled={state.answered}
          onSkip={() => dispatch({ type: "SKIP_QUESTION" })}
          onCheck={handleCheckAnswer}
          answered={state.answered}
          isCorrect={state.isCorrect}
        />
      </Box>
    </ThemeProvider>
  )
}