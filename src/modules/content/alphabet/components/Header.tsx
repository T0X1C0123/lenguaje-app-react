import { AppBar, Box, IconButton, LinearProgress, Badge } from "@mui/material"
import { Close as CloseIcon, Favorite as HeartIcon } from "@mui/icons-material"
import { Link } from "react-router"

interface HeaderProps {
  progress: number
  lives: number
}

export default function Header({ progress, lives }: HeaderProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 1.5 }}>
        <Link to="/learn/home"  style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Link>

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
        </Box>

        <Badge
          badgeContent={lives.toString()}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "transparent",
              color: "#ff4d4f",
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        >
          <HeartIcon sx={{ color: "#ff4d4f", fontSize: 28 }} />
        </Badge>
      </Box>
    </AppBar>
  )
}
