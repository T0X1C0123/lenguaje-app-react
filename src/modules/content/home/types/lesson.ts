export interface lesson {
    id: number;
    title: string;
    description: string;
    difficulty: "básico" | "intermedio" | "avanzado";
    route: string;
};