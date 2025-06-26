import React from 'react'
import './LivroAleatorio.css'

function LivroAleatorio() {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <div className='livro-aleatorio-container'>
      <img
        className='livro-aleatorio'
        src="public/images/ecodosilencio.png"
        alt=""
        onClick={() => setShowPopup(true)}
      />

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="popup-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >×</button>
            <h2 className='h2-titulo'>Ecos do Silêncio</h2>
            <div className="sinopse-area">
              <p>
                 "Ecos do Silêncio" é um livro ou filme que explora a temática do luto, da solidão e do confronto com o passado, especialmente através da relação entre uma mãe e seu filho. A narrativa foca no retorno de um filho ausente, desencadeando emoções intensas e a necessidade de lidar com memórias dolorosas e silêncios profundos. A obra convida à introspecção, à busca por perdão e à redescoberta de si mesmo através da superação de traumas e da conexão com o presente.
              </p>
            </div>
            <h3>Avaliação</h3>
            <div className="avaliacao-area">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LivroAleatorio
