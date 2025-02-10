import React, { useContext, useEffect, useState } from 'react'
import "./TelaEscrivaninha.css"
import EstrelasBtn from '../components/EstrelasBtn'
import NavbarVertical from '../components/NavbarVertical'
import { GlobalContext } from '../contexts/GlobalContext'
import { useLocation, useNavigate } from 'react-router-dom'





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

      <div className="escrivaninha-documento">
                  
           <div className="documento-folha">
    
              <div className="folha-topo">

                <button className='folha-topo-btn'>
                  <img className='img-lixo-escrivaninha' src="public\images\output-onlinepngtools.png" alt="" /> 
                </button>
              
                <input maxLength={18} className='inpt-tituloResenha' placeholder='TITULO' type="text" />


              </div>
              
              <div className="folha-conteudo">

                <textarea placeholder='Começe sua resenha aqui...' maxLength={800} className='inpt-resenha' name="resenha" id="" cols="10" rows="10" 
                value={resenha}
                onChange={(event) => setResenha(event.target.value)}
                ></textarea>

              
              </div>

              <div className="folha-desfecho">

                <label className='lbl-desfecho' htmlFor="">Preview</label>

              </div>

            </div>
        </div>

        <div className="escrivaninha-container-generoIsbn">

          <div className="container-generoIsnb">

            <div className="generoIsbn-topo"></div>

            <div className="container-informacoesLivro">


            <div className="informacoesLivro-esquerda">

                <div className="informacoesLivro-esquerda-capa">
                <img className='livro-escrivaninha' src={livroAcessado.capaLivro} alt="" />
                
                </div>

                <label className='lbl-DadosLivro'>Autor:  {livroAcessado.autorLivro}</label>
                <label className='lbl-DadosLivro'>Editora:  {livroAcessado.editoraLivro}</label>
                <label className='lbl-DadosLivro'>Ano:  {livroAcessado.anoLivro}</label>  

            </div>

            <div className="informacoesLivro-direita">

              <div className="informacoesLivro-direita-tituloSinopse">

                  <div className="meio-sinopse">

                    <label className='lbl-generos' htmlFor="">{livroAcessado.tituloLivro}</label>

                  <textarea className='sinopse-textArea' value={livroAcessado.sinopseLivro} name="" id="" cols="30" rows="10" readOnly></textarea>
          
                  </div>                   

              </div>

              <div className="informacoesLivro-direita-generos">
                <label className='lbl-generos' htmlFor="">Generos</label>
          
                {livroAcessado && livroAcessado.generoLivro.length > 0 ? (
                  livroAcessado.generoLivro.map((genero, indice) => (
                    <div key={indice} className="btn-generos">#{genero}</div>
                      ))
                      ) : (
                    <div className="btn-generos">#SemGênero</div>
                )}
                
              </div>

            </div>

            </div>

            <div className="generoIsbn-desfecho">

              <label className='desfecho-lbl' htmlFor="">Nota do livro: </label>

              <div className="estrelas-div">

                <EstrelasBtn />

              </div>
        
              <button className='btn-escrivaninha' onClick={cadastrarResenha}>CADASTRAR → </button>

            </div>

          </div>    

        </div>

        <div className="escrivaninha-navbarVertical">

          <NavbarVertical />

        </div>

    </div>

  </div>    

 
  )
}

export default TelaEscrivaninha
  