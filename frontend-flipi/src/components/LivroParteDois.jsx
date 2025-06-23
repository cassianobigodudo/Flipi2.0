import "./livroParteDois.css"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from '../contexts/GlobalContext'
import axios from "axios";
import ResenhaLivro from "./ResenhaLivro";

function LivroParteDois({livroSelecionado, resenhaInd}) {

    const {biblioteca, setlivroAcessado} = useContext(GlobalContext);
    const [isbnLivro, setIsbnLivro] = useState()
    const [resenhaId, setResenhaId] = useState('')

    const [resenhas, setResenhas] = useState([])
    const [usuarios, setUsuarios] = useState({})

    const pegarResenhasDoLivro = async (isbn) => {
        try {
            console.log('Buscando resenhas do livro ISBN:', isbn)
            const response = await axios.get(`http://localhost:3000/resenha`)
            const todasResenhas = response?.data 

            if (todasResenhas && todasResenhas.length > 0) {
                const resenhasDoLivro = todasResenhas.filter(resenha => 
                    resenha.livro_isbn === isbn
                )
                setResenhas(resenhasDoLivro)
                console.log('Resenhas do livro:', resenhasDoLivro)
            } else {
                setResenhas([])
            }
        } catch (error) {
            console.error('Erro ao puxar as resenhas:', error)
        }
    }

    const pegarUsuarios = async (resenhasDoLivro) => {
        try {
            const usuariosUnicos = [...new Set(resenhasDoLivro.map(resenha => resenha.usuario_id))]
            const usuariosData = {}
            
            for (const usuarioId of usuariosUnicos) {
                const response = await axios.get(`http://localhost:3000/usuario/${usuarioId}`)
                usuariosData[usuarioId] = response.data
            }
            
            setUsuarios(usuariosData)
            console.log('Dados dos usuários:', usuariosData)
        } catch (error) {
            console.error('Erro ao puxar os usuários:', error)
        }
    }

    const atualizarCurtidas = (resenhaId, novasCurtidas) => {
        setResenhas(resenhasAtuais => 
            resenhasAtuais.map(resenha => 
                resenha.resenha_id === resenhaId 
                    ? { ...resenha, resenha_curtidas: novasCurtidas }
                    : resenha
            )
        );
    };

    useEffect(() => {
        console.log('Resenhas atualizadas:', resenhas)
    }, [resenhas])

    useEffect(() => {
        if (livroSelecionado && livroSelecionado.livro_isbn) {
            console.log('Livro selecionado:', livroSelecionado)
            pegarResenhasDoLivro(livroSelecionado.livro_isbn)
        }
    }, [livroSelecionado])

    useEffect(() => {
        if (resenhas.length > 0) {  
            pegarUsuarios(resenhas)
        }
    }, [resenhas])
   
    return (
        <div className="container-mae-resenhas">
            <div className="container-resenhas">
                <div className="container-resenha-usuarios">
                    
                    {resenhas.length === 0 ? (
                        <p>Nenhuma resenha encontrada para este livro.</p>
                    ) : (
                        resenhas.map((resenhaOrganizada, pos) => (
                            <div key={pos} className="box-resenha">
                                <div className="resenha-container">
                                    <ResenhaLivro 
                                        resenhaTitulo={resenhaOrganizada.resenha_titulo}
                                        resenhaTexto={resenhaOrganizada.resenha_texto}
                                        resenhaCurtidas={resenhaOrganizada.resenha_curtidas}
                                        resenhaNota={resenhaOrganizada.resenha_nota}
                                        usuarioId={resenhaOrganizada.usuario_id}
                                        usuarioApelido={usuarios[resenhaOrganizada.usuario_id]?.usuario_apelido}
                                        resenhaId={resenhaOrganizada.resenha_id} 
                                        onCurtidaAtualizada={atualizarCurtidas} 
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default LivroParteDois