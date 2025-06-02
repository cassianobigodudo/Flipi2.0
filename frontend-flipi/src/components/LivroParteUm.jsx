import { useContext, useEffect, useState } from "react"
import "./LivroParteUm.css"
import LivroParteDois from "./LivroParteDois"
import EstrelasBtn from "./EstrelasBtn"
import NavbarVertical from "./NavbarVertical"
import { GlobalContext } from "../contexts/GlobalContext"
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"

function LivroParteUm() {

    const {biblioteca, setLivroAcessado, livroAcessado} = useContext(GlobalContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [tituloLivro, setTituloLivro] = useState()
    const [capa, setCapa] = useState()
    const [ano, setAno] = useState()
    const [sinopse, setSinopse] = useState()
    const [autor, setAutor] = useState()
    const [editora, setEditora] = useState()
    const [isbn, setIsbn] = useState(9780543859327)
    const [resenhaId, setResenhaId] = useState(2)
    const [livroRecebido, setLivroRecebido] = useState('')
    // Verifica se o state tem o índice
/* 
    const index = location.state?.index; */

    // Pega o livro pelo índice/* 
    /* 
    const livro = biblioteca[index];   */

    // chama o componente dois do livro
    const [resenhas, setResenhas] = useState(false)

    
    
    
    async function pegarLivro(){
        
        
        
        try {
            // setMensagem('Buscando livro...')
            console.log('entrei no try')
            const response = await axios.get(`http://localhost:3000/livro/${isbn}`)
            
            console.log('entrei na rota')
            
            const dadosDoLivro = response?.data 
            console.log('puxei as infos')
            
            setTituloLivro(dadosDoLivro.livro_titulo)
            setSinopse(dadosDoLivro.livro_sinopse)
            setCapa(dadosDoLivro.livro_capa)
            setAno(dadosDoLivro.livro_ano)
            setEditora(dadosDoLivro.editora.editora_nome)
            console.log('setei as infos')
            
            console.log('Livro que foi puxado pelo get: ', dadosDoLivro)
        } catch (error) {
            console.error('Erro ao puxar os livros:', error)
        }
        
    }

    

    function escrivaninha(){
        
        // passando o livro para a variável
        /* 
        setLivroAcessado(livro) */
        navigate("/telaescrivaninha")
    }
    



  return (
    <div>

        <div className="container-tela">

            <div className="parte-cima">

                <div className="parte-capa-livro">

                    <div className="capa-livro">
                        <img src={capa} alt="" className="imagem-capa-livro"/>
                    </div>

                    <div className="parte-classificacao">
                        <div className="estrelas-btn-livro">

                           

                        </div>        
                    </div>

                </div>

                <div className="parte-textos">

                    <div className="textos">

                        <div className="titulo-livro">
                            <h6 className="h3-tituloLivro">Título: {tituloLivro}</h6>
                        </div>

                        <div className="descricao-livro">
                            <h6 className="h4-descricaoLivro">ISBN: {isbn}</h6>
                        </div>

                        <div className="descricao-livro">
                            <h6>Autor/a: {autor} </h6>   <h6>Editora: {editora}</h6>
                        </div>

                        <div className="descricao-livro"> 
                            <h6>Ano: {ano}</h6>
                        </div>

                        <div className="sinopse-livro">

                            <label className="lbl-sinopseLivro" htmlFor="">{sinopse}</label>

                        </div>

                      {/*   <div className="genero-livro">

                            {livro.generoLivro && livro.generoLivro.length > 0 ? (
                                livro.generoLivro.map((genero, index) => (
                                    <div key={index} className="box-genero">#{genero}</div>
                                ))
                                ) : (
                                <div className="box-genero">#SemGênero</div>
                            )}

                        </div> */}

                    </div>

                </div>

                <div className="parte-menus">

                    <button onClick={() => {navigate("/telaprincipal")}} className="botao-menuUm"> <img src="../public/icons/ant-design--home-outlined.svg" alt="" className="icone-botao"/> </button>
                    
                    <button onClick={escrivaninha}  className="botao-menuDois"><img src="public/icons/escrita.png" alt="" className="icone-botao"/></button>

                    <button onClick={() => {navigate("/telausuarioconfigs")}} className="botao-menuTres"><img src="./public/images/setting.svg" alt="" className="icone-botao"/> </button>
                    


                </div>

            </div>

            <div className="parte-baixo">

                <button className="botao-resenha">Resenhas |  </button>

                <button className="botao-icone" onClick={ () => setResenhas(!resenhas)}><img src="./images/down.png" alt="" className="icone-down"/></button> 
                <button className="botao-icone" onClick={pegarLivro}><img src="./images/down.png" alt="" className="icone-down"/></button> 
                

            </div>

            <div className="container-parte-resenhas">
 
                {resenhas && <LivroParteDois nomeUsuario={"Jaime"} />} 

            </div>

        </div>
            
    </div>
  )
}

export default LivroParteUm
