import React from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          color: theme.palette.primary.main,
          mb: 2,
        }}
      >
        Lenguaje de Señas Venezolano
      </Typography>
      
      <Box sx={{ width: '60px', height: '4px', bgcolor: theme.palette.primary.light, mx: 'auto', mb: 3 }} />
      
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          color: theme.palette.primary.light,
          mb: 3,
        }}
      >
        Selecciona tu Módulo de Aprendizaje
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        Nuestro programa está estructurado en 3 módulos progresivos, desde los fundamentos 
        básicos hasta el dominio avanzado del Lenguaje de Señas Venezolano (LSV).
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Chip 
          label="3 Módulos Disponibles" 
          sx={{ 
            bgcolor: '#E3F2FD',
            color: theme.palette.primary.main,
          }}
        />
        <Chip 
          label="Certificación LSV" 
          variant="outlined"
          sx={{ 
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;