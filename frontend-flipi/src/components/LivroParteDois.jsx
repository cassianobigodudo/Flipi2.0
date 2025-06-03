import "./livroParteDois.css"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from '../contexts/GlobalContext'
import axios from "axios";

function livroParteDois({livroSelecionado}) {

    // const {biblioteca} = useContext(GlobalContext)
    const {biblioteca, setlivroAcessado} = useContext(GlobalContext);
    const [isbnLivro, setIsbnLivro] = useState()
    const [resenhaId, setResenhaId] = useState('')
    const [resenha, setResenha] = useState('')



   
     const pegarResenha = async () => {
        


        try {
            // setMensagem('Buscando livroSelecionado...')
            
      
            
            const response = await axios.get(`http://localhost:3000/resenha/${resenhaId}`)
            
            
            const dadosDaResenha = response?.data 

            setResenha(dadosDaResenha[0])

            console.log('Id da resenha que foi puxado pelo get: ', dadosDaResenha)
            JSON.stringify(resenha)
            console.log('livro selecionado:',livroSelecionado)

        } catch (error) {
            console.error('Erro ao puxar os livroSelecionados:', error)
        }
        
    if(resenha == "hahhahahaha"){
        alert("OH NÃO")
    }
}


 const verificar = async () =>{


    if(livroSelecionado.livro_isbn != resenha.livro_isbn){

        setResenha("hahhahahaha")
        alert("aAAAAAAAAAAAAAAAHHHHHHHHHH")
    }else{
        return
    }


}

useEffect(() => {
    verificar()
   }, [livroSelecionado])

useEffect(() => {
    pegarResenha()
   }, [livroSelecionado])
   
   useEffect(() => {
       if (livroSelecionado != null) {
           console.log('livroSelecionado recebido:', livroSelecionado)
           
           if (livroSelecionado.livroSelecionado_isbn != null) {
               pegarlivroSelecionado(livroSelecionado.livroSelecionado_isbn)
           } else {
               setIsbnLivro(livroSelecionado.livroSelecionado_isbn || '')
           }
       }
   }, [livroSelecionado])
    
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

                                    <h3>{resenha.resenha_id}{resenha.resenha_titulo} {resenha.livro_isbn}</h3>

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

export default livroParteDois
