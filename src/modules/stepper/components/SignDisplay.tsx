
import type React from "react"
import { useState } from "react"
import { Box, Typography, Skeleton, Modal, Backdrop } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { useNavigation } from "../context/NavigationContext"

export const SignDisplay: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { currentLetter } = useNavigation()

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
    console.error(`Error cargando imagen: ${currentLetter?.url_img}`)
  }

  const handleImageClick = () => {
    if (imageLoaded && !imageError) {
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  if (!currentLetter) {
    return null
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold", mb: 1 }}>
          {currentLetter.nombre}
        </Typography>
        {/* <Typography variant="h4" color="text.secondary" sx={{ mb: 3 }}>
          Ejemplo: {currentLetter.descripcion}
        </Typography> */}

        <Box
          sx={{
            position: "relative",
            width: "180px",
            height: "180px",
            borderRadius: "8px",
            overflow: "hidden",
            cursor: imageLoaded && !imageError ? "pointer" : "default",
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: imageLoaded && !imageError ? "scale(1.05)" : "none",
            },
          }}
          onClick={handleImageClick}
        >
          {/* Skeleton mientras carga la imagen */}
          {!imageLoaded && !imageError && (
            <Skeleton variant="rectangular" width="100%" height="100%" sx={{ position: "absolute", top: 0, left: 0 }} />
          )}

          {/* Imagen */}
          {!imageError && (
            <img
              src={currentLetter.url_img || "/placeholder.svg"}
              alt={`Seña para la letra ${currentLetter.nombre}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: imageLoaded ? "block" : "none",
              }}
            />
          )}

          {/* Error de imagen */}
          {imageError && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                gap: 1,
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: "2rem" }} />
              <Typography variant="caption" textAlign="center">
                Error al cargar imagen
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Haz clic en la imagen para verla más grande
        </Typography>
      </Box>

      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={currentLetter.url_img || "/placeholder.svg"}
            alt={`Seña ampliada para la letra ${currentLetter.nombre}`}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              fontWeight: "bold",
            }}
          >
            Letra {currentLetter.nombre}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            }}
          >
            Haz clic fuera de la imagen para cerrar
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
