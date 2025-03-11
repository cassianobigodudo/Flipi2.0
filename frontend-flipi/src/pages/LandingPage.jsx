import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import './LandingPage.css'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import CapaLivro from '../components/CapaLivro'

function LandingPage() {

    const navigate = useNavigate()

    const {biblioteca} = useContext(GlobalContext)

    const bibliotecaLandingPage = []
    let livroGerado

    const usados = new Set(); // Para evitar repetições
    
    for (let i = 0; i < 8; i++){
        
        do {
            
            livroGerado = (Math.floor(Math.random() * biblioteca.length))
            
        } while (usados.has(livroGerado));
        
        bibliotecaLandingPage.push(biblioteca[livroGerado])
        usados.add(livroGerado);

    }

    console.log(bibliotecaLandingPage)
    
  return (

    <div className='container-landing-page'>

        <div className='retangulo-um'>

            <div className='retangulo-dois'>

                <div className='retangulo-tres'>

                    <div className='div-espaco-vazio'>

                    </div>

                    <div className="div-esquerda">

                        <div className="div-barra-de-pesquisa">

                            <input className='inpt-pesquisa' type="text" placeholder='Pesquise um livro em específico'/>

                            <button className="btn-pesquisar">
                                <img className='icons-pesquisar' src="public/icons/big-search-len.png" alt="" />
                            </button>

                        </div>

                        <div className="container-logo-nome">

                            <div className="div-nome-do-site">
                                <h1>Bem-vindo ao</h1>
                            </div>

                            <div className='div-logo-site'>
                                <img className='logo-site' src="./images/logo.png" alt="" />
                            </div>

                            
                        </div>

                        <div className="div-informacoes">

                            <div className="div-slogan">
                              <label className='slogan-home'>Compartilhe suas leituras, inspire outros leitores!</label>
                            </div>

                            <div className="div-btns">
                                <button className='btn-cadastro'onClick={() => {navigate("/telacadastro")}}>Cadastrar-se</button>
                                <button className='btn-logar' onClick={() => {navigate("/telalogin")}}>Entrar</button>
                            </div>


                        </div>

                        <div className="container-contatos">

                            <div className="divisao-um"></div>
                            <div className="divisao-dois"></div>

                            <button className="btn-contacts">Contact Us</button>

                        </div>
                    
                    </div>

                    <div className="container-livros-direita">

                        <div className="div-espaco-vazio-landing">

                        </div>

                        <div className="parte__livros">

                            {bibliotecaLandingPage.map((livro) => (
                                <CapaLivro key={livro.isbnLivro} capa={livro.capaLivro} titulo={livro.tituloLivro}/>
                            ))};

                        </div>

                        <div className="div-divisoes-direita">

                            <div className="div-divisao-um"></div>
                            <div className="div-divisao-dois"></div>

                        </div>

                    </div>

                    <div className="div-elementos">

                        <div className="div-home-escrivaninha">

                        </div>

                    </div>

                </div>

            </div>
            
        </div>
      
    </div>

  )
}

export default LandingPage
