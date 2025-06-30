import axios from "axios"
import type { Sena } from "../types"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export interface ApiResponse {
  data: Sena[]
}

export const senasApi = {
  async getSenas(): Promise<Sena[]> {
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/senas`, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (response.data && response.data.data) {
        return response.data.data
      } else {
        throw new Error("Invalid API response format")
      }
    } catch (error) {
      console.error("Error fetching senas:", error)
      throw error
    }
  },
}
