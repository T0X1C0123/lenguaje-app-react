import React from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useLessonProgress } from './hook/useLessonProgress';
import { useAbecedarioData } from './hook/useAbecedarioData';
import LessonInterface from './components/LessonInterface';


const LeccionAbecedario = () => {
  const { questions, isLoading, error } = useAbecedarioData();
  const { completeLesson } = useLessonProgress();

  const handleLessonComplete = () => {
    completeLesson('abecedario');
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3
      }}>
        <CircularProgress sx={{ color: 'white', mb: 2 }} size={60} />
        <Typography sx={{ color: 'white', fontSize: '1.2rem' }}>
          Cargando lección del abecedario...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3
      }}>
        <Alert severity="error" sx={{ mb: 2, maxWidth: 400 }}>
          Error al cargar los datos del abecedario. Verifica que la API esté funcionando.
        </Alert>
        <Typography sx={{ color: 'white', textAlign: 'center' }}>
          {error instanceof Error ? error.message : 'Error desconocido'}
        </Typography>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3
      }}>
        <Typography sx={{ color: 'white', fontSize: '1.2rem' }}>
          No se pudieron generar preguntas. Intenta recargar la página.
        </Typography>
      </Box>
    );
  }

  return (
    <LessonInterface
      questions={questions}
      lessonTitle="Abecedario"
      moduleRoute="/nivel-iniciado"
      onLessonComplete={handleLessonComplete}
    />
  );
};

export default LeccionAbecedario;