import React from 'react';
import { Card, CardContent, Typography, Box, Button, LinearProgress, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Lock, CheckCircle } from '@mui/icons-material';
import { difficultyColors } from '../../../../styles/theme';
import { useNavigate } from 'react-router';
import { useProgress } from '../../../../context/ProgressContext';

interface LessonCardProps {
  lessonId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: string;
  moduleColor: string;
  route?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lessonId,
  title,
  description,
  icon,
  difficulty,
  moduleColor,
  route
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLessonUnlocked, getLessonProgress, isLessonCompleted } = useProgress();
  
  const isUnlocked = isLessonUnlocked(lessonId);
  const progress = getLessonProgress(lessonId);
  const isCompleted = isLessonCompleted(lessonId);

  const handleLessonClick = () => {
    if (isUnlocked && route) {
      navigate(route);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return difficultyColors.basico;
      case 'Intermedio': return difficultyColors.intermedio;
      case 'Avanzado': return difficultyColors.avanzado;
      default: return '#f0f0f0';
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        opacity: isUnlocked ? 1 : 0.6,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        position: 'relative',
        border: isCompleted ? `2px solid ${moduleColor}` : 'none',
      }}
      onClick={handleLessonClick}
    >
      {isCompleted && (
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            bgcolor: moduleColor,
            borderRadius: '50%',
            p: 0.5,
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
        </Box>
      )}

      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              bgcolor: isUnlocked ? moduleColor : '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative'
            }}
          >
            {isUnlocked ? icon : <Lock fontSize="large" />}
          </Box>
          <Chip 
            label={isUnlocked ? difficulty : "Bloqueado"}
            size="small"
            sx={{ 
              bgcolor: isUnlocked ? getDifficultyColor(difficulty) : '#f5f5f5',
              color: isUnlocked ? theme.palette.text.secondary : '#999',
            }}
          />
        </Box>

        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 2,
            color: isUnlocked ? theme.palette.text.primary : '#999',
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: isUnlocked ? theme.palette.text.secondary : '#bbb',
            mb: 3,
            flexGrow: 1
          }}
        >
          {isUnlocked ? description : 'Completa la lección anterior para desbloquear'}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          {isUnlocked && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Progreso
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  {Math.round(progress)}%
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mb: 3,
                  height: 8,
                  borderRadius: 4,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: moduleColor,
                    borderRadius: 4,
                  }
                }}
              />
            </>
          )}

          <Button
            variant="contained"
            fullWidth
            disabled={!isUnlocked}
            sx={{
              bgcolor: isUnlocked ? moduleColor : '#ccc',
              color: 'white',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              '&:hover': isUnlocked ? {
                bgcolor: moduleColor,
                opacity: 0.9
              } : {},
              '&:disabled': {
                bgcolor: '#ccc',
                color: '#999'
              }
            }}
          >
            {!isUnlocked ? (
              <>
                <Lock sx={{ mr: 1, fontSize: '1rem' }} />
                Lección Bloqueada
              </>
            ) : isCompleted ? (
              '✓ Completada'
            ) : progress > 0 ? (
              'Continuar Lección'
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