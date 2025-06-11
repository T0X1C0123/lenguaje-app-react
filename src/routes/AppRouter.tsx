import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../modules/auth/login/Login";
import { Landing } from "../modules/landing/Landing";
import { Signup } from "../modules/auth/signup/Signup";
import { Home } from "../modules/content/home/Home";
import { Alphabet } from "../modules/content/alphabet/Alphabet";
import { DataComponent } from "../modules/test/DataComponent";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/learn/home" element={<Home />} />
                <Route path="/learn/alphabet" element={<Alphabet />} />
                <Route path="/test" element={<DataComponent />} />
            </Routes>
        </BrowserRouter>
    );
};