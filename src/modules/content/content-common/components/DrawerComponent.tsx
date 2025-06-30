import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import SchoolIcon from "@mui/icons-material/School"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"

const menuItems = [
    { text: "Inicio", path: "/home", icon: <HomeIcon/> },
    { text: "Mis lecciones", path: "/courses", icon: <SchoolIcon/> },
    { text: "Perfil", path: "/profile", icon: <PersonIcon/> },
    { text: "Configuración", path: "/settings", icon: <SettingsIcon/> },
];

type DrawerComponentProps = {
    open: boolean;
    onClose: () => void;
};

export const DrawerComponent = ({ open, onClose }: DrawerComponentProps) => {
    return (
        <Drawer 
            anchor="left"
            open={open}
            onClose={onClose}
            slotProps={{ 
                paper: { 
                    sx: { 
                        borderTopRightRadius: "16px", 
                        borderBottomRightRadius: "16px" 
                    } 
                } 
            }}
        >
            <Box 
                sx={{ 
                    width: 280, 
                    "& .MuiListItemIcon-root": { color: "primary.main" }, 
                    "& .MuiListItemButton-root": { borderRadius: 2, mx: 1, my: 0.5 }, 
                    "& .MuiListItemButton-root:hover": { backgroundColor: "primary.light" }  
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", p: 3, gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }} />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Aprende LSV
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lenguaje de Señas
                        </Typography>
                    </Box>
                </Box>
                <List sx={{ px: 1 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};