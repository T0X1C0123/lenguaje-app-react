import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../modules/auth/login/Login";
import { Landing } from "../modules/landing/Landing";
import { Signup } from "../modules/auth/signup/Signup";
import { Alphabet } from "../modules/content/alphabet/Alphabet";
import ModuloIniciado from "../modules/content/abecedario/ModuloIniciado";
import ModuloPrincipiante from "../modules/content/abecedario/ModuloPrincipiante";
import ModuloUsuarioLSV from "../modules/content/abecedario/ModuloUsuarioLSV";
import Stepper from "../modules/stepper/Stepper";
import LeccionAbecedario from "../modules/content/abecedario/LeccionAbecedario";
import Index from "../modules/content/abecedario/Index";


export const AppRouter = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/aprendizaje/inicio" element={<Index />} />
                    <Route path="/aprendizaje/alfabeto" element={<Alphabet />} />
                    <Route path="/nivel-iniciado" element={<ModuloIniciado />} />
                    <Route path="/nivel-principiante" element={<ModuloPrincipiante />} />
                    <Route path="/nivel-usuario-lsv" element={<ModuloUsuarioLSV />} />
                    <Route path="/leccion-abecedario" element={<LeccionAbecedario />} />
                    <Route path="/aprendizaje/stepper/alfabeto" element={<Stepper />} />
                </Routes>
            </BrowserRouter>
    );
};