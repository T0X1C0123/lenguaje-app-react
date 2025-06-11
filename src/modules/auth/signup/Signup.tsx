import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CardForm } from "../common-auth/components/CardForm";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

interface SignupFormData {
    ci: string;
    name: string;
    apellido: string;
    email: string;
    password: string;
};

export const Signup = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [apellido, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [ci, setCedula] = useState<number>();
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const navigate = useNavigate(); 


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const validateForm = () => {
        const newErrors: Partial<SignupFormData> = {};
        console.log(newErrors);

        if (!ci) {
             newErrors.ci = "La cédula es requerido";
        } else if (isNaN(ci)) {
            newErrors.ci = "La cédula debe ser un número válido";
        }

        if (!name) {
             newErrors.name = "El nombre es requerido";
        } else if (!/^[a-zA-Z]+$/.test(name)) {
            newErrors.name = "El nombre debe contener solo caracteres alfabéticos";
        }

        if (!apellido) {
             newErrors.apellido = "El apellido es requerido";
        } else if (!/^[a-zA-Z]+$/.test(apellido)) {
            newErrors.apellido = "El apellido debe contener solo caracteres alfabéticos";
        }

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

        if(validateForm()) {

        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users",
                {
                    ci,
                    name,
                    apellido,
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

            // Redirigir al usuario a la página de inicio de sesión o dashboard
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error al registrarse:", error.message);
                if (error.response) {
                    console.error("Datos de la respuesta:", error.response.data);
                    console.error("Estado de la respuesta:", error.response.status);
                } else if (error.request) {
                    console.error("No se recibió respuesta del servidor");
                } else {
                    console.error("Error al configurar la solicitud:", error.message);
                }
            } else {
                console.error("Error inesperado:", error);
            }
        }
    };

    return (
        <CardForm>
            <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                Regístrate 
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Crea una cuenta nueva para empezar
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Box  mb={2.5}>
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                        Cédula <span style={{ color: 'red' }}>(*)</span>
                    </Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        type="number"
                        value={ci}
                        onChange={(e) => setCedula(Number(e.target.value))}
                        error={!!errors.ci}
                        helperText={errors.ci}
                        inputProps={{ min: 0 }}
                        sx={{
                            '& input[type=number]': {
                                MozAppearance: 'textfield',
                                '&::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '&::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            },
                        }}
                    />
                </Box>
                <Box  mb={2.5}>
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                        Nombre <span style={{ color: 'red' }}>(*)</span>
                    </Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        type="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Box>
                <Box  mb={2.5}>
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                        Apellido <span style={{ color: 'red' }}>(*)</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    </Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        type="apellido" 
                        value={apellido}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
                    />
                </Box>
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
                        placeholder="m@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Box>
                <Box  mb={3}>
                    <Box>
                        <Typography variant="body1" fontWeight="medium">
                            Contraseña <span style={{ color: 'red' }}>(*)</span>
                        </Typography>
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
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end" 
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Box>
                <Button fullWidth variant="contained" type="submit" >
                    Crear cuenta
                </Button>
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        ¿Ya tiene una cuenta?{" "}
                        <Link to="/login" style={{ color: "#2563eb", fontWeight: "medium", textDecoration: "none" }}>
                            Iniciar sesión
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </CardForm>
    );
};