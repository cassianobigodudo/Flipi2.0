import React, { useState } from 'react'

function ResenhaLivro({resenhaTitulo, resenhaTexto, usuarioId, resenhaCurtidas}) {
  

  console.log('RESENHA TITULO: ', resenhaTitulo)

  console.log('RESENHA TEXTO: ', resenhaTexto)

  console.log('RESENHA USUARIO ID: ', usuarioId)

  console.log('RESENHA curtidas: ', resenhaCurtidas)

  return (
    <div>

      <h2>{resenhaTitulo}</h2>
      <h3>{usuarioId}</h3>
      <h3>{resenhaTexto}</h3>
      <h3>{resenhaCurtidas}</h3>

    </div>
  )
}

export default ResenhaLivro