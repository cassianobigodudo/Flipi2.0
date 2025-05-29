import "./LivroParteDois.css"
import { useContext, useState } from "react"
import { GlobalContext } from '../contexts/GlobalContext'
import axios from "axios";

function LivroParteDois() {

    // const {biblioteca} = useContext(GlobalContext)
    const {biblioteca, setLivroAcessado} = useContext(GlobalContext);
    const [resenhaTexto, setResenhaTexto] = useState('')
    const [resenhaId, setResenhaId] = useState(1)


    const pegarResenha = async () => {
        
        
        
        try {
            // setMensagem('Buscando livro...')
            
            
            const response = await axios.get(`http://localhost:3000/resenha/${resenhaId}`)
            
            
            const dadosDaResenha = response?.data 

            setResenhaTexto(dadosDaResenha.resenha_texto)


            
            
            console.log('Id da resenha que foi puxado pelo get: ', dadosDaResenha)
        } catch (error) {
            console.error('Erro ao puxar os livros:', error)
        }
        
    }
    
    
  return (
    <div className="container-mae-resenhas">

        <div className="container-resenhas">

            <div className="container-resenha-usuarios">

                <div className="box-resenha">

                    {biblioteca[0].resenhasLivro && biblioteca[0].resenhasLivro.length > 0 ? (
                        biblioteca[0].resenhasLivro.map((resenha, index) => (
                            <div key={index} className="resenha-container">

                                {/* Foto e Nome */}
                                <div className="parte-foto-nome">

                                    <div className="foto-perfil">

                                        <img src="./images/icone-usuario.png" alt="Foto de perfil" className="imagem-perfil" />

                                    </div>

                                    <h3>{resenha.nomeUsuario}</h3>

                                </div>

                                {/* Texto da Resenha */}
                                <div className="parte-resenha">

                                    <label htmlFor="" className="texto-resenha">{resenhaTexto}</label>

                                </div>

                                {/* Curtidas */}
                                <div className="parte-curtida">

                                <button onClick={pegarResenha} ></button>
                                    <button className="botao-curtida">

                                        <img src="./images/like.svg" alt="Curtir" className="icone-curtida" />

                                    </button>

                                    <label htmlFor="" className="label-curtidas">CURTIDAS</label>

                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="box-resenha-vazio">Nenhuma resenha disponível</div>
                    )}

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default LivroParteDois
