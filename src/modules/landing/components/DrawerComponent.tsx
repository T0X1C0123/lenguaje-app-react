import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router";

type DrawerComponentProps = {
    open: boolean;
    onClose: () => void;
};

export const DrawerComponent = ({ open, onClose }: DrawerComponentProps) => {
    return (
        <Drawer 
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{ 
                paper: { 
                    sx: { 
                        borderTopLeftRadius: "10px", 
                        borderBottomLeftRadius: "10px" 
                    } 
                } 
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                <Typography variant="h6" component="div" sx={{ my: 2, fontWeight: "700", color: "primary.main", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                    LOGO
                </Typography>
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
            <Box sx={{ display: "flex", flexDirection: "column", p: 3, gap: 2,  }}>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
                    Accede a tu cuenta o regístrate
                </Typography>
                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                    <Button fullWidth color="primary" size="small" variant="contained">
                        Iniciar Sesión  
                    </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                    <Button fullWidth color="primary" size="small" variant="outlined" sx={{ px: 3 }}>
                        Registrarse
                    </Button>
                </Link>
            </Box>
        </Drawer>
    );
};