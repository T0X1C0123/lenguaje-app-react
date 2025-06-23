import { AppBar, Box, IconButton, LinearProgress, Badge } from "@mui/material"
import { Close as CloseIcon, Favorite as HeartIcon } from "@mui/icons-material"
import { useNavigate } from "react-router";

interface HeaderProps {
  progress: number
  lives: number
}

export default function Header({ progress, lives }: HeaderProps) {
  const navigate = useNavigate(); 
  
  const handleBackClick = () => { 
    navigate('/nivel-iniciado') 
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        // CAMBIO: Fondo más sutil y menos intenso
        // bgcolor: "rgba(248, 250, 255, 0.95)",
        bgcolor: "#EBF4FF",
        borderBottom: "1px solid rgba(92, 124, 250, 0.12)", // CAMBIO: Borde más sutil
        backdropFilter: "blur(8px)", // CAMBIO: Blur más sutil
        // CAMBIO: Gradiente muy sutil
        backgroundImage: `
          linear-gradient(135deg, rgba(92, 124, 250, 0.03) 0%, rgba(116, 143, 252, 0.03) 100%)
        `,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 1.5 }}>
        <IconButton edge="start" color="inherit" aria-label="close" onClick={handleBackClick}>
          <CloseIcon sx={{ color: "#718096" }} /> {/* CAMBIO: Color gris suave */}
        </IconButton>

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              // CAMBIO: Fondo más sutil
              backgroundColor: "rgba(92, 124, 250, 0.08)",
              "& .MuiLinearProgress-bar": {
                // CAMBIO: Gradiente más suave
                background: "linear-gradient(90deg, #5c7cfa 0%, #748ffc 100%)",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Badge
          badgeContent={lives.toString()}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "transparent",
              color: "#e53e3e", // CAMBIO: Rojo más suave
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        >
          <HeartIcon sx={{ color: "#e53e3e", fontSize: 28 }} />
        </Badge>
      </Box>
    </AppBar>
  )
}
