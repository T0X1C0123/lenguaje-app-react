import { createTheme } from "@mui/material/styles";
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