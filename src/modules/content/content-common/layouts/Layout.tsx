import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Header } from "../components/Header";
import { Container, Typography, useTheme } from "@mui/material";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    const theme = useTheme();

    return (
        <Box>
            <Grid container>
                <Header />
                <Grid 
                    component="main" 
                    size={12} 
                    sx={{ 
                        height: "100vh", 
                        background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)` 
                    }}
                >
                    <Box sx={{ pt: 6, pb: 8,}}>
                        <Container maxWidth="lg" >
                            <Typography 
                                variant="h1" 
                                component="h1" 
                                color="primary.dark" 
                                sx={{ 
                                    mb: 2, 
                                    fontWeight: 800, 
                                    fontSize: { xs: "2rem", sm: "2.5rem" } 
                                }}
                            >
                                Aprende Lenguaje de Señas
                            </Typography>
                            <Typography 
                                variant="h5" 
                                component="p"
                                 color="text.secondary" 
                                 sx={{ 
                                    fontWeight: 400, 
                                    maxWidth: "600px" 
                                }}
                            >
                                Explora nuestras lecciones interactivas y aprende a comunicarte con fluidez
                            </Typography>
                        </Container>
                    </Box>
                    <Container maxWidth="lg" sx={{ py: 3, mb: 8, px: 3, flex: 1 }}>
                        <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight: 700, }}>
                            Lecciones disponibles
                        </Typography>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Layout;


