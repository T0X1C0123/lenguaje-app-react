import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CardForm } from "../common-auth/components/CardForm";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

interface LoginFormData {
    email: string;
    password: string;
};

export const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const validateForm = () => {
        const newErrors: Partial<LoginFormData> = {};

        if (!email) {
            newErrors.email = "El correo es requerido";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email inválido";
        }

        if (!password) {
            newErrors.password = "La contraseña es requerida";
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                },
                {
                    timeout: 10000,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Manejar la respuesta de la API
            console.log(response.data);

            // Redirigir al usuario a la página de inicio 
            navigate("/aprendizaje/inicio");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error al iniciar sesión:", error.message);
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error("Datos de la respuesta:", error.response.data);
                    console.error("Estado de la respuesta:", error.response.status);
                    setErrors({ email: "Credenciales inválidas" });
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error("No se recibió respuesta del servidor");
                    setErrors({ email: "Error de conexión. Verifique que el servidor esté ejecutándose." });
                } else {
                    // Algo más ocurrió al configurar la solicitud
                    console.error("Error al configurar la solicitud:", error.message);
                    setErrors({ email: "Error inesperado al procesar la solicitud" });
                }
            } else {
                console.error("Error inesperado:", error);
                setErrors({ email: "Error inesperado" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CardForm>
            <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                inicio de sesión
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Introduzca su dirección de correo electrónico para acceder a su cuenta
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Box  mb={2.5}>
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                        Correo <span style={{ color: 'red' }}>(*)</span>
                    </Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        type="email" 
                        value={email}
                        placeholder="m@ejemplo.com"
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={isLoading}
                    />
                </Box>
                <Box  mb={3}>
                    <Box mb={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body1" fontWeight="medium">
                            Contraseña <span style={{ color: 'red' }}>(*)</span>
                        </Typography>
                        <Link  to="#" style={{ color: '#1e293b', fontSize: "0.875rem", textDecoration: "none" }}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Box>
                    <TextField 
                        fullWidth 
                        size="small" 
                        variant="outlined" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={isLoading}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end" 
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }} 
                    />
                </Box>
                <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        ¿No tiene una cuenta?{" "}
                        <Link to="/register" color="primary" style={{ color: "#2563eb", fontWeight: "medium", textDecoration: "none" }}>
                            Regístrate
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </CardForm>
    );
};