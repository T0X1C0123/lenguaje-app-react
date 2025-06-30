import React from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBack, Apple, Group, Nature, Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { moduleColors } from '../../../styles/theme';
import LessonCard from './components/LessonCard';

const ModuloPrincipiante = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const moduleColor = moduleColors.principiante;

  const lessons = [
    {
      title: "Colores",
      description: "Aprende todos los colores en LSV",
      icon: <Palette fontSize="large" />,
      progress: 0,
      difficulty: "Intermedio"
    },
    {
      title: "Alimentos",
      description: "Vocabulario de comidas y bebidas",
      icon: <Apple fontSize="large" />,
      progress: 0,
      difficulty: "Intermedio"
    },
    {
      title: "La Familia",
      description: "Miembros de la familia y relaciones",
      icon: <Group fontSize="large" />,
      progress: 0,
      difficulty: "Intermedio"
    },
    {
      title: "La Naturaleza",
      description: "Elementos naturales y animales",
      icon: <Nature fontSize="large" />,
      progress: 0,
      difficulty: "Intermedio"
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
            onClick={() => navigate('/')}
            startIcon={<ArrowBack />}
            sx={{ 
              mb: 3,
              color: moduleColor,
              '&:hover': { bgcolor: '#E8F5E8' }
            }}
          >
            Volver a Módulos
          </Button>

          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: moduleColor,
              mb: 2,
            }}
          >
            Módulo Principiante
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
            Vocabulario Intermedio para Comunicación Cotidiana
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            Amplía tu vocabulario con palabras y conceptos que usarás en conversaciones del día a día. 
            Aprende sobre colores, comida, familia y naturaleza.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {lessons.map((lesson, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <LessonCard 
                {...lesson}
                moduleColor={moduleColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ModuloPrincipiante;
