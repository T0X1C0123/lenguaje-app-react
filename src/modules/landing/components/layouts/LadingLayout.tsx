import { Box } from "@mui/material";
import { Navbar } from "../Navbar";

type LadingLayoutProps = {
    children: React.ReactNode;
};

export const LadingLayout = ({ children }: LadingLayoutProps) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1}}>
                {children}
            </Box>
        </Box>
    );
};