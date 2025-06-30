import { useState, useEffect } from 'react';

interface LessonProgress {
  [lessonId: string]: {
    completed: boolean;
    progress: number;
  };
}

export const useLessonProgress = () => {
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>(() => {
    const saved = localStorage.getItem('lessonProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(lessonProgress));
  }, [lessonProgress]);

  const completeLesson = (lessonId: string) => {
    setLessonProgress(prev => ({
      ...prev,
      [lessonId]: {
        completed: true,
        progress: 100
      }
    }));
  };

  const isLessonCompleted = (lessonId: string) => {
    return lessonProgress[lessonId]?.completed || false;
  };

  const getLessonProgress = (lessonId: string) => {
    return lessonProgress[lessonId]?.progress || 0;
  };

  const isLessonUnlocked = (lessonId: string, lessonIndex: number) => {
    // La primera lección siempre está desbloqueada
    if (lessonIndex === 0) return true;
    
    // Las siguientes lecciones se desbloquean cuando la anterior está completada
    const lessonIds = ['abecedario', 'numeros', 'dias-semana', 'meses-ano'];
    const previousLessonId = lessonIds[lessonIndex - 1];
    return isLessonCompleted(previousLessonId);
  };

  return {
    completeLesson,
    isLessonCompleted,
    getLessonProgress,
    isLessonUnlocked
  };
};