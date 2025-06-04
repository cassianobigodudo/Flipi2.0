import React, { useState } from 'react'
import { useEffect } from 'react'
import "./EstrelasBtn.css"

function EstrelasBtn({ onRatingChange }) {



  const [notaUm, setNotaUm] = useState(<img className='btn-desfecho-img' src="public\images\streamline--star-2.svg" alt="" />)
  const [notaDois, setNotaDois] = useState(<img className='btn-desfecho-img' src="public\images\streamline--star-2.svg" alt="" />)
  const [notaTres, setNotaTres] = useState(<img className='btn-desfecho-img' src="public\images\streamline--star-2.svg" alt="" />)
  const [notaQuatro, setNotaQuatro] = useState(<img className='btn-desfecho-img' src="public\images\streamline--star-2.svg" alt="" />)
  const [notaCinco, setNotaCinco] = useState(<img className='btn-desfecho-img' src="public\images\streamline--star-2.svg" alt="" />)
  


  function livroNotaUm(){

    setNotaUm(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaDois(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaTres(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaQuatro(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaCinco(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)

    onRatingChange(1)    
  }
  function livroNotaDois(){

    setNotaUm(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaDois(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaTres(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaQuatro(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaCinco(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)

    onRatingChange(2)   
    
  }
  function livroNotaTres(){

    setNotaUm(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaDois(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaTres(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaQuatro(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)
    setNotaCinco(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)

    
    onRatingChange(3)   
    
  }
  function livroNotaQuatro(){

    setNotaUm(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaDois(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaTres(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaQuatro(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaCinco(<img className='btn-desfecho-img' src= "public\images\streamline--star-2.svg" />)

    
    onRatingChange(4)   
    
  }
  function livroNotaCinco(){

    
    setNotaUm(<img className="btn-desfecho-img" src= "public\images\streamline--star-2-solid.svg" />)
    setNotaDois(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaTres(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaQuatro(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)
    setNotaCinco(<img className='btn-desfecho-img' src= "public\images\streamline--star-2-solid.svg" />)

    
    onRatingChange(5)   
    
  }





  return (
    <div className='btnEstrelas'>
        
        <button onClick={livroNotaUm} className='generoIsbn-desfecho-btn'
         >{notaUm}</button>
        <button onClick={livroNotaDois} className='generoIsbn-desfecho-btn'
        >{notaDois}</button>
        <button onClick={livroNotaTres} className='generoIsbn-desfecho-btn'
        >{notaTres}</button>
        <button onClick={livroNotaQuatro} className='generoIsbn-desfecho-btn'
        >{notaQuatro}</button>
        <button onClick={livroNotaCinco} className='generoIsbn-desfecho-btn'
        >{notaCinco}</button>
      
   
    </div>
  )
}

export default EstrelasBtn

