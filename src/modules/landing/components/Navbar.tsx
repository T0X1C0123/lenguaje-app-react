import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router";
import { DrawerComponent } from "./DrawerComponent";
import { useState } from "react";
import imagen from "../../../assets/lenguaje-senas-6.jpg";

export const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default" sx={{ bgcolor: "background.default" }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: "end", alignItems: "center" }}>
                        {/* <Typography variant="h6" component="div" sx={{ my: 2, fontWeight: "700", color: "primary.main", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                            Logo
                        </Typography> */}

                        {/* Botones de autenticación para pantallas grandes */}
                        {!isMobile && (
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                    <Button color="primary" size="small" variant="contained">
                                        Iniciar sesión  
                                    </Button>
                                </Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                                    <Button color="primary" size="small" variant="outlined" sx={{ px: 3 }}>
                                        Registrarse
                                    </Button>
                                </Link>
                            </Box>
                        )}

                        {/* Botón del menú móvil */}
                        {isMobile && (
                            <IconButton aria-label="menu" onClick={() => toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <DrawerComponent  open={drawerOpen} onClose={() => toggleDrawer(false)} />
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};