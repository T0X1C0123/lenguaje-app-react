"use client"

import { useState, useEffect } from "react"
import type { LetraData, ApiResponse } from "../types"
import { apiClient, API_CONFIG, buildImageUrl } from "../config/api"

export const useLettersData = () => {
  const [letters, setLetters] = useState<LetraData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLetters = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.get<ApiResponse>(API_CONFIG.ENDPOINTS.SENAS)

      if (response.data && response.data.data) {
        // Procesar las URLs de las imágenes para que sean absolutas
        const processedLetters = response.data.data.map((letter) => ({
          ...letter,
          url_img: buildImageUrl(letter.url_img),
        }))

        setLetters(processedLetters)
      } else {
        throw new Error("Formato de respuesta inválido")
      }
    } catch (err: any) {
      console.error("Error fetching letters:", err)

      if (err.code === "ECONNABORTED") {
        setError("Tiempo de espera agotado. Verifica tu conexión.")
      } else if (err.response) {
        setError(`Error del servidor: ${err.response.status} - ${err.response.statusText}`)
      } else if (err.request) {
        setError("No se pudo conectar con el servidor. Verifica que la API esté funcionando.")
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLetters()
  }, [])

  const refetchLetters = () => {
    fetchLetters()
  }

  return { letters, loading, error, refetchLetters }
}
