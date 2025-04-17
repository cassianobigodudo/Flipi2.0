import React, { useContext, useEffect, useState } from 'react'
import "./TelaEscrivaninha.css"
import EstrelasBtn from '../components/EstrelasBtn'
import NavbarVertical from '../components/NavbarVertical'
import { GlobalContext } from '../contexts/GlobalContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { use } from 'react'




function TelaEscrivaninha() {

   useEffect (() => {

     if(usuarioLogado == false){

       alert('Não há usuário logado, por favor, cadastre-se ou entre na sua conta.')
      navigate('/')
     }

   }, [])
  
  
  
  
  const location = useLocation()
  const navigate = useNavigate()
  const {usuarioLogado} = useContext(GlobalContext)


  const {biblioteca, livroAcessado, setLivroAcessado, vetorObjetosUsuarios, posicaoUsuarioID, dadosUsuarioLogado, livro} = useContext(GlobalContext)
  const [abrirCaixa, setAbrirCaixa] = useState(false)

  //passando o valor do textarea para o usestate
  const [resenhaTitulo, setResenhaTitulo] = useState()
  const [resenha, setResenha] = useState()
  const [notaResenha, setNotaResenha] = useState()
  const [isbn, setIsbn] = useState()
  const [divInfo, setDivInfo] = useState('')


  function dialogFunc() {

    if (abrirCaixa == false){

      setAbrirCaixa(true)

    }else{
      setAbrirCaixa(false)
    }
    
  }

  function verificarCampoResenha(){

    if (resenha == ''){

      return true
    }
    return false


  }


  function cadastrarResenha() {
    if (verificarCampoResenha()) {
    } else {
        // Cria a nova resenha
        const novaResenha = {
            nomeUsuario: '', // Inicializa vazio; será atualizado abaixo
            tituloResenha: resenhaTitulo , // titulo da resenha 
            resenhaUsuario: resenha ,// Atribui o texto da resenha
            nota: notaResenha // :D N
            
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
      
         <input maxLength={40} className='inpt-tituloResenha' placeholder='TITULO...' type="text"
          onChange={(event) => setResenhaTitulo(event.target.value)} 
          value={resenhaTitulo} />
         <textarea placeholder='Começe sua resenha aqui...' maxLength={1600} cols="10" rows="10"  className='inpt-resenha' name="resenha" id="" 
          value={resenha}
          onChange={(event) => setResenha(event.target.value)}
         ></textarea>

        </div>

      </div>

      <div className="escrivaninha-info-container">
        <div className="info-container-isbn">

          <label className='Infor-container-isbnlbl' htmlFor="">ISBN</label>

          <button onClick={dialogFunc}  className='infor-container-isbnQuestion' >?</button>

          <input className='infor-container-isbnInpt' minLength={10} maxLength={13} type="number" placeholder='Código ISBN aqui...' 
          value={resenha}
          onChange={(event) => setResenha(event.target.value)}/>
        </div>

        <div className="info-container-livroContainer">

          <div className="livroContainer-capa">
          <img className='capa-img' src={livroAcessado.capaLivro} alt="" />
          </div>

          <div className="livroContainer-desc">
            <div className="desc-livroTitulo"> 
              <label className='livroTituloLbl' htmlFor="">{livroAcessado.tituloLivro}</label>
            </div>
            <div className="desc-livroDesc">

      <textarea readOnly className='livroDesc-textArea' value={livroAcessado.sinopseLivro} name="" id="">
      </textarea>


      

            </div>
          </div>


        </div>
        <div className="livroContainer-tags">
          <button className='tags-btnAutor' >Autor:  {livroAcessado.autorLivro}</button>
          <button className='tags-btnEditora'>Editora:  {livroAcessado.editoraLivro}</button>
          <button className='tags-btnData'>Ano:  {livroAcessado.anoLivro}</button>
        </div>
        <div className="livroContainer-nota">

          <div className="nota-labelEspaco">

          <label className='livroContainer-labelNota' htmlFor="">Avalie esse livro:</label>

          </div>
          
          <div className="estrelas-div">

          <div className="estrelas-buttons">
            
          <EstrelasBtn onRatingChange={setNotaResenha}/>
          

          </div>

        </div>
        </div>
        <div className="livroContainer-enviar">
          <button className='livroContainer-btnEnviar'  onClick={cadastrarResenha} >ENVIAR RESENHA</button>
        </div>

      </div>

    </div>

      <dialog open={abrirCaixa}> 

        <div className="dialog-divAtivo">
          <h1 className='dialogLbl' >Para usar um ISBN, você pode pesquisá-lo em bancos de dados como o - 
          <a href="https://openlibrary.org/" target='_blank' >Open Library</a>,
             Google Books ou sites de editoras para obter informações sobre um livro específico. 
</h1>

        </div>

      </dialog>


  </div>    

 
  )
}

export default TelaEscrivaninha
  