import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import TelaEscrivaninha from './TelaEscrivaninha'
import { GlobalContext } from '../contexts/GlobalContext'

// Mock do axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

// Mock do react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/escrivaninha' })
  }
})

// Mock dos componentes
vi.mock('../components/EstrelasBtn', () => ({
  default: ({ onRatingChange }) => (
    <div data-testid="estrelas-btn" onClick={() => onRatingChange(5)}>
      EstrelasBtn Mock
    </div>
  )
}))

vi.mock('../components/NavbarVertical', () => ({
  default: () => <div data-testid="navbar-vertical">NavbarVertical Mock</div>
}))

// Mock do CSS
vi.mock('./TelaEscrivaninha.css', () => ({}))

// Mock do alert
vi.stubGlobal('alert', vi.fn())

describe('TelaEscrivaninha - Testes de Backend/Integração', () => {
  const mockContextValue = {
    usuarioLogado: true,
    biblioteca: [],
    livroAcessado: null,
    setLivroAcessado: vi.fn(),
    vetorObjetosUsuarios: [
      {
        usuario_id: 1,
        usuario_apelido: 'TestUser'
      }
    ],
    posicaoUsuarioID: 1
  }

  const renderWithContext = (contextValue = mockContextValue) => {
    return render(
      <BrowserRouter>
        <GlobalContext.Provider value={contextValue}>
          <TelaEscrivaninha />
        </GlobalContext.Provider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockedAxios.get.mockClear()
    mockedAxios.post.mockClear()
    // Mock do console.error antes de cada teste
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Autenticação de Usuário', () => {
    it('deve redirecionar para home quando usuário não está logado', async () => {
      const contextWithoutUser = {
        ...mockContextValue,
        usuarioLogado: false
      }

      renderWithContext(contextWithoutUser)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/')
      })
      expect(window.alert).toHaveBeenCalledWith(
        'Não há usuário logado, por favor, cadastre-se ou entre na sua conta.'
      )
    })

    it('deve permitir acesso quando usuário está logado', () => {
      renderWithContext()
      
      expect(mockNavigate).not.toHaveBeenCalled()
      expect(screen.getByTestId('navbar-vertical')).toBeInTheDocument()
    })
  })

  describe('Busca de Livro por ISBN', () => {
    it('deve buscar livro com sucesso quando ISBN existe no backend', async () => {
      const mockLivroData = {
        livro_capa: 'http://example.com/capa.jpg',
        livro_ano: '2023',
        livro_titulo: 'Livro Teste',
        livro_sinopse: 'Sinopse do livro teste',
        editora: { editora_nome: 'Editora Teste' },
        autores: [{ autor_nome: 'Autor Teste' }]
      }

      mockedAxios.get.mockResolvedValueOnce({
        data: mockLivroData
      })

      renderWithContext()
      
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/livro/9781234567890')
      })

      await waitFor(() => {
        expect(mockContextValue.setLivroAcessado).toHaveBeenCalledWith(mockLivroData)
      })
    })

    it('deve buscar na OpenLibrary quando livro não existe no backend', async () => {
      const mockLivroData = {
        livro_capa: 'http://example.com/capa.jpg',
        livro_ano: '2023',
        livro_titulo: 'Livro da OpenLibrary',
        livro_sinopse: 'Sinopse do livro da OpenLibrary',
        editora: { editora_nome: 'Editora OpenLibrary' },
        autores: [{ autor_nome: 'Autor OpenLibrary' }]
      }

      // Primeira chamada falha (404)
      mockedAxios.get
        .mockRejectedValueOnce({
          response: { status: 404 }
        })
        .mockResolvedValueOnce({
          data: mockLivroData
        })

      // POST para adicionar livro da OpenLibrary
      mockedAxios.post.mockResolvedValueOnce({
        data: mockLivroData
      })

      renderWithContext()
      
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/livro/isbn/9781234567890')
      })

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(2)
      })
    })

    it('deve exibir mensagem de erro quando ISBN está vazio', async () => {
      renderWithContext()
      
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      
      fireEvent.blur(isbnInput)

      expect(mockedAxios.get).not.toHaveBeenCalled()
    })

    it('deve tratar erro quando busca na OpenLibrary falha', async () => {
      // Mock do console.error já está feito no beforeEach
      
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 404 }
      })

      mockedAxios.post.mockRejectedValueOnce({
        response: { status: 500 }
      })

      renderWithContext()
      
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/livro/isbn/9781234567890')
      })

      await waitFor(() => {
        expect(console.error).toHaveBeenCalled()
      })
    })
  })

  describe('Cadastro de Resenha', () => {
    beforeEach(() => {
      // Setup para ter um livro carregado
      const mockLivroData = {
        livro_capa: 'http://example.com/capa.jpg',
        livro_ano: '2023',
        livro_titulo: 'Livro Teste',
        livro_sinopse: 'Sinopse do livro teste',
        editora: { editora_nome: 'Editora Teste' },
        autores: [{ autor_nome: 'Autor Teste' }]
      }

      mockedAxios.get.mockResolvedValue({
        data: mockLivroData
      })
    })

    it('deve enviar resenha com sucesso quando todos os campos estão preenchidos', async () => {
      const mockResenhaResponse = {
        resenha_id: 1,
        resenha_titulo: 'Resenha Teste',
        resenha_texto: 'Texto da resenha teste',
        resenha_nota: 5
      }

      mockedAxios.post.mockResolvedValueOnce({
        status: 201,
        data: mockResenhaResponse
      })

      renderWithContext()

      // Primeiro carregar um livro
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })

      // Preencher formulário de resenha
      const tituloInput = screen.getByPlaceholderText('TITULO...')
      const resenhaTextarea = screen.getByPlaceholderText('Começe sua resenha aqui...')
      const estrelasBtn = screen.getByTestId('estrelas-btn')
      const enviarBtn = screen.getByText('ENVIAR RESENHA')

      fireEvent.change(tituloInput, { target: { value: 'Resenha Teste' } })
      fireEvent.change(resenhaTextarea, { target: { value: 'Texto da resenha teste' } })
      fireEvent.click(estrelasBtn)
      
      fireEvent.click(enviarBtn)

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/resenha', {
          nomeUsuario: 'TestUser',
          resenha_id: null,
          resenha_titulo: 'Resenha Teste',
          resenha_texto: 'Texto da resenha teste',
          resenha_nota: 5,
          resenha_curtidas: 0,
          resenha_data: expect.any(String),
          livro_isbn: '9781234567890',
          usuario_id: 1
        })
      })
    })

    it('deve mostrar alerta quando campos obrigatórios não estão preenchidos', async () => {
      renderWithContext()

      const enviarBtn = screen.getByText('ENVIAR RESENHA')
      fireEvent.click(enviarBtn)

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos da resenha :)')
      })

      expect(mockedAxios.post).not.toHaveBeenCalled()
    })

    it('deve mostrar alerta quando livro não foi carregado', async () => {
      renderWithContext()

      // Preencher apenas os campos da resenha
      const tituloInput = screen.getByPlaceholderText('TITULO...')
      const resenhaTextarea = screen.getByPlaceholderText('Começe sua resenha aqui...')
      const estrelasBtn = screen.getByTestId('estrelas-btn')
      const enviarBtn = screen.getByText('ENVIAR RESENHA')

      fireEvent.change(tituloInput, { target: { value: 'Resenha Teste' } })
      fireEvent.change(resenhaTextarea, { target: { value: 'Texto da resenha teste' } })
      fireEvent.click(estrelasBtn)
      
      fireEvent.click(enviarBtn)

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Por favor, busque um livro válido pelo ISBN antes de enviar a resenha')
      })

      expect(mockedAxios.post).not.toHaveBeenCalled()
    })

    it('deve tratar erro no cadastro de resenha', async () => {
      // O primeiro mock é para a busca do livro (GET)
      // O segundo mock é para o cadastro da resenha (POST) que vai falhar
      mockedAxios.post.mockRejectedValueOnce({
        response: { status: 500 }
      })

      renderWithContext()

      // Carregar livro primeiro
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })

      // Preencher e enviar resenha
      const tituloInput = screen.getByPlaceholderText('TITULO...')
      const resenhaTextarea = screen.getByPlaceholderText('Começe sua resenha aqui...')
      const estrelasBtn = screen.getByTestId('estrelas-btn')
      const enviarBtn = screen.getByText('ENVIAR RESENHA')

      fireEvent.change(tituloInput, { target: { value: 'Resenha Teste' } })
      fireEvent.change(resenhaTextarea, { target: { value: 'Texto da resenha teste' } })
      fireEvent.click(estrelasBtn)
      
      fireEvent.click(enviarBtn)

      await waitFor(() => {
        expect(console.error).toHaveBeenCalled()
      })
    })
  })

  describe('Validações de Entrada', () => {
    it('deve respeitar limite máximo de caracteres no título', () => {
      renderWithContext()
      
      const tituloInput = screen.getByPlaceholderText('TITULO...')
      expect(tituloInput).toHaveAttribute('maxLength', '40')
    })

    it('deve respeitar limite máximo de caracteres na resenha', () => {
      renderWithContext()
      
      const resenhaTextarea = screen.getByPlaceholderText('Começe sua resenha aqui...')
      expect(resenhaTextarea).toHaveAttribute('maxLength', '1600')
    })

    it('deve validar comprimento mínimo e máximo do ISBN', () => {
      renderWithContext()
      
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      expect(isbnInput).toHaveAttribute('minLength', '10')
      expect(isbnInput).toHaveAttribute('maxLength', '13')
      expect(isbnInput).toHaveAttribute('type', 'number')
    })
  })

  describe('Estrutura de Dados da Resenha', () => {
    it('deve criar objeto de resenha com estrutura correta', async () => {
      const mockLivroData = {
        livro_capa: 'http://example.com/capa.jpg',
        livro_ano: '2023',
        livro_titulo: 'Livro Teste',
        livro_sinopse: 'Sinopse do livro teste',
        editora: { editora_nome: 'Editora Teste' },
        autores: [{ autor_nome: 'Autor Teste' }]
      }

      mockedAxios.get.mockResolvedValueOnce({ data: mockLivroData })
      mockedAxios.post.mockResolvedValueOnce({ status: 201, data: {} })

      renderWithContext()

      // Carregar livro
      const isbnInput = screen.getByPlaceholderText('Código ISBN aqui...')
      fireEvent.change(isbnInput, { target: { value: '9781234567890' } })
      fireEvent.blur(isbnInput)

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })

      // Preencher e enviar resenha
      const tituloInput = screen.getByPlaceholderText('TITULO...')
      const resenhaTextarea = screen.getByPlaceholderText('Começe sua resenha aqui...')
      const estrelasBtn = screen.getByTestId('estrelas-btn')
      const enviarBtn = screen.getByText('ENVIAR RESENHA')

      fireEvent.change(tituloInput, { target: { value: 'Título Teste' } })
      fireEvent.change(resenhaTextarea, { target: { value: 'Texto da resenha' } })
      fireEvent.click(estrelasBtn)
      fireEvent.click(enviarBtn)

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/resenha', 
          expect.objectContaining({
            nomeUsuario: 'TestUser',
            resenha_id: null,
            resenha_titulo: 'Título Teste',
            resenha_texto: 'Texto da resenha',
            resenha_nota: 5,
            resenha_curtidas: 0,
            resenha_data: expect.any(String),
            livro_isbn: '9781234567890',
            usuario_id: 1
          })
        )
      })
    })
  })
})