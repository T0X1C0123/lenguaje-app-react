import React from 'react';
import { Card, CardContent, Typography, Box, Button, LinearProgress, Chip } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import LessonItem from './LessonItem';

interface Lesson {
  icon: React.ReactNode;
  title: string;
}

interface ModuleCardProps {
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  buttonColor: string;
  chipLabel: string;
  chipBgColor: string;
  iconBgColor: string;
  icon: React.ReactNode;
  lessonBgColor: string;
  lessonTextColor: string;
  moduleRoute?: string;
  isLocked?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  lessons,
  progress,
  buttonColor,
  chipLabel,
  chipBgColor,
  iconBgColor,
  icon,
  lessonBgColor,
  lessonTextColor,
  moduleRoute,
  isLocked = false
}) => {
  const navigate = useNavigate();

  const handleModuleClick = () => {
    if (!isLocked && moduleRoute) {
      navigate(moduleRoute);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: '2px solid #f0f0f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease-in-out',
        opacity: isLocked ? 0.6 : 1,
        '&:hover': !isLocked ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
        } : {},
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
              bgcolor: isLocked ? '#ccc' : iconBgColor,
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
            label={isLocked ? "Bloqueado" : chipLabel}
            size="small"
            sx={{ 
              bgcolor: isLocked ? '#f5f5f5' : chipBgColor,
              color: isLocked ? '#999' : '#666',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          />
        </Box>

        <Typography 
          variant="h5" 
          component="h3" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: isLocked ? '#999' : '#333',
            fontSize: '1.4rem'
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: isLocked ? '#bbb' : '#666',
            mb: 3,
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}
        >
          {isLocked ? 'Completa el módulo anterior para desbloquear' : description}
        </Typography>

        {!isLocked && (
          <>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
                fontSize: '1rem'
              }}
            >
              Lecciones incluidas:
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
              {lessons.map((lesson, index) => (
                <LessonItem
                  key={index}
                  icon={lesson.icon}
                  title={lesson.title}
                  bgColor={lessonBgColor}
                  textColor={lessonTextColor}
                />
              ))}
            </Box>
          </>
        )}

        <Box sx={{ mt: 'auto' }}>
          {!isLocked && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Progreso
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {progress}%
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#f0f0f0',
                  mb: 3,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: buttonColor,
                    borderRadius: 4
                  }
                }}
              />
            </>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleModuleClick}
            disabled={isLocked}
            sx={{
              bgcolor: isLocked ? '#ccc' : buttonColor,
              color: 'white',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              '&:hover': !isLocked ? {
                bgcolor: buttonColor,
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
                Módulo Bloqueado
              </>
            ) : (
              '→ Comenzar Módulo'
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;