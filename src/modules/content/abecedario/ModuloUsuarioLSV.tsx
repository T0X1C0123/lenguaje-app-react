import React from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBack, AccountCircle, FlashOn, Message, MenuBook } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { moduleColors } from '../../../styles/theme';
import LessonCard from './components/LessonCard';

const ModuloUsuarioLSV = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const moduleColor = moduleColors.usuarioLSV;

  const lessons = [
    {
      title: "Pronombres",
      description: "Pronombres personales y posesivos en LSV",
      icon: <AccountCircle fontSize="large" />,
      progress: 0,
      difficulty: "Avanzado"
    },
    {
      title: "Verbos",
      description: "Conjugación y uso de verbos en LSV",
      icon: <FlashOn fontSize="large" />,
      progress: 0,
      difficulty: "Avanzado"
    },
    {
      title: "Adverbios",
      description: "Modificadores y expresiones de tiempo y modo",
      icon: <Message fontSize="large" />,
      progress: 0,
      difficulty: "Avanzado"
    },
    {
      title: "Vocabularios Avanzados",
      description: "Términos especializados y conversación fluida",
      icon: <MenuBook fontSize="large" />,
      progress: 0,
      difficulty: "Avanzado"
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
              '&:hover': { bgcolor: '#F3E5F5' }
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
            Módulo Usuario LSV
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
            Nivel Avanzado - Dominio de la Gramática LSV
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            Perfecciona tu dominio del LSV con gramática avanzada, estructuras complejas y 
            vocabulario especializado para una comunicación fluida y natural.
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

export default ModuloUsuarioLSV;