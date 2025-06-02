import React, { useContext, useEffect, useState } from 'react'
import './TelaPrincipal.css'
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

function TelaPrincipal() {
    
    const {posicaoUsuarioID, setPosicaoUsuarioID, vetorObjetosUsuarios, usuarioLogado, dadosUsuarioLogado, setDadosUsuarioLogado}=useContext(GlobalContext)
    const {biblioteca}=useContext(GlobalContext)
    const [livros, setLivros] = useState([])

    const navigate = useNavigate()

    
    const atulizarcatalogo = async () => {

        try {
            // setMensagem('Buscando livro...')
            const response = await axios.get(`http://localhost:3000/livro`)
                      
            const dadosDoLivro = response?.data 
            
            setLivros(dadosDoLivro)
            
            console.log('Livro que foi puxado pelo get: ', dadosDoLivro)
        } catch (error) {
            console.error('Erro ao puxar os livros:', error)
        }



        
    }




    useEffect (() => {
        console.log(vetorObjetosUsuarios)

        if(usuarioLogado == true){
    
            for(let i = 0; i < vetorObjetosUsuarios.length; i++){
    
                if (vetorObjetosUsuarios[i].usuario_id == posicaoUsuarioID){
        
                //   alert(`usuário encontrado com o id ${vetorObjetosUsuarios[i].usuario_id}`)
                  setPosicaoUsuarioID(vetorObjetosUsuarios[i].usuario_id)
                //   setDadosUsuarioLogado(vetorObjetosUsuarios.filter((u) => u.usuario_id == posicaoUsuarioID))
                  let ul = vetorObjetosUsuarios.filter((u) => u.usuario_id == posicaoUsuarioID)
                  setDadosUsuarioLogado(ul[0])
        
                }
              }
        }
    
      }, [])
      
      const getLivroByIndex = (index) => {
        return livros[index] || { livro_titulo: 'Carregando...', livro_capa: '' }
    }

      useEffect (() => {

        console.log(posicaoUsuarioID)

      }, [posicaoUsuarioID])

      useEffect (() => {

        console.log(dadosUsuarioLogado)

      }, [dadosUsuarioLogado])


      return (

        <div className='container-tela-principal'>
    
            <div className='retangulo-um'>
    
                <div className='retangulo-dois'>
    
                    <div className='retangulo-tres'>
    
                        <div className='div-espaco-vazio'>      

                            <button onClick={atulizarcatalogo} >TESTAR</button>               
    
                        </div>
    
                        <div className="div-livros-esquerda">
    
                            <div className="div-barra-de-pesquisa">
    
                                <input className='inpt-pesquisa' type="text" placeholder='Pesquise um livro em específico'/>
    
                                <button className="btn-pesquisar"
                                    onClick={() => navigate("/telapesquisa", { state: { isbn: "2018055526" } })}>
                                    <img className='icons-pesquisar' src="public/icons/big-search-len.png" alt="" />
                                </button>
                                
                                <p className='titulos-livros'>{getLivroByIndex(1).livro_titulo}</p>
    
                            </div>
    
                            <div className="div-Fila-livros">
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro")}>
    
                                        <div className="box-2"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(0).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 1 } })}>
    
                                        <div className="box-1"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(1).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 5 } })}>
    
                                        <div className="box-3"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(2).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 3 } })}>
    
                                        <div className="box-4"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(3).livro_titulo}</p>
                                    </button>
                                </div>
                                
                            </div>
    
                            <div className="div-Fila-livros">
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 6 } })}>
    
                                        <div className="box-5"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(4).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 7 } })}>
    
                                        <div className="box-6"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(5).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 8 } })}>
    
                                        <div className="box-7"></div>
                                        <p className='titulos-livros'>{getLivroByIndex(6).livro_titulo}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 9 } })}>
    
                                        <div className="box-8"></div>
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
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 10 } })}>
    
                                        <div className="box-9"></div>
                                        <p className='titulos-livros'>{biblioteca[10].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 11 } })}>
    
                                        <div className="box-10"></div>
                                        <p className='titulos-livros'>{biblioteca[11].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 12 } })}>
    
                                        <div className="box-11"></div>
                                        <p className='titulos-livros'>{biblioteca[12].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 13 } })}>
    
                                        <div className="box-12"></div>
                                        <p className='titulos-livros'>{biblioteca[13].tituloLivro}</p>
                                    </button>
                                </div>
        
                            </div>
    
                            <div className="div-Fila-livros">
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 14 } })}>
    
                                        <div className="box-13"></div>
                                        <p className='titulos-livros'>{biblioteca[14].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 15 } })}>
    
                                        <div className="box-14"></div>
                                        <p className='titulos-livros'>{biblioteca[15].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 16 } })}>
    
                                        <div className="box-15"></div>
                                        <p className='titulos-livros'>{biblioteca[16].tituloLivro}</p>
                                    </button>
                                </div>
    
                                <div className="div-box-titulo">
                                    <button className="btn-livro-home" onClick={() => 
                                        navigate("/telalivro", { state: { index: 17 } })}>
    
                                        <div className="box-16"></div>
                                        <p className='titulos-livros'>{biblioteca[17].tituloLivro}</p>
                                    </button>
                                </div>
    
                            </div>
    
                            <div className="div-next-page">
    
                                <div className="div-divisao-um"></div>
                                <div className="div-divisao-dois"></div>
    
                                <div className="div-label-next-page">
                                 
                                    <button className='btn-next-page' onClick={() => {console.log(posicaoUsuario)}}>Next Page</button>
    
                                </div>
    
                            </div>
    
                        </div>
    
                        <div className="div-elementos">
    
                        <div className="div-home-escrivaninha">
                            
                                
                                <Link to="/telaprincipal">
                                <button className="btnss">
                                    <img src="../public/icons/ant-design--home-outlined.svg" alt="" className="icone-botao"/>
                                </button>
                                </Link>
    
    
                                <Link to="/telaescrivaninha"> 
                                <button className="btnss"> 
                                <img src="public/icons/escrita.png" alt="" className="icone-botao"/> 
                                </button>
                                </Link>
                                
                            </div>
    
                            <Link to="/telausuarioconfigs"> 
                            <button className="btnss">  
                            <img src="./public/images/setting.svg" alt="" className="icone-botao"/>
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