import type { lesson } from "../types/lesson";

export const lessons: lesson[] = [
    {
        id: 1,
        title: "Aprende el abecedario",
        description: "En esta lección descubrirás cómo comunicar cada letra del abecedario utilizando la lengua de señas.",
        difficulty: "básico",
        route: "/learn/alphabet",
    },
    {
        id: 2,
        title: "Aprende los colores",
        description: "Aprende a expresar los colores mediante señas con técnicas prácticas y ejemplos visuales.",
        difficulty: "básico",
        route: "#",
    },
    {
        id: 3,
        title: "Aprende los días de la semana",
        description: "Aprende a expresar los días de la semana mediante ejercicios prácticos.",
        difficulty: "avanzado",
        route: "#",
    },
];