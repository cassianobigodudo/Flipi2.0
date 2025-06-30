import React, { useContext, useEffect, useState } from 'react'
import "./TelaEscrivaninha.css"
import EstrelasBtn from '../components/EstrelasBtn'
import NavbarVertical from '../components/NavbarVertical'
import { GlobalContext } from '../contexts/GlobalContext'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function TelaEscrivaninha() {
  // Estados
  const [abrirCaixa, setAbrirCaixa] = useState(false)
  const [resenhaTitulo, setResenhaTitulo] = useState('')
  const [resenha, setResenha] = useState('')
  const [notaResenha, setNotaResenha] = useState(0)
  const [isbn, setIsbn] = useState('')
  const [time, setTime] = useState(0)
  const [listaResenhas, setListaResenhas] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [livroCarregado, setLivroCarregado] = useState(false)
  const [capa, setCapa] = useState('')
  const [autor, setAutor] = useState('')
  const [editora, setEditora] = useState('')
  const [tituloLivro, setTituloLivro] = useState('')
  const [ano, setAno] = useState('')
  const [sinopse, setSinopse] = useState('')

  // Contextos e hooks
  const location = useLocation()
  const navigate = useNavigate()

  const { usuarioLogado } = useContext(GlobalContext)
  const { biblioteca, livroAcessado, setLivroAcessado, vetorObjetosUsuarios, posicaoUsuarioID} = useContext(GlobalContext)


  // Efeitos
  useEffect(() => {
    const verificarUsuario = async () => {
      if (!usuarioLogado) {
        await new Promise(resolve => {
          alert('Não há usuário logado, por favor, cadastre-se ou entre na sua conta.')
          resolve()
        })
        navigate('/')
      }
    }
    verificarUsuario()
  }, [usuarioLogado, navigate])

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTime(prevTime => prevTime <= 9 ? prevTime + 1 : 0)
    }, 500)
    return () => clearInterval(intervalo)
  }, [time])

  useEffect(() => {
    if (livroAcessado && !livroCarregado) {
      setLivroCarregado(true);
      setCapa(livroAcessado.livro_capa);
      setAno(livroAcessado.livro_ano);
      setEditora(livroAcessado.editora?.editora_nome || '');
      setAutor(livroAcessado.autores?.[0]?.autor_nome || '');
      setTituloLivro(livroAcessado.livro_titulo);
      setSinopse(livroAcessado.livro_sinopse);
      setIsbn(livroAcessado.livro_isbn); // importante para salvar resenha depois
    }
  }, [livroAcessado, livroCarregado]);

  // Funções
  const dialogFunc = () => {
    setAbrirCaixa(!abrirCaixa)
  }

  const verificarCampoResenha = () => {
    return resenha.trim() === '' || resenhaTitulo.trim() === '' || notaResenha === 0
  }

  const buscarLivroPorISBN = async () => {
    if (!isbn.trim()) {
      setMensagem('Por favor, digite um ISBN válido')
      return
    }

    try {
      setMensagem('Buscando livro...')

      const response = await axios.get(`http://localhost:3000/livro/${isbn}`)
      await setLivroAcessado(response.data)
      setLivroCarregado(true)
      setMensagem('Livro encontrado com sucesso!')
      setCapa(response.data.livro_capa)
      setAno(response.data.livro_ano)
      setEditora(response.data.editora.editora_nome)
      setAutor(response.data.autores[0].autor_nome)
      setTituloLivro(response.data.livro_titulo)
      setSinopse(response.data.livro_sinopse)
      console.log(response.data)
      
      setMensagem('')
    } catch (error) {
      if (error.response?.status === 404) {

        try {
          setMensagem('Livro não encontrado. Buscando na OpenLibrary...')
          
          const addResponse = await axios.post(`http://localhost:3000/livro/isbn/${isbn}`)
          await setLivroAcessado(addResponse.data)
          setLivroCarregado(true)
          setMensagem('Livro adicionado com sucesso!')

          const response = await axios.get(`http://localhost:3000/livro/${isbn}`)
          await setLivroAcessado(response.data)
          setLivroCarregado(true)
          setMensagem('Livro encontrado com sucesso!')
          setCapa(response.data.livro_capa)
          setAno(response.data.livro_ano)
          setEditora(response.data.editora.editora_nome)
          setAutor(response.data.autores[0].autor_nome)
          setTituloLivro(response.data.livro_titulo)
          setSinopse(response.data.livro_sinopse)
          console.log(response.data)
          setMensagem('')
        } catch (addError) {
          setMensagem('Erro ao buscar livro na OpenLibrary')
          console.error('Erro:', addError)
          setMensagem('')
        }
      } else {
        setMensagem('Erro ao buscar livro')
        console.error('Erro:', error)
        setMensagem('')
      }
    } finally {

    }
  }

  const cadastrarResenha = async (e) => {
    e.preventDefault()
    
    if (verificarCampoResenha()) {
      await new Promise(resolve => {
        alert('Por favor, preencha todos os campos da resenha :)')
        resolve()
      })
      return
    }

    if (!livroCarregado) {
      await new Promise(resolve => {
        alert('Por favor, busque um livro válido pelo ISBN antes de enviar a resenha')
        resolve()
      })
      return
    }

    try {
      setMensagem('Enviando resenha...')
      
      const currentDate = new Date().toISOString()
      const usuarioAtualizado = vetorObjetosUsuarios.find(e => e.usuario_id === posicaoUsuarioID)

      if (!usuarioAtualizado) {
        throw new Error('Usuário não encontrado!')
      }

      const novaResenha = {
        nomeUsuario: usuarioAtualizado.usuario_apelido,
        resenha_id: null,
        resenha_titulo: resenhaTitulo,
        resenha_texto: resenha,
        resenha_nota: notaResenha,
        resenha_curtidas: 0,
        resenha_data: currentDate,
        livro_isbn: isbn,
        usuario_id: posicaoUsuarioID
      }

      const response = await axios.post('http://localhost:3000/resenha', novaResenha)
      alert('Resenha cadastrada com sucesso!')
      
      
     /*  if (response.status === 201) {
        await Promise.all([
          setListaResenhas(prev => [...prev, response.data]),
          setLivroAcessado(prev => ({
            ...prev,
            resenhasLivro: [...prev.resenhasLivro, response.data]
          }))
        ])

        setResenhaTitulo('')
        setResenha('')
        setNotaResenha(0)
        setMensagem('Resenha cadastrada com sucesso!')
        
        setMensagem('')
      } */

    } catch (error) {
      console.error('Erro ao cadastrar resenha:', error)
      setMensagem('Erro ao cadastrar resenha. Tente novamente"')
      setMensagem('')
    } finally {
    }
  }

  return (
    <div className="tela-escrivaninha-container">

    <div className="escrivaninha-mesa">


      <div className="escrivaninha-navbarVertical">
        <NavbarVertical />
      </div>

      <div className="escrivaninha-resenha-container">

        <div className="resenha-container-textBlock">
      
         <input maxLength={40} className='inpt-tituloResenha' placeholder='TITULO...' type="text"
          onChange={(event) => setResenhaTitulo(event.target.value)} 
          value={resenhaTitulo} />
         <textarea placeholder='Começe sua resenha aqui...' maxLength={1600} cols="10" rows="10"  className='inpt-resenha' name="resenha" id="" 
          value={resenha}
          onChange={(event) => setResenha(event.target.value)}
         ></textarea>

        </div>

      </div>

      <div className="escrivaninha-info-container">
        <div className="info-container-isbn">

          <button className='Infor-container-isbnlbl' >ISBN</button>

          <button onClick={dialogFunc}  className='infor-container-isbnQuestion' >?</button>

          <input className='infor-container-isbnInpt' minLength={10} maxLength={13} type="number" placeholder='Código ISBN aqui...' 
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
	        onBlur={buscarLivroPorISBN}
          />
        </div>

        <div className="info-container-livroContainer">

          <div className="livroContainer-capa">
          <img className='capa-img' src={capa} alt="" />
          </div>

          <div className="livroContainer-desc">

            <div className="desc-livroTitulo"> 
              <label className='livroTituloLbl' htmlFor="">{tituloLivro}</label>
            </div>
            
            <div className="desc-livroDesc">

              <textarea readOnly className='livroDesc-textArea' value={sinopse} name="" id="">
              </textarea>
      
            </div>

          </div>


        </div>
        <div className="livroContainer-tags">
          <button className='tags-btnAutor' >Autor:  {autor}</button>
          <button className='tags-btnEditora'>Editora:  {editora}</button>
          <button className='tags-btnData'>Ano:  {ano}</button>
        </div>
        <div className="livroContainer-nota">

          <div className="nota-labelEspaco">

          <button className='livroContainer-labelNota' htmlFor="">Avalie esse livro:</button>

          </div>
          
          <div className="estrelas-div">

          <div className="estrelas-buttons">
            
          <EstrelasBtn onRatingChange={setNotaResenha}/>
          

          </div>

        </div>
        </div>
        <div className="livroContainer-enviar">
          <button className='livroContainer-btnEnviar'  onClick={cadastrarResenha} >ENVIAR RESENHA</button>
        </div>

      </div>

    </div>

      <dialog open={abrirCaixa}> 

        <div className="dialog-divAtivo">
          <h1 className='dialogLbl' >O ISBN é um código de identificação de um livro, acesse vários desses códigos em- 
          <a href="https://openlibrary.org/" target='_blank' >Open Library</a>,
             Google Books ou sites de editoras para obter informações sobre um livro específico. 
</h1>

        </div>

      </dialog>


  </div>    

 
  )
}

export default TelaEscrivaninha

