import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LessonProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  unlockedAt?: Date;
}

interface ProgressContextType {
  lessonsProgress: Record<string, LessonProgress>;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  completLesson: (lessonId: string) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => number;
  isLessonCompleted: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'lsv-lessons-progress';

// Orden de las lecciones para el desbloqueo secuencial
const LESSON_ORDER = ['abecedario', 'numeros', 'dias-semana', 'meses-ano'];

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [lessonsProgress, setLessonsProgress] = useState<Record<string, LessonProgress>>({});

  // Cargar progreso desde localStorage al inicializar
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setLessonsProgress(parsed);
      } catch (error) {
        console.error('Error parsing saved progress:', error);
        // Inicializar con progreso por defecto
        initializeDefaultProgress();
      }
    } else {
      initializeDefaultProgress();
    }
  }, []);

  // Guardar progreso en localStorage cuando cambie
  useEffect(() => {
    if (Object.keys(lessonsProgress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonsProgress));
    }
  }, [lessonsProgress]);

  const initializeDefaultProgress = () => {
    const defaultProgress: Record<string, LessonProgress> = {};
    
    LESSON_ORDER.forEach((lessonId, index) => {
      defaultProgress[lessonId] = {
        lessonId,
        progress: 0,
        completed: false,
        // Solo la primera lección está desbloqueada por defecto
        unlockedAt: index === 0 ? new Date() : undefined,
      };
    });

    setLessonsProgress(defaultProgress);
  };

  const updateLessonProgress = (lessonId: string, progress: number) => {
    setLessonsProgress(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        lessonId,
        progress: Math.min(100, Math.max(0, progress)),
        completed: progress >= 100,
        unlockedAt: prev[lessonId]?.unlockedAt || new Date(),
      }
    }));

    // Si el progreso llega al 100%, desbloquear la siguiente lección
    if (progress >= 100) {
      unlockNextLesson(lessonId);
    }
  };

  const completLesson = (lessonId: string) => {
    updateLessonProgress(lessonId, 100);
  };

  const unlockNextLesson = (completedLessonId: string) => {
    const currentIndex = LESSON_ORDER.indexOf(completedLessonId);
    if (currentIndex !== -1 && currentIndex < LESSON_ORDER.length - 1) {
      const nextLessonId = LESSON_ORDER[currentIndex + 1];
      
      setLessonsProgress(prev => ({
        ...prev,
        [nextLessonId]: {
          ...prev[nextLessonId],
          lessonId: nextLessonId,
          progress: prev[nextLessonId]?.progress || 0,
          completed: prev[nextLessonId]?.completed || false,
          unlockedAt: new Date(),
        }
      }));
    }
  };

  const isLessonUnlocked = (lessonId: string): boolean => {
    const lesson = lessonsProgress[lessonId];
    return lesson?.unlockedAt !== undefined;
  };

  const getLessonProgress = (lessonId: string): number => {
    return lessonsProgress[lessonId]?.progress || 0;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return lessonsProgress[lessonId]?.completed || false;
  };

  const value: ProgressContextType = {
    lessonsProgress,
    updateLessonProgress,
    completLesson,
    isLessonUnlocked,
    getLessonProgress,
    isLessonCompleted,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};