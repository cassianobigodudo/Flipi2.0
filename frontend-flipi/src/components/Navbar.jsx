import { Link, useNavigate } from "react-router-dom"
import './Navbar.css'

function Navbar() {

  const navigate = useNavigate()
  
  return (
    <nav className="navbar">
{/*        
        <Link to="/telacadastro">Cadastro</Link>
        <Link to="/telalogin">Login</Link>
        <Link to="/telaescrivaninha">Escrivaninha</Link>
        <Link to="/telausuarioconfigs">UsuárioConfig</Link>
        <Link to="/telaprincipal">Home</Link>
        <Link to="/landingpage">Landing page</Link>
        <Link to="/telalivro">Tela Livro</Link> */}

        <button className="btnavbar" onClick={() => {navigate("/landingpage")}} >Landing Page</button>
        <button className="btnavbar" onClick={() => {navigate("/telaprincipal")}} >Página Inicial</button>
        <button className="btnavbar" onClick={() => {navigate("/telacadastro")}} >Cadastro</button>
        <button className="btnavbar" onClick={() => {navigate("/telalogin")}} >Login</button>
        <button className="btnavbar btnescrivaninha" onClick={() => {navigate("/telaescrivaninha")}} >Escrivaninha</button>
        <button className="btnavbar" onClick={() => {navigate("/telalivro")}} >Livro</button>
        <button className="btnavbar" onClick={() => {navigate("/telausuarioconfigs")}} >Config</button>
    </nav>
  )
}

export default Navbar
