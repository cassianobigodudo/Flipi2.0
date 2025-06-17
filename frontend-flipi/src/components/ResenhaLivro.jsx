import React from 'react'
import "./ResenhaLivro.css"

function ResenhaLivro({ resenhaTitulo, resenhaTexto, usuarioId, resenhaCurtidas, usuarioApelido, resenhaNota }) {

  console.log('RESENHA TITULO: ', resenhaTitulo)
  console.log('RESENHA TEXTO: ', resenhaTexto)
  console.log('RESENHA USUARIO ID: ', usuarioId)
  console.log('RESENHA curtidas: ', resenhaCurtidas)

  return (
    <div className='resenhaLivro-container'>
      <div className="resenhaBody">

        <div className="resenhaTop">
          <label className="resenhaUsuario"> {usuarioApelido} /</label>
          <label className="resenhaTitulo"> {resenhaTitulo}</label>
        </div>

        <div className="resenhaMiddle">
          <label className="resenhaTexto">{resenhaTexto}</label>
        </div>

        <div className="resenhaBottom">
          <label className="resenhaNota">NOTA : {resenhaNota}</label>
          <label className="resenhaCurtidas"> 👍 {resenhaCurtidas}</label>
        </div>

      </div>
    </div>
  )
}

export default ResenhaLivro
