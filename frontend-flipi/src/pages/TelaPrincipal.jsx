import React, { useContext, useEffect, useState } from 'react'
import './TelaPrincipal.css'
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import BarraPesquisa from '../components/BarraPesquisa'
import axios from 'axios'


function TelaPrincipal() {
    const { posicaoUsuarioID, setPosicaoUsuarioID, vetorObjetosUsuarios, usuarioLogado, dadosUsuarioLogado, setDadosUsuarioLogado, idUsuarioLogado } = useContext(GlobalContext)
    const { biblioteca } = useContext(GlobalContext)
    const [livros, setLivros] = useState([])

    const navigate = useNavigate()


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


    useEffect (() => {
        // console.log(vetorObjetosUsuarios)

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

      useEffect (() => {

        // console.log(dadosUsuarioLogado)

      }, [dadosUsuarioLogado])

    useEffect(() => {
        // console.log(dadosUsuarioLogado)
    }, [dadosUsuarioLogado])

    return (

        <div className='container-tela-principal'>
            <div className='retangulo-um'>
                <div className='retangulo-dois'>
                    <div className='retangulo-tres'>
                        <div className='div-espaco-vazio'>
                        </div>

                        <div className="div-livros-esquerda">
                            <div className="div-barra-de-pesquisa">

                                <input className='inpt-pesquisa' type="text" placeholder='Pesquise um livro em específico' />
                                <button className="btn-pesquisar" onClick={() => navigate("/telapesquisa")}>
                                    <img className='icons-pesquisar' src="public/icons/big-search-len.png" alt="" />
                                </button>

                            </div>

                            <div className="div-Fila-livros">
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

                            <div className="div-Fila-livros">
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

                            <div className="div-contatos">
                                <div className="div-divisao-um"></div>
                                <div className="div-divisao-dois"></div>
                                <button className="btn-contacts">Contact Us</button>
                            </div>
                        </div>

                        <div className="div-livros-direita">
                            <div className="div-barra-de-pesquisa">
                            </div>

                            <div className="div-Fila-livros">
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 8 } })}>
                                        {getLivroByIndex(8).livro_capa ? (
                                            <img src={getLivroByIndex(8).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(8).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 9 } })}>
                                        {getLivroByIndex(9).livro_capa ? (
                                            <img src={getLivroByIndex(9).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(9).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 10 } })}>
                                        {getLivroByIndex(10).livro_capa ? (
                                            <img src={getLivroByIndex(10).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(10).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 11 } })}>
                                        {getLivroByIndex(11).livro_capa ? (
                                            <img src={getLivroByIndex(11).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(11).livro_titulo}</p>
                                    </button>
                                </div>
                            </div>

                            <div className="div-Fila-livros">
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 12 } })}>
                                        {getLivroByIndex(12).livro_capa ? (
                                            <img src={getLivroByIndex(12).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(12).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 13 } })}>
                                        {getLivroByIndex(13).livro_capa ? (
                                            <img src={getLivroByIndex(13).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(13).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 14 } })}>
                                        {getLivroByIndex(14).livro_capa ? (
                                            <img src={getLivroByIndex(14).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(14).livro_titulo}</p>
                                    </button>
                                </div>

                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => navigate("/telalivro", { state: { index: 15 } })}>
                                        {getLivroByIndex(15).livro_capa ? (
                                            <img src={getLivroByIndex(15).livro_capa} alt="" />
                                        ) : (
                                            <div className="box-placeholder"></div>
                                        )}
                                        <p className='titulos-livros'>{getLivroByIndex(15).livro_titulo}</p>
                                    </button>
                                </div>
                            </div>

                            <div className="div-next-page">
                                <div className="div-divisao-um"></div>
                                <div className="div-divisao-dois"></div>
                                <div className="div-label-next-page">
                                    <button className='btn-next-page' onClick={() => { console.log(posicaoUsuarioID) }}>Next Page</button>
                                </div>
                            </div>
                        </div>

                        <div className="div-elementos">
                            <div className="div-home-escrivaninha">
                                <Link to="/telaprincipal">

                                    <button className="btnss">
                                        <img src="../public/icons/ant-design--home-outlined.svg" alt="" className="icone-botao" />
                                    </button>
                                </Link>

                                <Link to="/telaescrivaninha">
                                    <button className="btnss">
                                        <img src="public/icons/escrita.png" alt="" className="icone-botao" />
                                    </button>

                                </Link>
                            </div>

                            <Link to="/telausuarioconfigs">
                                <button className="btnss">
                                    <img src="./public/images/setting.svg" alt="" className="icone-botao" />
                                </button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TelaPrincipal