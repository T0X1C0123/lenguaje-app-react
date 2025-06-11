import { Box, Typography, Avatar } from "@mui/material"

interface QuestionPromptProps {
  badgeText: string
  question: string
}

export default function QuestionPrompt({ badgeText, question }: QuestionPromptProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 24, height: 24, mr: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "primary.main" }} />
        </Avatar>
        <Typography
          variant="caption"
          sx={{ color: "primary.main", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}
        >
          {badgeText}
        </Typography>
      </Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        {question}
      </Typography>
    </Box>
  )
}
