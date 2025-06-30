import { Box, Typography, Avatar } from "@mui/material"

interface QuestionPromptProps {
  badgeText: string
  question: string
}

export default function QuestionPrompt({ badgeText, question }: QuestionPromptProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            mr: 1,
            // CAMBIO: Gradiente más suave
            background: "linear-gradient(135deg, #5c7cfa 0%, #748ffc 100%)",
          }}
        >
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffffff" }} />
        </Avatar>
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
            // CAMBIO: Color más suave sin gradiente para mejor legibilidad
            color: "#5c7cfa",
          }}
        >
          {badgeText}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          // CAMBIO: Color más suave y legible
          color: "#2d3748",
        }}
      >
        {question}
      </Typography>
    </Box>
  )
}
