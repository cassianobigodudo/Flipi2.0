import "./livroParteDois.css"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from '../contexts/GlobalContext'
import axios from "axios";

function livroParteDois({livroSelecionado, resenhaInd}) {

    // const {biblioteca} = useContext(GlobalContext)
    const {biblioteca, setlivroAcessado} = useContext(GlobalContext);
    const [isbnLivro, setIsbnLivro] = useState()
    const [resenhaId, setResenhaId] = useState('')
    const [resenha, setResenha] = useState([])
    const [usuario, setUsuario] = useState([])


    
     const pegarResenha = async (resenhaInd) => {
        


        try {
            
            console.log(resenhaInd)
            const response = await axios.get(`http://localhost:3000/resenha`)
            
            
            const dadosDaResenha = response?.data 


            if (dadosDaResenha && dadosDaResenha.length > 0) {
                setResenha(dadosDaResenha[resenhaInd]) 
            } else {
                setResenha({}) 
            }

            console.log()

            console.log('resenha que foi puxado pelo get: ', dadosDaResenha)
            JSON.stringify(resenha)

        } catch (error) {
            console.error('Erro ao puxar a resenha:', error)
            console.log('Index', resenhaInd)
        }
        
}

const pegarUserName = async () => {
        


    try {
        

        console.log()
        const response = await axios.get(`http://localhost:3000/usuario/${resenha.usuario_id}`)
        
        
        const dadosDoUsuario = response?.data 

        setUsuario(dadosDoUsuario)

        console.log('dado do usuario que foi puxado pelo get: ', dadosDoUsuario)

        JSON.stringify(usuario)

    } catch (error) {
        console.error('Erro ao puxar o usuario:', error)
    }
    
}

    useEffect(() => {
    pegarResenha(resenhaInd)
    }, [resenhaInd, livroSelecionado])
   

   
   useEffect(() => {
       if (livroSelecionado != null) {
           console.log('livroSelecionado recebido:', livroSelecionado)
           
           if (livroSelecionado.livroSelecionado_isbn != null) {
               pegarlivroSelecionado(livroSelecionado.livroSelecionado_isbn)
           } else {
               setIsbnLivro(livroSelecionado.livroSelecionado_isbn || '')
           }
       }
   }, [livroSelecionado, resenhaInd])


   useEffect(() => {
    if (resenha.usuario_id) {  
        pegarUserName(resenha.usuario_id)
    }
}, [resenha.usuario_id])
   
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

                                    <h2> {usuario.usuario_apelido}</h2>
                                    <h2> {resenha.resenha_titulo} </h2>

                                </div>

                                {/* Texto da Resenha */}
                                <div className="parte-resenha">

                                    <label htmlFor="" className="texto-resenha">{resenha.resenha_texto}</label>

                                </div>

                                {/* Curtidas */}
                                <div className="parte-curtida">

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

export default livroParteDois
