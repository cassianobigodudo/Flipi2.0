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

          <label htmlFor="">ISBN</label>
          <input type="text" placeholder='Código ISBN aqui...' />
        </div>

        <div className="info-container-livroContainer">


          <div className="livroContainer-capa"></div>
          <div className="livroContainer-desc"></div>


        </div>
        <div className="livroContainer-tags"></div>

      </div>

    </div>


  </div>    

 
  )
}

export default TelaEscrivaninha
  