import React from 'react';
import { Box, Typography } from '@mui/material';

interface LessonItemProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  textColor: string;
}

const LessonItem: React.FC<LessonItemProps> = ({ icon, title, bgColor, textColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: bgColor,
        borderRadius: 2,
        minHeight: '60px'
      }}
    >
      <Box sx={{ color: textColor, display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          color: textColor,
          fontWeight: 500,
          fontSize: '0.95rem'
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default LessonItem;