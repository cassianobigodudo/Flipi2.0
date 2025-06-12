import React, { useContext, useEffect, useState  } from 'react'
import { useNavigate } from "react-router-dom"
import './LandingPage.css'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

function LandingPage() {

    const navigate = useNavigate()
    const { posicaoUsuarioID, setPosicaoUsuarioID, vetorObjetosUsuarios, usuarioLogado, dadosUsuarioLogado, setDadosUsuarioLogado, idUsuarioLogado } = useContext(GlobalContext)
    const { biblioteca } = useContext(GlobalContext)
    const [livros, setLivros] = useState([])

    const atualizarCatalogo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/livro`)
            const dadosDoLivro = response?.data
            setLivros(dadosDoLivro)
            console.log('Livro que foi puxado pelo get: ', dadosDoLivro)
        } catch (error) {
            console.error('Erro ao puxar os livros:', error)
        }
    }

    useEffect(() => {
        console.log(vetorObjetosUsuarios)

        if (usuarioLogado === true) {
            for (let i = 0; i < vetorObjetosUsuarios.length; i++) {
                if (vetorObjetosUsuarios[i].usuario_id === posicaoUsuarioID) {
                    setPosicaoUsuarioID(vetorObjetosUsuarios[i].usuario_id)
                    let ul = vetorObjetosUsuarios.filter((u) => u.usuario_id === posicaoUsuarioID)
                    setDadosUsuarioLogado(ul[0])
                }
            }
        }
        atualizarCatalogo()
    }, [])

    const getLivroByIndex = (index) => {
        return livros[index] || { livro_titulo: 'Carregando...', livro_capa: '' }
    }

    useEffect(() => {
        console.log(posicaoUsuarioID)
    }, [posicaoUsuarioID])

    useEffect(() => {
        console.log(dadosUsuarioLogado)
    }, [dadosUsuarioLogado])

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

                            <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 0 } })}>
                                        {getLivroByIndex(0).livro_capa ? (
                                            <img src={getLivroByIndex(0).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(0).livro_titulo}</p>
                                    </button>

                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 1 } })}>
                                        {getLivroByIndex(1).livro_capa ? (
                                            <img src={getLivroByIndex(1).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(1).livro_titulo}</p>
                                    </button>
                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 2 } })}>
                                        {getLivroByIndex(2).livro_capa ? (
                                            <img src={getLivroByIndex(2).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(2).livro_titulo}</p>
                                    </button>

                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 3 } })}>
                                        {getLivroByIndex(3).livro_capa ? (
                                            <img src={getLivroByIndex(3).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(3).livro_titulo}</p>
                                    </button>
                            </div>
    
                        </div>

                        <div className="div-Fila-livros-landing">

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 4 } })}>
                                        {getLivroByIndex(4).livro_capa ? (
                                            <img src={getLivroByIndex(4).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(4).livro_titulo}</p>
                                    </button>

                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 5 } })}>
                                        {getLivroByIndex(5).livro_capa ? (
                                            <img src={getLivroByIndex(5).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(5).livro_titulo}</p>
                                    </button>

                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 6 } })}>
                                        {getLivroByIndex(6).livro_capa ? (
                                            <img src={getLivroByIndex(6).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(6).livro_titulo}</p>
                                    </button>

                            </div>

                            <div className="div-box-titulo">

                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 7 } })}>
                                        {getLivroByIndex(7).livro_capa ? (
                                            <img src={getLivroByIndex(7).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(7).livro_titulo}</p>
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
