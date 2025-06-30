import React from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBack, MenuBook, Tag } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { moduleColors } from '../../../styles/theme';
import LessonCard from './components/LessonCard';
import { useLessonProgress } from './hook/useLessonProgress';

const ModuloIniciado = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const moduleColor = moduleColors.iniciado;
  const { isLessonCompleted, getLessonProgress, isLessonUnlocked } = useLessonProgress();

  const lessons = [
    {
      id: 'abecedario',
      title: "Abecedario",
      description: "Aprende las letras del alfabeto en LSV",
      icon: <MenuBook fontSize="large" />,
      difficulty: "Básico",
      lessonRoute: "/leccion-abecedario"
    },
    {
      id: 'numeros',
      title: "Números",
      description: "Números del 1 al 100 en lenguaje de señas",
      icon: <Tag fontSize="large" />,
      difficulty: "Básico"
    },
    {
      id: 'dias-semana',
      title: "Días de la Semana",
      description: "Los siete días de la semana en LSV",
      icon: <MenuBook fontSize="large" />,
      difficulty: "Básico"
    },
    {
      id: 'meses-ano',
      title: "Meses del Año",
      description: "Los doce meses del año en LSV",
      icon: <MenuBook fontSize="large" />,
      difficulty: "Básico"
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: theme.palette.background.default,
      py: 4
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Button
            onClick={() => navigate('/aprendizaje/inicio')}
            startIcon={<ArrowBack />}
            sx={{ 
              mb: 3,
              color: moduleColor,
              '&:hover': { bgcolor: '#E3F2FD' }
            }}
          >
            Volver
          </Button>

          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: moduleColor,
              mb: 2,
            }}
          >
            Módulo Iniciado
          </Typography>
          
          <Box sx={{ width: '60px', height: '4px', bgcolor: moduleColor, mb: 3 }} />
          
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              color: moduleColor,
              mb: 3,
            }}
          >
            Fundamentos Básicos del LSV
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            Comienza tu viaje en el Lenguaje de Señas Venezolano con estos elementos fundamentales. 
            Domina el alfabeto, los números y conceptos temporales básicos.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {lessons.map((lesson, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <LessonCard 
                title={lesson.title}
                description={lesson.description}
                icon={lesson.icon}
                progress={getLessonProgress(lesson.id)}
                difficulty={lesson.difficulty}
                moduleColor={moduleColor}
                isLocked={!isLessonUnlocked(lesson.id, index)}
                lessonRoute={lesson.lessonRoute}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ModuloIniciado;