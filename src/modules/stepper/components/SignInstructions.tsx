import type React from "react"
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

interface SignInstructionsProps {
  example: string
  instructions: string
  tips: string[]
}

export const SignInstructions: React.FC<SignInstructionsProps> = ({ example, instructions, tips }) => {
  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {example}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Cómo hacer esta seña:
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {instructions}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Consejos:
        </Typography>
        <List disablePadding>
          {tips.map((tip, index) => (
            <ListItem key={index} sx={{ py: 0.5 }} disablePadding>
              <ListItemIcon sx={{ minWidth: 25 }}>
                <CircleIcon sx={{ fontSize: "0.5rem" }} />
              </ListItemIcon>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
