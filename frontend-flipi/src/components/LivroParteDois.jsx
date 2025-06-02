import "./LivroParteDois.css"
import { useContext, useState } from "react"
import { GlobalContext } from '../contexts/GlobalContext'
import axios from "axios";

function LivroParteDois() {

    // const {biblioteca} = useContext(GlobalContext)
    const {biblioteca, setLivroAcessado} = useContext(GlobalContext);
    const [resenhaId, setResenhaId] = useState(2)
    const [resenha, setResenha] = useState('')

    
    const pegarResenha = async () => {
        
        
        
        try {
            // setMensagem('Buscando livro...')
            
            
            const response = await axios.get(`http://localhost:3000/resenha/${resenhaId}`)
            
            
            const dadosDaResenha = response?.data 

            setResenha(dadosDaResenha[0])



            


            
            
            console.log('Id da resenha que foi puxado pelo get: ', dadosDaResenha)
            
            console.log('Current resenha state:', resenha)
            JSON.stringify(resenha, null, 2)
        } catch (error) {
            console.error('Erro ao puxar os livros:', error)
        }
        
    }
    
    
  return (
    <div className="container-mae-resenhas">

        <div className="container-resenhas">

            <div className="container-resenha-usuarios">

                <div className="box-resenha">

                            <div className="resenha-container">

                                {/* Foto e Nome */}
                                <div className="parte-foto-nome">

                                    <div className="foto-perfil">

                                        <img src="./images/icone-usuario.png" alt="Foto de perfil" className="imagem-perfil" />

                                    </div>

                                    <h3>{resenha.resenha_autor}{resenha.resenha_titulo}</h3>

                                </div>

                                {/* Texto da Resenha */}
                                <div className="parte-resenha">

                                    <label htmlFor="" className="texto-resenha">{resenha.resenha_texto}</label>

                                </div>

                                {/* Curtidas */}
                                <div className="parte-curtida">

                                <button onClick={pegarResenha} >TEST</button>
                                    <button className="botao-curtida">

                                        <img src="./images/like.svg" alt="Curtir" className="icone-curtida" />

                                    </button>

                                    <label htmlFor="" className="label-curtidas">{resenha.resenha_curtidas}</label>

                                </div>

                            </div>
                   
                        <div className="box-resenha-vazio"></div>
                   

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default LivroParteDois
