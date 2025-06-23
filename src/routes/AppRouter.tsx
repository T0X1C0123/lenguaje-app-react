import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../modules/auth/login/Login";
import { Landing } from "../modules/landing/Landing";
import { Signup } from "../modules/auth/signup/Signup";
import { Home } from "../modules/content/home/Home";
import { Alphabet } from "../modules/content/alphabet/Alphabet";
import { DataComponent } from "../modules/test/DataComponent";
import Index from "../modules/content/modulos/Index";
import ModuloIniciado from "../modules/content/modulos/ModuloIniciado";
import ModuloPrincipiante from "../modules/content/modulos/ModuloPrincipiante";
import ModuloUsuarioLSV from "../modules/content/modulos/ModuloUsuarioLSV";
import { SignPage } from "../modules/stepper/pages/SignPage";
import Stepper from "../modules/stepper/Stepper";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/learn/inicio" element={<Home />} />
                <Route path="/aprendizaje/alfabeto" element={<Alphabet />} />
                <Route path="/test" element={<DataComponent />} />
                <Route path="/aprendizaje/inicio" element={<Index />} />
                <Route path="/nivel-iniciado" element={<ModuloIniciado />} />
                <Route path="/nivel-principiante" element={<ModuloPrincipiante />} />
                <Route path="/nivel-usuario-lsv" element={<ModuloUsuarioLSV />} />
                <Route path="/aprendizaje/stepper/alfabeto" element={<Stepper />} />
            </Routes>
        </BrowserRouter>
    );
};