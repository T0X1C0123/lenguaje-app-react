import { Box, Card, CardContent } from "@mui/material";

type CardProps = {
    children: React.ReactNode;
};

export const CardForm = ({children}: CardProps) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: { xs: 2, md: 0 } }}>
            <Card 
                sx={{ 
                    maxWidth: 450, 
                    width: "100%", 
                    borderRadius: "8px", 
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <CardContent sx={{ padding: 4 }}>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
};