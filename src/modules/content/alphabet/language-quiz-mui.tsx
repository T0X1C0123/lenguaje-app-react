"use client"

import { useReducer, useEffect } from "react"
import { Box, Container, ThemeProvider } from "@mui/material"
import { darkTheme } from "../../../styles/theme"
import Header from "./components/Header"
import QuestionPrompt from "./components/QuestionPrompt"
import AnswerOptions from "./components/AnswerOptions"
import Footer from "./components/Footer"
import CompletionScreen from "./components/CompletionScreen"
import GameOverScreen from "./components/GameOverScreen"
import { questions } from "./data/questions"
import type { QuizState } from "./types"

type QuizAction =
  | { type: "SELECT_OPTION"; payload: number }
  | { type: "CHECK_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "SKIP_QUESTION" }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  currentQuestionIndex: 0,
  lives: 3,
  progress: 0,
  answered: false,
  isCorrect: null,
  selectedOption: null,
  completed: false,
  gameOver: false,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      }
    case "CHECK_ANSWER": {
      const currentQuestion = questions[state.currentQuestionIndex]
      const isCorrect = state.selectedOption === currentQuestion.correctOptionId
      const newLives = isCorrect ? state.lives : state.lives - 1
      const gameOver = newLives <= 0

      // Update progress based on correct/incorrect answer
      let newProgress = state.progress
      if (isCorrect) {
        // Increment progress when correct
        newProgress = Math.min(100, state.progress + 100 / questions.length)
      } else {
        // Decrement progress when incorrect (but not below 0)
        newProgress = Math.max(0, state.progress - 100 / questions.length / 2)
      }

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
      // If game is over due to no lives, don't advance to next question
      if (state.gameOver) {
        return state
      }

      const nextIndex = state.currentQuestionIndex + 1
      const isCompleted = nextIndex >= questions.length

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
      const isCompleted = nextIndex >= questions.length
      const newLives = isCompleted ? state.lives : state.lives - 1

      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        isCorrect: null,
        selectedOption: null,
        completed: isCompleted,
        lives: newLives,
      }
    }
    case "RESET_QUIZ":
      return initialState
    default:
      return state
  }
}

export default function LanguageQuizMUI() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // Auto-advance to next question after delay when answered
  useEffect(() => {
    if (state.answered && !state.gameOver) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" })
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [state.answered, state.gameOver])

  // Show game over screen when lives reach 0
  if (state.gameOver) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GameOverScreen score={state.progress} onRestart={() => dispatch({ type: "RESET_QUIZ" })} />
        </Box>
      </ThemeProvider>
    )
  }

  // Show completion screen when all questions are answered
  if (state.completed) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CompletionScreen
            score={state.progress}
            livesRemaining={state.lives}
            onRestart={() => dispatch({ type: "RESET_QUIZ" })}
          />
        </Box>
      </ThemeProvider>
    )
  }

  const currentQuestion = questions[state.currentQuestionIndex]

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header progress={state.progress} lives={state.lives} />

        <Container maxWidth="sm" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <QuestionPrompt
            badgeText={currentQuestion.isNew ? "Palabra nueva" : "Práctica"}
            question={currentQuestion.text}
          />

          <AnswerOptions
            options={currentQuestion.options}
            selectedOption={state.selectedOption}
            onSelectOption={(id) => dispatch({ type: "SELECT_OPTION", payload: id })}
            onCheckAnswer={() => dispatch({ type: "CHECK_ANSWER" })}
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
          onCheck={() => dispatch({ type: "CHECK_ANSWER" })}
          answered={state.answered}
          isCorrect={state.isCorrect}
        />
      </Box>
    </ThemeProvider>
  )
}
