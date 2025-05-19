import React from 'react'
import './NavbarRealOficial.css'
import { TiHome } from "react-icons/ti";
import { LuNotebookPen } from "react-icons/lu";
import { FaCog } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineCog } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"





function NavbarRealOficial() {
  
  const navigate = useNavigate()

  return (
    <div className='navbar-container'>

        <button onClick={() => {navigate("/telaprincipal")}} className="botao-navbar"> <AiOutlineHome className='icons-navbar' /> </button>
                    
        <button onClick={() => {navigate("/telaescrivaninha")}}  className="botao-navbar"> <LuNotebookPen className='icons-navbar-jose' /> </button>

        <button onClick={() => {navigate("/telausuarioconfigs")}} className="botao-navbar"><HiOutlineCog className='icons-navbar' /> </button>
      
    </div>
  )
} 

export default NavbarRealOficial
