import { Hero } from "./components/Hero";
import { LadingLayout } from "./components/layouts/LadingLayout";

export const Landing = () => {
    return (
        <LadingLayout>
            <Hero />
        </LadingLayout>
    );
};