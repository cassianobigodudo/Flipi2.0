import React, { useState } from 'react'
import './LivrosPesquisados.css'
import { MdOutlineContentCopy } from "react-icons/md";

function LivrosPesquisados() {
  
  const [switchClassName, setSwitchClassName] = useState('isbn-botao-container')
  const [switchLabel, setSwitchLabel] = useState('ISBN')
  const [numberISBN, setNumberISBN] = useState('9780689704505')

  function SwitchISBN(){

    if(switchLabel == 'ISBN'){
      setSwitchLabel(`ISBN: ${numberISBN}`)
    }else{
      setSwitchLabel('ISBN')
    }
    if(switchClassName == 'isbn-botao-container'){
      setSwitchClassName('isbn-botao-container-ativado')
    }else{
      setSwitchClassName('isbn-botao-container')
    }
    
  }


  return (
    <div className="livro-unidade-pesquisado">
        <div className="isbn-container">
          {/*//? */}
          <div className={switchClassName} onClick={SwitchISBN}>
            <label className='lbl-isbn' onClick={SwitchISBN}>{switchLabel}</label>

          </div>
            {/*//? copia o ISBN do livro  */}
            {switchClassName == 'isbn-botao-container-ativado'  && < MdOutlineContentCopy className='copy-icon' onClick={() => {navigator.clipboard.writeText(numberISBN)}} />} 
        </div>

        <div className="pesquisado-container">
            <div className="livro-capa-container">

              <img src="images\battle_royale.jpg" className='img-livro-pesquisado' />

            </div>

            <div className="livro-info-container">

                <div className="titulo-autor-data-container">

                </div>

                <div className="sinopse-container">

                </div>
            </div>



        </div>
                
    </div>
  )
}

export default LivrosPesquisados
