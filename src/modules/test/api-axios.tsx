import axios from 'axios';
// Interfaz para la estructura de los datos
// import { OrganizacionInterface } from './organizacionInterface';

// Define la URL base de la API
const API_URL = "http://127.0.0.1:8000/api/senas";


// Función para obtener el token de autenticación
const getToken = (): string | null => {
  return localStorage.getItem('custom-auth-token');
};

// Función para configurar los encabezados con el token
const getAuthHeaders = (): { [key:string]: string } => {
  const token = getToken();

  const headers: { [kye: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const fetchFichas = async (): Promise<any> => {
  try {
    const response = await axios.get<any>(API_URL, {
      headers: getAuthHeaders(),
    });
    
    return response.data.data;

  } catch (error) {
    console.error("Error fetching fichas:", error);
    return [];
  }
};

export const addFicha = async (ficha: any): Promise<void> => {
  try {
    await axios.post(API_URL, ficha, {
      headers: getAuthHeaders(),
    });

  } catch (error) {
    console.error("Error adding ficha:", error);
  }
};

// Función para actualizar una ficha existente
// export const updateFicha = async (id: number, ficha: OrganizacionInterface): Promise<void> => {
//   try {
//     await axios.put(`${API_URL}${id}`, ficha, {
//       headers: getAuthHeaders(),
//     });

//   } catch (error) {
//     console.error("Error updating ficha:", error);
//   }
// };

// // Función para eliminar una ficha
// export const deleteFicha = async (id: number): Promise<void> => {
//   try {
//     await axios.delete(`${API_URL}${id}`, {
//       headers: getAuthHeaders(),
//     });

//   } catch (error) {
//     console.error("Error deleting ficha:", error);
//   }
// };
