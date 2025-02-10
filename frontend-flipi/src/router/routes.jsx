import { createBrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";
import Contato from "../pages/Contato";
import Generica from "../pages/Generica";
import Final from "../pages/Final";
import Agua from "../pages/Agua";
import TelaCadastro from "../pages/TelaCadastro";
import TelaLogin from "../pages/TelaLogin";
import TelaEscrivaninha from "../pages/TelaEscrivaninha";
import TelaUsuarioConfigs from "../pages/TelaUsuarioConfigs";
import TelaPrincipal from "../pages/TelaPrincipal";
import LandingPage from "../pages/LandingPage";
import TelaLivro from "../pages/TelaLivro";

const router = createBrowserRouter([
    // {path: "/", element: <Home />},
    {path: "/contato", element: <Contato />},
    {path: "/generica", element: <Generica />},
    {path: "/final", element: <Final />},
    {path: "/agua", element: <Agua />},
    {path: "/telacadastro", element: <TelaCadastro />},
    {path: "/telalogin", element: <TelaLogin/>},
    {path: "/telaescrivaninha", element: <TelaEscrivaninha/>},
    {path: "/telausuarioconfigs", element: <TelaUsuarioConfigs/>},
    {path: "/telaprincipal", element: <TelaPrincipal />},
    {path: "/", element: <LandingPage />},
    {path: "/telalivro", element: <TelaLivro/>}

])

export default router;
