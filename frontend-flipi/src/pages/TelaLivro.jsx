import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import LivroParteUm from "../components/LivroParteUm"
import Navbar from "../components/Navbar"
import "./TelaLivro.css"
import axios from "axios"

function TelaLivro() {
  const [livros, setLivros] = useState([])
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const location = useLocation()

  const atualizarCatalogo = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/livro`)
        const dadosDoLivro = response?.data
        setLivros(dadosDoLivro)
        console.log('Livro que foi puxado pelo get: ', dadosDoLivro)
    } catch (error) {
        console.error('Erro ao puxar os livros:', error)
    }
  }

  const getLivroByIndex = (index) => {
    return livros[index] || { livro_titulo: 'Carregando...', livro_capa: '' }
  }

  useEffect(() => {
    atualizarCatalogo()
  }, [])

  useEffect(() => {
    const stateData = location.state
    
    const livroSelecionado = getLivroByIndex(stateData.index)
      
      setLivroSelecionado(livroSelecionado)
    },[location.state, livros])

  return (
    <div className="container-mae">
      <LivroParteUm livro={livroSelecionado} />
    </div>
  )
}

export default TelaLivro