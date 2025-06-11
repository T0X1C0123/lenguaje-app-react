import { useEffect, useState } from "react";
import { fetchFichas } from "./api-axios";

export const DataComponent = () => {
    const [fichas, setFichas] = useState<any[]>([]);
    console.log(fichas)

    useEffect(() => {
        const getData = async () => {
            const data = await fetchFichas();
            setFichas(data);
        };

        getData();
    }, []);

    return (
        <>
            <h1>Data Component</h1>
            <ul>
                {fichas.map((ficha) => (
                    <li>
                         <pre>{JSON.stringify(ficha, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </>
    );
}; 