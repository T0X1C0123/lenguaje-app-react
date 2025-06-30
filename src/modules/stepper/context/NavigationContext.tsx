"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { LetraData, NavigationState } from "../types"

interface NavigationContextType extends NavigationState {
  goToNext: () => void
  goToPrevious: () => void
  goToLetter: (index: number) => void
  canGoNext: boolean
  canGoPrevious: boolean
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

interface NavigationProviderProps {
  children: ReactNode
  letters: LetraData[]
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, letters }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentLetter, setCurrentLetter] = useState<LetraData | null>(null)

  useEffect(() => {
    if (letters.length > 0) {
      setCurrentLetter(letters[currentIndex])
    }
  }, [currentIndex, letters])

  const goToNext = () => {
    if (currentIndex < letters.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToLetter = (index: number) => {
    if (index >= 0 && index < letters.length) {
      setCurrentIndex(index)
    }
  }

  const canGoNext = currentIndex < letters.length - 1
  const canGoPrevious = currentIndex > 0

  const value: NavigationContextType = {
    currentIndex,
    currentLetter,
    totalLetters: letters.length,
    letters,
    goToNext,
    goToPrevious,
    goToLetter,
    canGoNext,
    canGoPrevious,
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
