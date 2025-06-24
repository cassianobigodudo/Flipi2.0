import React from 'react'
import './NavbarVertical.css'
import { Link, useNavigate } from "react-router-dom"

function NavbarVertical() {


    const navigate = useNavigate()

  return (
    <div className='div-navbarVertical'>

      <button onClick={() => {navigate("/telaprincipal")}} className="botao-menuUm"><img src="../public/icons/ant-design--home-outlined.svg" alt="" className="icone-botao"/></button>
                    
      <button onClick={() => {navigate("/telaescrivaninha")}}  className="botao-menuDois"><img src="public/icons/escrita.png" alt="" className="icone-botao"/></button>

      <button onClick={() => {navigate("/telausuarioconfigs")}} className="botao-menuTres"><img src="./public/images/setting.svg" alt="" className="icone-botao"/></button>
                   
    </div>
  )
}

export default NavbarVertical
