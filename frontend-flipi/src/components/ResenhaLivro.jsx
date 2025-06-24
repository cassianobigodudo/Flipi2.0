import React, { useState } from 'react'
import "./ResenhaLivro.css"
import { VscThumbsupFilled } from "react-icons/vsc";
import axios from "axios";

function ResenhaLivro({ 
  resenhaTitulo, 
  resenhaTexto, 
  usuarioId, 
  resenhaCurtidas, 
  usuarioApelido, 
  resenhaNota,
  resenhaId, // Precisa passar o ID da resenha
  onCurtidaAtualizada // Callback para atualizar a lista de resenhas no componente pai
}) {

  const [curtidas, setCurtidas] = useState(resenhaCurtidas);
  const [curtindo, setCurtindo] = useState(false);

  const curtirResenha = async () => {
    try {
      setCurtindo(true);

      const response = await axios.put(`http://localhost:3000/resenha/${resenhaId}`, {
        resenha_curtidas: curtidas + 1
      });

      if (response.status === 200) {
        const novasCurtidas = curtidas + 1;
        setCurtidas(novasCurtidas);
        
        if (onCurtidaAtualizada) {
          onCurtidaAtualizada(resenhaId, novasCurtidas);
        }
      }
    } catch (error) {
      console.error('Erro ao curtir resenha:', error);
    } finally {
      setCurtindo(false);
    }
  };

  console.log('RESENHA TITULO: ', resenhaTitulo)
  console.log('RESENHA TEXTO: ', resenhaTexto)
  console.log('RESENHA USUARIO ID: ', usuarioId)
  console.log('RESENHA curtidas: ', resenhaCurtidas)

  return (
    <div className='resenhaLivro-container'>
      <div className="resenhaBody">

        <div className="resenhaTop">
          <img className='imgUser' src="./public/images/perfil.png" alt="" />
          <label className="resenhaUsuario"> {usuarioApelido} /</label>
          <label className="resenhaTitulo"> {resenhaTitulo}</label>
        </div>

        <div className="resenhaMiddle">
          <label className="resenhaTexto">{resenhaTexto}</label>
        </div>

        <div className="resenhaBottom">
          <label className="resenhaNota">NOTA : {resenhaNota}</label>
          <button 
            className={"btnRes"}
            onClick={curtirResenha}
          > 
            <VscThumbsupFilled /> 
          </button>
          <label className="resenhaCurtidas">{curtidas}</label>
        </div>

      </div>
    </div>
  )
}

export default ResenhaLivro