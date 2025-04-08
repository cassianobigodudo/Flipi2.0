import React, { useContext, useEffect, useState } from 'react'
import "./TelaEscrivaninha.css"
import EstrelasBtn from '../components/EstrelasBtn'
import NavbarVertical from '../components/NavbarVertical'
import { GlobalContext } from '../contexts/GlobalContext'
import { useLocation, useNavigate } from 'react-router-dom'





function TelaEscrivaninha() {

  // useEffect (() => {

  //   if(usuarioLogado == false){

  //     alert('Não há usuário logado, por favor, cadastre-se ou entre na sua conta.')
  //     navigate('/')
  //   }

  // }, [])
  
  
  
  
  const location = useLocation()
  const navigate = useNavigate()
  const {usuarioLogado} = useContext(GlobalContext)


  const {biblioteca, livroAcessado, setLivroAcessado, vetorObjetosUsuarios, posicaoUsuarioID, dadosUsuarioLogado, livro} = useContext(GlobalContext)
  const [abrirCaixa, setAbrirCaixa] = useState(false)

  //passando o valor do textarea para o usestate
  const [resenha, setResenha] = useState('')

  function verificarCampoResenha(){

    if (resenha == ''){

      return true
    }
    return false


  }


  function cadastrarResenha() {
    if (verificarCampoResenha()) {
        alert('Insira algum texto dentro da resenha!');
    } else {
        // Cria a nova resenha
        const novaResenha = {
            nomeUsuario: '', // Inicializa vazio; será atualizado abaixo
            resenhaUsuario: resenha, // Atribui o texto da resenha
        };

        // Busca o usuário logado pelo ID
        const usuarioAtualizado = vetorObjetosUsuarios.find(e => e.usuario_id === posicaoUsuarioID);

        if (usuarioAtualizado) {
            novaResenha.nomeUsuario = usuarioAtualizado.usuario_apelido;
        } else {
            console.error('Usuário não encontrado!');
            return;
        }

        // Atualiza o estado de `livroAcessado`
        setLivroAcessado((prevState) => ({
            ...prevState,
            resenhasLivro: [...prevState.resenhasLivro, novaResenha], // Adiciona a nova resenha ao array
        }));

        console.log('Nova resenha adicionada:', novaResenha);
    }


  }
  useEffect(() => {
    
    console.log(livroAcessado)

  }, [livroAcessado]) 

  return (
    
  <div className="tela-escrivaninha-container">

    <div className="escrivaninha-mesa">


      <div className="escrivaninha-navbarVertical">
        <NavbarVertical />
      </div>

      <div className="escrivaninha-resenha-container">

        <div className="resenha-container-textBlock">
      
         <input maxLength={40} className='inpt-tituloResenha' placeholder='TITULO...' type="text" />
         <textarea placeholder='Começe sua resenha aqui...' maxLength={1600} className='inpt-resenha' name="resenha" id="" cols="10" rows="10" 
          value={resenha}
          onChange={(event) => setResenha(event.target.value)}
         ></textarea>

        </div>

      </div>

      <div className="escrivaninha-info-container">
        <div className="info-container-isbn">

          <label className='Infor-container-isbnlbl' htmlFor="">ISBN</label>

          <button onClick={() => setAbrirCaixa(true)}  className='infor-container-isbnQuestion' >?</button>

          <input className='infor-container-isbnInpt' minLength={10} maxLength={13} type="number" placeholder='Código ISBN aqui...' />
        </div>

        <div className="info-container-livroContainer">

          <div className="livroContainer-capa"></div>

          <div className="livroContainer-desc">
            <div className="desc-livroTitulo"> 
              <label className='livroTituloLbl' htmlFor="">A ILHA</label>
            </div>
            <div className="desc-livroDesc">

      <textarea readOnly className='livroDesc-textArea' name="" id="">"A Ilha é um romance intrigante que mistura suspense, 
        drama e reflexões profundas sobre a natureza humana,
         a solidão e os segredos que nos assombram. 
         a narrativa transporta o leitor para um ambiente isolado e misterioso, 
         onde os personagens são confrontados não apenas com as forças da natureza, 
         mas também com um gato lá, e assim como foi escrito naquele livro anterior lá, 
         é revelado que ná verdade a ilha é uma cidade secreta em baixo da agua que antes era habitada
          por leõasda que antes eram capazes sfe aleerem as e abanquet aé um o´´toeitmo 
          jgog qur realmente te faz poensar nesse pontopara um ambiente isolado e misterioso, 
         onde os personagens são confrontados não apenas com as forças da natureza, 
         mas também com um gato lá, e assim como foipara um ambiente isolado e misterioso, 
         onde os personagens são confrontados não apenas com as forças da natureza, 
         mas também com um gato lá, e assim como foi"
      </textarea>

            </div>
          </div>


        </div>
        <div className="livroContainer-tags">
          <button className='tags-btnAutor' >Autor-Adrian McKinty</button>
          <button className='tags-btnEditora'>Editora-Linuxs Zaus</button>
          <button className='tags-btnData'>Data-01/021985 </button>
        </div>
        <div className="livroContainer-nota">

          <div className="nota-labelEspaco">

          <label className='livroContainer-labelNota' htmlFor="">Qual nota daria a esse livro?</label>

          </div>
          
          <div className="estrelas-div">

          <div className="estrelas-buttons">
            
          <EstrelasBtn />

          </div>

        </div>
        </div>
        <div className="livroContainer-enviar">
          <button className='livroContainer-btnEnviar' >ENVIAR RESENHA</button>
        </div>

      </div>

    </div>

      <dialog open={abrirCaixa}> 

        <div className="dialog-div">
          <h1 className='dialogLbl' >Para usar um ISBN, você pode pesquisá-lo em bancos de dados como o Open Library,
             Google Books ou sites de editoras para obter informações sobre um livro específico. 
</h1>
        </div>

      </dialog>


  </div>    

 
  )
}

export default TelaEscrivaninha
  