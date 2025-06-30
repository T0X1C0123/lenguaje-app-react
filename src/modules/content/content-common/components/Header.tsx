import { AppBar, Avatar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerComponent } from "./DrawerComponent";
import { useState } from "react";

export const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="sticky" component="header" elevation={0}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <IconButton aria-label="menu" onClick={() => toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Box>
                    <IconButton>
                        <Avatar  />
                    </IconButton>
                </Box> 
                <DrawerComponent open={drawerOpen} onClose={() => toggleDrawer(false)} />
            </Toolbar>
        </AppBar>
    );
};