import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';

interface LessonOption {
  text: string;
  color: string;
  isCorrect: boolean;
}

interface LessonQuestion {
  id: number;
  question: string;
  image: string;
  options: LessonOption[];
}

interface LessonInterfaceProps {
  questions: LessonQuestion[];
  lessonTitle: string;
  moduleRoute: string;
  onLessonComplete?: () => void;
}

const LessonInterface: React.FC<LessonInterfaceProps> = ({
  questions,
  lessonTitle,
  moduleRoute,
  onLessonComplete
}) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (option: LessonOption) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option.text);
    setIsAnswered(true);
    
    if (option.isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          // Lección completada
          setShowCompletionMessage(true);
          if (onLessonComplete) {
            onLessonComplete();
          }
          
          // Mostrar mensaje de éxito y luego redirigir
          setTimeout(() => {
            navigate(moduleRoute);
          }, 3000);
        }
      }, 1500);
    } else {
      // Respuesta incorrecta - retroceder en el progreso si no es la primera pregunta
      setTimeout(() => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          // Si es la primera pregunta, reiniciar la pregunta actual
          setSelectedAnswer(null);
          setIsAnswered(false);
        }
      }, 1500);
    }
  };

  const getButtonColor = (option: LessonOption) => {
    if (!isAnswered) return option.color;
    // Solo mostrar rojo para la respuesta incorrecta seleccionada
    if (selectedAnswer === option.text && !option.isCorrect) return '#F44336';
    // Mantener el color original para todas las demás opciones
    return option.color;
  };

  const getProgressBarColor = () => {
    if (isAnswered && selectedAnswer) {
      const selectedOption = currentQuestion.options.find(opt => opt.text === selectedAnswer);
      if (selectedOption?.isCorrect) {
        return '#4CAF50'; // Verde para respuesta correcta
      } else {
        return '#F44336'; // Rojo para respuesta incorrecta
      }
    }
    return '#4CAF50'; // Color por defecto
  };

  // Mostrar mensaje de lección completada
  if (showCompletionMessage) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 50%, #CDDC39 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 4
      }}>
        <CheckCircle sx={{ fontSize: 120, color: 'white', mb: 3 }} />
        <Typography variant="h3" sx={{ 
          color: 'white', 
          fontWeight: 'bold', 
          mb: 2,
          textAlign: 'center'
        }}>
          ¡Lección Completada!
        </Typography>
        <Typography variant="h5" sx={{ 
          color: 'white', 
          mb: 3,
          textAlign: 'center'
        }}>
          Has completado la lección "{lessonTitle}"
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'white', 
          opacity: 0.9,
          textAlign: 'center'
        }}>
          Respuestas correctas: {correctAnswers}/{questions.length}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'white', 
          opacity: 0.8,
          mt: 2,
          textAlign: 'center'
        }}>
          Regresando al módulo...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      px: 3,
      py: 4
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Button
          onClick={() => navigate(moduleRoute)}
          sx={{
            minWidth: 48,
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          <ArrowBack />
        </Button>

        <Box sx={{
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 20,
          px: 3,
          py: 1
        }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Q{currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          mb: 4,
          '& .MuiLinearProgress-bar': {
            bgcolor: getProgressBarColor(),
            borderRadius: 4,
            transition: 'background-color 0.3s ease'
          }
        }}
      />

      {/* Question Card */}
      <Box sx={{
        bgcolor: 'white',
        borderRadius: 3,
        p: 3,
        mb: 4,
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#7B2CBF',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          {currentQuestion.question}
        </Typography>

        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3
        }}>
          <Box
            component="img"
            src={currentQuestion.image}
            alt="Question"
            sx={{
              maxWidth: '100%',
              maxHeight: 300,
              borderRadius: 2,
              objectFit: 'contain'
            }}
          />
        </Box>
      </Box>

      {/* Answer Options */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
            sx={{
              bgcolor: getButtonColor(option),
              color: 'white',
              py: 2,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              minHeight: 56,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: getButtonColor(option),
                opacity: 0.9
              },
              '&.Mui-disabled': {
                bgcolor: getButtonColor(option),
                color: 'white',
                opacity: 1
              }
            }}
          >
            {option.text}
          </Button>
        ))}
      </Box>

      {/* Feedback Message */}
      {isAnswered && selectedAnswer && !showCompletionMessage && (
        <Box sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: currentQuestion.options.find(opt => opt.text === selectedAnswer)?.isCorrect 
            ? 'rgba(76, 175, 80, 0.95)' 
            : 'rgba(244, 67, 54, 0.95)',
          color: 'white',
          px: 4,
          py: 2,
          borderRadius: 3,
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {currentQuestion.options.find(opt => opt.text === selectedAnswer)?.isCorrect 
            ? '¡Correcto!' 
            : '¡Incorrecto!'}
        </Box>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default LessonInterface;