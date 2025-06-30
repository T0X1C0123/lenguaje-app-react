import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiLetter {
  id: number;
  nombre: string;
  descripcion: string;
  url_img: string;
  categoria: string | null;
  categorias_relacionadas: any[];
}

interface ApiResponse {
  data: ApiLetter[];
}

interface LessonOption {
  text: string;
  color: string;
  isCorrect: boolean;
}

interface LessonQuestion {
  id: number;
  question: string;
  image: string;
  options: LessonOption[];
}

const generateRandomQuestions = (letters: ApiLetter[], count: number = 10): LessonQuestion[] => {
  const questions: LessonQuestion[] = [];
  const usedLetters = new Set<number>();

  for (let i = 0; i < count && i < letters.length; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * letters.length);
    } while (usedLetters.has(randomIndex));
    
    usedLetters.add(randomIndex);
    const correctLetter = letters[randomIndex];
    
    // Generar opciones incorrectas
    const wrongOptions: ApiLetter[] = [];
    while (wrongOptions.length < 3) {
      const wrongIndex = Math.floor(Math.random() * letters.length);
      const wrongLetter = letters[wrongIndex];
      if (wrongLetter.id !== correctLetter.id && 
          !wrongOptions.find(opt => opt.id === wrongLetter.id)) {
        wrongOptions.push(wrongLetter);
      }
    }

    // Crear las opciones de respuesta
    const options: LessonOption[] = [
      { text: correctLetter.nombre, color: '#4CAF50', isCorrect: true },
      ...wrongOptions.map(letter => ({
        text: letter.nombre,
        color: '#FF5722',
        isCorrect: false
      }))
    ];

    // Mezclar las opciones
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }

    questions.push({
      id: i + 1,
      question: "¿Qué letra representa esta imagen?",
      image: `http://127.0.0.1:8000/${correctLetter.url_img}`,
      options
    });
  }

  return questions;
};

export const useAbecedarioData = () => {
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<ApiResponse>('http://127.0.0.1:8000/api/senas');
        
        if (response.data?.data) {
          const generatedQuestions = generateRandomQuestions(response.data.data);
          setQuestions(generatedQuestions);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar los datos del abecedario'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, []);

  return {
    questions,
    isLoading,
    error
  };
};