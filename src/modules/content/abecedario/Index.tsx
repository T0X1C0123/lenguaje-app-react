import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  MenuBook,
  Person,
  School,
  Tag,
  Apple,
  Group,
  Nature,
  AccountCircle,
  FlashOn,
  Message
} from '@mui/icons-material';
import { moduleColors } from '../../../styles/theme';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';

const Index = () => {
  const theme = useTheme();

  const modulesData = [
    {
      title: "Módulo Iniciado",
      description: "Fundamentos básicos del lenguaje de señas para comenzar tu aprendizaje",
      lessons: [
        { icon: <MenuBook />, title: "Abecedario" },
        { icon: <Tag />, title: "Números" },
        { icon: <MenuBook />, title: "Días de la Semana" },
        { icon: <MenuBook />, title: "Meses del Año" }
      ],
      progress: 0,
      buttonColor: moduleColors.iniciado,
      chipLabel: "Básico",
      chipBgColor: "#E3F2FD",
      iconBgColor: moduleColors.iniciado,
      icon: <MenuBook fontSize="large" />,
      lessonBgColor: "#E3F2FD",
      lessonTextColor: "#1976D2",
      moduleRoute: "/nivel-iniciado",
      isLocked: false
    },
    {
      title: "Módulo Principiante",
      description: "Vocabulario intermedio para comunicación cotidiana",
      lessons: [
        { icon: <MenuBook />, title: "Colores" },
        { icon: <Apple />, title: "Alimentos" },
        { icon: <Group />, title: "La Familia" },
        { icon: <Nature />, title: "La Naturaleza" }
      ],
      progress: 0,
      buttonColor: moduleColors.principiante,
      chipLabel: "Intermedio",
      chipBgColor: "#E8F5E8",
      iconBgColor: moduleColors.principiante,
      icon: <Person fontSize="large" />,
      lessonBgColor: "#E8F5E8",
      lessonTextColor: "#2E7D32",
      moduleRoute: "/nivel-principiante",
      isLocked: true
    },
    {
      title: "Módulo Usuario LSV",
      description: "Nivel avanzado para dominar la gramática y estructura del lenguaje",
      lessons: [
        { icon: <AccountCircle />, title: "Pronombres" },
        { icon: <FlashOn />, title: "Verbos" },
        { icon: <Message />, title: "Adverbios" },
        { icon: <MenuBook />, title: "Vocabularios Avanzados" }
      ],
      progress: 0,
      buttonColor: moduleColors.usuarioLSV,
      chipLabel: "Avanzado",
      chipBgColor: "#F3E5F5",
      iconBgColor: moduleColors.usuarioLSV,
      icon: <School fontSize="large" />,
      lessonBgColor: "#F3E5F5",
      lessonTextColor: "#7B1FA2",
      moduleRoute: "/nivel-usuario-lsv",
      isLocked: true
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: theme.palette.background.default,
      py: 4
    }}>
      <Container maxWidth="lg">
        <Header />
        
        <Grid container spacing={4}>
          {modulesData.map((module, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <ModuleCard {...module} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
