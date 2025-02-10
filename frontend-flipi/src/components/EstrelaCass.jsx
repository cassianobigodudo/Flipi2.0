import React, { useState } from 'react'
import './EstrelaCass.css'


function EstrelaCass() {

    const [notaUm, setNotaUm] = useState(<img className='img-estrela' src="public\images\streamline--star-2.svg" alt="" />)
    const [notaDois, setNotaDois] = useState(<img className='img-estrela' src="public\images\streamline--star-2.svg" alt="" />)
    const [notaTres, setNotaTres] = useState(<img className='img-estrela' src="public\images\streamline--star-2.svg" alt="" />)
    const [notaQuatro, setNotaQuatro] = useState(<img className='img-estrela' src="public\images\streamline--star-2.svg" alt="" />)
    const [notaCinco, setNotaCinco] = useState(<img className='img-estrela' src="public\images\streamline--star-2.svg" alt="" />)

    function livroNotaUm(){

      setNotaUm(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaDois(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaTres(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaQuatro(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaCinco(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)

    }
    function livroNotaDois(){

      setNotaUm(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaDois(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaTres(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaQuatro(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaCinco(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)

    }
    function livroNotaTres(){

      setNotaUm(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaDois(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaTres(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaQuatro(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)
      setNotaCinco(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)

    }
    function livroNotaQuatro(){

      setNotaUm(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaDois(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaTres(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaQuatro(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaCinco(<img className='img-estrela' src= "public\images\streamline--star-2.svg" />)

    }
    function livroNotaCinco(){

      setNotaUm(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaDois(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaTres(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaQuatro(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)
      setNotaCinco(<img className='img-estrela' src= "public\images\streamline--star-2-solid.svg" />)

    }



  return (
    <div className='estrelas-container'>
        
        <button onClick={livroNotaUm} className='btn-nota'>{notaUm}</button>
        <button onClick={livroNotaDois} className='btn-nota'>{notaDois}</button>
        <button onClick={livroNotaTres} className='btn-nota'>{notaTres}</button>
        <button onClick={livroNotaQuatro} className='btn-nota'>{notaQuatro}</button>
        <button onClick={livroNotaCinco} className='btn-nota'>{notaCinco}</button>
      
    </div>
  )
}

export default EstrelaCass
