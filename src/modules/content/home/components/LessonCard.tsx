import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import type { lesson } from "../types/lesson";

type LessonCardProps = {
    lesson: lesson;
};

export const LessonCard = ({lesson}: LessonCardProps) => {
    const getDifficultyColor = (difficulty: String) => {
        switch (difficulty) {
            case "básico":
                return "success"
            case "intermedio":
                return "info"
            case "avanzado":
                return "warning"
        };
    };

    return (
        <Card 
            sx={{ 
                "& svg": {
                    transition: "transform 0.2s ease",
                },
                "&:hover svg": {
                    transform: "translateX(4px)"
                } 
            }}
        >
            <CardActionArea>
                <CardContent 
                    sx={{ 
                        p: 3, 
                        boxShadow: 3,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box>
                            <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
                                {lesson.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {lesson.description}
                            </Typography>
                        </Box>
                        <Chip 
                            size="small"
                            label={lesson.difficulty} 
                            color={getDifficultyColor(lesson.difficulty)} 
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", color: "primary.main" }}>
                        <Typography variant="body2" fontWeight={600} sx={{ mr: 0.5 }}>
                            Comenzar lección
                        </Typography>
                        <ArrowForwardIcon fontSize="small" />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};