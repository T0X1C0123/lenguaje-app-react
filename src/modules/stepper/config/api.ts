import axios from "axios"

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000",
  ENDPOINTS: {
    SENAS: "/api/senas",
  },
  TIMEOUT: 10000, // 10 segundos
}

// Instancia de axios configurada
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

// Función helper para construir URLs de imágenes
export const buildImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http")) {
    return imagePath
  }
  return `${API_CONFIG.BASE_URL}/${imagePath}`
}
