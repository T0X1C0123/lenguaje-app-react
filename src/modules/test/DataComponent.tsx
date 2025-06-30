import { useEffect, useState } from "react";
import { fetchFichas } from "./api-axios";
import { Box, ImageList, ImageListItem } from "@mui/material";

export const DataComponent = () => {
    const [senas, setFichas] = useState<any[]>([]);
    console.log(senas)

    useEffect(() => {
        const getData = async () => {
            const data = await fetchFichas();
            setFichas(data);
        };

        getData();
    }, []);

    return (
        <Box sx={{ display: 'grid', placeItems: 'center', gap: 2 }}>
            <h1>Data Component</h1>
            <ImageList>
                {senas.map((sena) => (
                    <ImageListItem>
                        <img  src={`http://127.0.0.1:8000/${sena.url_img}`}  alt={sena.nombre} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}; 