import { Typography, Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          color: theme.palette.primary.main,
          mb: 2,
          fontSize: '2.5rem',
        }}
      >
        Lenguaje de Señas Venezolano
      </Typography>
      
      <Box sx={{ width: '60px', height: '4px', bgcolor: "#4A90E2", mx: 'auto', mb: 3 }} />
      
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          color: "#4A90E2",
          mb: 3,
        }}
      >
        Selecciona tu nivel de aprendizaje
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: "#666666",
          mb: 4,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        Nuestro programa está estructurado en 3 niveles progresivos, desde los fundamentos 
        básicos hasta el dominio avanzado del Lenguaje de Señas Venezolano (LSV).
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Chip 
          label="1 Nivel Disponibles" 
          sx={{ 
            bgcolor: '#E3F2FD',
            color: theme.palette.primary.main,
          }}
        />
        <Chip 
          label="Certificación LSV" 
          variant="outlined"
          sx={{ 
            borderColor: "#4CAF50",
            color: "#4CAF50",
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
