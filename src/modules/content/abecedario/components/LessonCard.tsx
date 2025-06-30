import React from 'react';
import { Card, CardContent, Typography, Box, Button, LinearProgress, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { difficultyColors } from '../../../../styles/theme';

interface LessonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  difficulty: string;
  moduleColor: string;
  isLocked?: boolean;
  lessonRoute?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  icon,
  progress,
  difficulty,
  moduleColor,
  isLocked = false,
  lessonRoute
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return difficultyColors.basico;
      case 'Intermedio': return difficultyColors.intermedio;
      case 'Avanzado': return difficultyColors.avanzado;
      default: return '#f0f0f0';
    }
  };

  const handleStartLesson = () => {
    if (!isLocked && lessonRoute) {
      navigate(lessonRoute);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        opacity: isLocked ? 0.6 : 1,
        cursor: isLocked ? 'not-allowed' : 'default'
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              bgcolor: isLocked ? '#ccc' : moduleColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative'
            }}
          >
            {isLocked ? <Lock fontSize="large" /> : icon}
          </Box>
          <Chip 
            label={isLocked ? "Bloqueado" : difficulty}
            size="small"
            sx={{ 
              bgcolor: isLocked ? '#f5f5f5' : getDifficultyColor(difficulty),
              color: isLocked ? '#999' : theme.palette.text.secondary,
            }}
          />
        </Box>

        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 2,
            color: isLocked ? '#999' : theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: isLocked ? '#bbb' : theme.palette.text.secondary,
            mb: 3,
            flexGrow: 1
          }}
        >
          {isLocked ? 'Completa la lección anterior para desbloquear' : description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          {!isLocked && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Progreso
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  {progress}%
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mb: 3,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: moduleColor,
                  }
                }}
              />
            </>
          )}

          <Button
            variant="contained"
            fullWidth
            disabled={isLocked}
            onClick={handleStartLesson}
            sx={{
              bgcolor: isLocked ? '#ccc' : moduleColor,
              color: 'white',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              '&:hover': !isLocked ? {
                bgcolor: moduleColor,
                opacity: 0.9
              } : {},
              '&:disabled': {
                bgcolor: '#ccc',
                color: '#999'
              }
            }}
          >
            {isLocked ? (
              <>
                <Lock sx={{ mr: 1, fontSize: '1rem' }} />
                Lección Bloqueada
              </>
            ) : (
              '→ Comenzar Lección'
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LessonCard;