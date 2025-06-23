import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB", // Azul brillante y moderno
            light: "#DBEAFE", // Azul muy claro para fondos
            dark: "#1E40AF", // Azul más oscuro para acentos
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#f3f6ff",
            light: "#f8faff",
            dark: "#e5ebff",
            contrastText: "#1e293b",
        },
        text: {
            primary: "#1e293b", 
            secondary: "#64748b", 
        },
        background: {
            default: "#F9FAFB",
            // default: "#EBF4FF",
            paper: "#ffffff",
        }
        
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "2rem",
            lineHeight: "1.2",
        },
        h2: {
            fontWeight: 600,
            fontSize: "1.5rem",
            lineHeight: 1.2,
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.3,
        },
        h5: {
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.5,
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.43,
          },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: "none",
                    '&:hover': {
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                },
                outlined: {
                    borderWidth: 1.2,
                    borderColor: grey[300],
                    "&:hover": {
                        borderColor: grey[200],
                    },
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#1E293B",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 500,
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#64748B",
                    "&:hover": {
                        backgroundColor: "rgba(37, 99, 235, 0.04)",
                    },
                }
            }
        }
    },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9333EA", // Purple color for primary elements
    },
    secondary: {
      main: "#58CC02", // Green color for the check button
    },
    background: {
      default: "#0A1019",
      paper: "#1A1E2A",
    },
  },
})

export const customThemeModules = createTheme({
  palette: {
    primary: {
      main: '#2B5CB8',
      light: '#4A90E2',
      dark: '#1976D2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#2E7D32',
      contrastText: '#ffffff',
    },
    background: {
      // default: '#fafafa',
      default: "#EBF4FF",
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 'bold',
      fontSize: '3rem',
      '@media (max-width:960px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '3rem',
      '@media (max-width:960px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '2px solid #f0f0f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
          fontWeight: 'bold',
          fontSize: '1rem',
          textTransform: 'none',
          padding: '12px 24px',
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: '0.8rem',
          padding: '8px 16px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#f0f0f0',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
  },
});

// Colores específicos para módulos
export const moduleColors = {
  iniciado: '#2196F3',
  principiante: '#4CAF50',
  usuarioLSV: '#9C27B0',
};

// Colores de fondo para dificultades
export const difficultyColors = {
  basico: '#E3F2FD',
  intermedio: '#E8F5E8',
  avanzado: '#F3E5F5',
};




// // Crear un tema personalizado
// export const themeStepper = createTheme({
//   palette: {
//     primary: {
//       main: "#2563eb", // El azul del botón y barra de progreso
//       light: "#4b83ff",
//       dark: "#1e40af",
//       contrastText: "#ffffff",
//     },
//     background: {
//       default: "#ffffff",
//       paper: "#f1f5f9", // Color de fondo del recuadro de consejos
//     },
//     text: {
//       primary: "#111827",
//       secondary: "#6b7280",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontSize: "2rem",
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: "1.75rem",
//       fontWeight: 700,
//     },
//     h3: {
//       fontSize: "1.5rem",
//       fontWeight: 600,
//     },
//     h4: {
//       fontSize: "1.25rem",
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "1rem",
//     },
//     button: {
//       textTransform: "none",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "0.5rem",
//           padding: "0.75rem 1.5rem",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "0.5rem",
//         },
//       },
//     },
//     MuiLinearProgress: {
//       styleOverrides: {
//         root: {
//           height: "4px",
//           borderRadius: "2px",
//         },
//       },
//     },
//   },
// })


// Tema principal con colores modernos
export const themeStepper = createTheme({
  palette: {
    primary: {
      main: "#2563EB", // Azul brillante y moderno
      light: "#DBEAFE", // Azul muy claro para fondos
      dark: "#1E40AF", // Azul más oscuro para acentos
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f3f6ff",
      light: "#f8faff",
      dark: "#e5ebff",
      contrastText: "#1e293b",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    background: {
      default: "#EBF4FF", // Fondo azul muy claro
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: "1.2",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        outlined: {
          borderWidth: 1.2,
          borderColor: grey[300],
          "&:hover": {
            borderColor: grey[200],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1E293B",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#64748B",
          "&:hover": {
            backgroundColor: "rgba(37, 99, 235, 0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "4px",
          borderRadius: "2px",
        },
      },
    },
  },
})


// CAMBIO: Colores más suaves y menos intensos para mejor experiencia visual
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5c7cfa", // CAMBIO: Azul más suave y menos intenso
    },
    secondary: {
      main: "#748ffc", // CAMBIO: Azul secundario más suave
    },
    background: {
      default: "#f8faff", // CAMBIO: Fondo azul muy sutil, casi blanco
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748", // CAMBIO: Texto gris oscuro más suave
      secondary: "#718096", // CAMBIO: Texto secundario más suave
    },
  },
})
