import { useContext, useEffect, useState } from "react"
import "./LivroParteUm.css"
import LivroParteDois from "./LivroParteDois"
import EstrelasBtn from "./EstrelasBtn"
import NavbarVertical from "./NavbarVertical"
import { GlobalContext } from "../contexts/GlobalContext"
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { useParams } from "react-router-dom";


function LivroParteUm({ livro, indexResenha}) {

    const {biblioteca, setLivroAcessado, livroAcessado} = useContext(GlobalContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [tituloLivro, setTituloLivro] = useState('')
    const [capa, setCapa] = useState('')
    const [ano, setAno] = useState('')
    const [sinopse, setSinopse] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [isbn, setIsbn] = useState('')
    const [resenhaId, setResenhaId] = useState(2)
    const [livros, setLivros] = useState([])
    const [resenhas, setResenhas] = useState(false)
    const { isbn: isbnDaUrl } = useParams();


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
    
    const pegarLivro = async (isbn) =>{

        try {
            console.log('Buscando livro com ISBN:', isbn)
            const response = await axios.get(`http://localhost:3000/livro/${isbn}`)
            
            const dadosDoLivro = response?.data 
            
            setTituloLivro(dadosDoLivro.livro_titulo)
            setSinopse(dadosDoLivro.livro_sinopse)
            setCapa(dadosDoLivro.livro_capa)
            setAno(dadosDoLivro.livro_ano)
            setEditora(dadosDoLivro.editora?.editora_nome || '')
            setAutor(dadosDoLivro.autor?.autor_nome || '')
            setIsbn(dadosDoLivro.livro_isbn)
            
            console.log('Livro que foi puxado pelo get: ', dadosDoLivro)
        } catch (error) {
            console.error('Erro ao puxar o livro:', error)
        }
    }

    function escrivaninha(){
        navigate("/telaescrivaninha")
    }

    useEffect(() => {
        atualizarCatalogo()
    }, [])

    // useEffect(() => {
    //     if (livro != null) {
    //         console.log('Livro recebido:', livro)
            
    //         if (livro.livro_isbn != null) {
    //             pegarLivro(livro.livro_isbn)
    //         } else {
    //             setTituloLivro(livro.livro_titulo || '')
    //             setCapa(livro.livro_capa || '')
    //             setAno(livro.livro_ano || '')
    //             setSinopse(livro.livro_sinopse || '')
    //             setAutor(livro.autor?.autor_nome || '')
    //             setEditora(livro.editora?.editora_nome || '')
    //             setIsbn(livro.livro_isbn || '')
    //         }
    //     }
    // }, [livro])
    useEffect(() => {
        if (livro) {
            console.log('Livro recebido via prop:', livro);
            setTituloLivro(livro.livro_titulo || '');
            setCapa(livro.livro_capa || '');
            setAno(livro.livro_ano || '');
            setSinopse(livro.livro_sinopse || '');
            setAutor(livro.autor?.autor_nome || '');
            setEditora(livro.editora?.editora_nome || '');
            setIsbn(livro.livro_isbn || '');
        } else if (isbnDaUrl) {
            console.log('Livro será buscado via URL (ISBN):', isbnDaUrl);
            pegarLivro(isbnDaUrl);
        }
    }, [livro, isbnDaUrl]);
    

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
                        </div>
                    </div>

                    <div className="parte-menus">
                        <button onClick={() => {navigate("/telaprincipal")}} className="botao-menuUm"> 
                            <img src="../public/icons/ant-design--home-outlined.svg" alt="" className="icone-botao"/> 
                        </button>
                        
                        <button onClick={escrivaninha} className="botao-menuDois">
                            <img src="public/icons/escrita.png" alt="" className="icone-botao"/>
                        </button>

                        <button onClick={() => {navigate("/telausuarioconfigs")}} className="botao-menuTres">
                            <img src="./public/images/setting.svg" alt="" className="icone-botao"/> 
                        </button>
                    </div>
                </div>

                <div className="parte-baixo">
                    <button className="botao-resenha">Resenhas |  </button>
                    <button className="botao-icone" onClick={ () => setResenhas(!resenhas)}>
                        <img src="./images/down.png" alt="" className="icone-down"/>
                    </button> 
                </div>

                <div className="container-parte-resenhas">
                    {/* {resenhas && <LivroParteDois livroSelecionado={livro} resenhaInd={indexResenha}/>}  */}
                    {resenhas && <LivroParteDois livroSelecionado={{
                        livro_titulo: tituloLivro,
                        livro_isbn: isbn,
                        livro_ano: ano,
                        livro_sinopse: sinopse,
                        livro_capa: capa,
                        autor: { autor_nome: autor },
                        editora: { editora_nome: editora }
                    }} resenhaInd={indexResenha} />}

                </div>
            </div>
        </div>
    )
}

export default LivroParteUm