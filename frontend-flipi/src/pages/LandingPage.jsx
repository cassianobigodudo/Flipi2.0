import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import './LandingPage.css'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'

function LandingPage() {

    const navigate = useNavigate()
    const {biblioteca} = useContext(GlobalContext)
    

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

                        <div className="div-Fila-livros-landing">

                            <div className="div-box-titulo">

                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 18 } })}>
                                
                                    <div className="box-19"></div>
                                    <p className='titulos-livros'>{biblioteca[18].tituloLivro}</p>

                                </button>

                            </div>

                            <div className="div-box-titulo">
                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 19 } })}>      

                                    <div className="box-20"></div>
                                    <p className='titulos-livros'>{biblioteca[19].tituloLivro}</p>
                                </button>
                            </div>

                            <div className="div-box-titulo">

                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 0 } })}>
                                   
                                    <div className="box"></div>
                                    <p className='titulos-livros'>{biblioteca[0].tituloLivro}</p>

                                </button>

                            </div>

                            <div className="div-box-titulo">
                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 2 } })}>      
                        
                                    <div className="box-br"></div>
                                    <p className='titulos-livros'>{biblioteca[2].tituloLivro}</p>
                                </button>
                            </div>
    
                        </div>

                        <div className="div-Fila-livros-landing">

                            <div className="div-box-titulo">

                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 4 } })}>

                                    <div className="box-bichos"></div>
                                    <p className='titulos-livros'>{biblioteca[4].tituloLivro}</p>

                                </button>

                            </div>

                            <div className="div-box-titulo">
                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 1 } })}>      

                                    <div className="box-1"></div>
                                    <p className='titulos-livros'>{biblioteca[1].tituloLivro}</p>
                                </button>
                            </div>

                            <div className="div-box-titulo">

                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 6 } })}>
                                
                                    <div className="box-5"></div>
                                    <p className='titulos-livros'>{biblioteca[6].tituloLivro}</p>

                                </button>

                            </div>

                            <div className="div-box-titulo">
                                <button className="btn-livro-home" onClick={() => 
                                    navigate("/telalivro", { state: { index: 7 } })}>      

                                    <div className="box-6"></div>
                                    <p className='titulos-livros'>{biblioteca[7].tituloLivro}</p>
                                </button>
                            </div>

                        </div>

                        <div className="div-divisoes-direita">

                            <div className="div-divisao-um"></div>
                            <div className="div-divisao-dois"></div>

                        </div>

                    </div>

                    <div className="div-elementos">

                        <div className="div-home-escrivaninha"></div>

                    </div>

                </div>

            </div>
            
        </div>
      
    </div>

  )
}

export default LandingPage
