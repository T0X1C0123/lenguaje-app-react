import { Box, Container, Grid, Typography } from "@mui/material";
import imagen from "../../../assets/lenguaje-senas-6.jpg";

export const Hero = () => {
    return (
        <Box component="section" sx={{ width: "100%", height: "100vh", backgroundColor: 'white', py: { xs: 6, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    <Grid  
                        size={{ 
                            xs : 12, 
                            md : 6 
                        }} 
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center" 
                        }}
                    >
                        <Box>
                            <Typography 
                                variant="h1" 
                                component="h1" 
                                color="text.primary" 
                                sx={{ 
                                    fontWeight: 800, 
                                    lineHeight: "1.1", 
                                    fontSize: { xs: "2.5rem", md: "3.5rem" }, 
                                    textAlign: { xs: "center", md: "left" } 
                                }}
                            >
                                Lengua de señas Venezolana
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ 
                                    mt: 2, 
                                    fontSize: { md: "1.25rem" }, 
                                    textAlign: { xs: "center", md: "left" } 
                                }}
                            >
                                Aprende la lengua de señas Venezolana de forma interactiva.
                            </Typography>
                        </Box> 
                    </Grid>
                    <Grid 
                        size={{ 
                            xs: 12, 
                            md: 6 
                        }} 
                        sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                        }}
                    >
                        <Box sx={{ width: "100%", height: { xs: "350px", sm: "600px", md: "490px" }, }}>
                            <Box sx={{ width: "100%", height: "100%" }}>
                                <img 
                                    src={imagen} 
                                    alt="manos " 
                                    width="100%" 
                                    height="100%" 
                                    style={{ objectFit: "cover" }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};