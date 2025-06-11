import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TelaCadastro from './TelaCadastro'
import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

// Mock do axios para não fazer requisições reais
vi.mock('axios')

// Mock do navigate para não tentar navegar de verdade
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Componente helper para envolver com os providers necessários
const TelaCadastroWrapper = ({ children, contextValue }) => {
  return (
    <BrowserRouter>
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
    </BrowserRouter>
  )
}

describe('TelaCadastro - Testes Básicos', () => {
  // Valores fake para o contexto
  const mockContextValue = {
    vetorObjetosUsuarios: [],
    setVetorObjetosUsuarios: vi.fn(),
    usuarioLogado: false,
    setUsuarioLogado: vi.fn(),
    posicaoUsuarioID: null,
    setPosicaoUsuarioID: vi.fn(),
  }

  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock para o axios.get retornar uma lista vazia
    axios.get.mockResolvedValue({ data: [] })
  })

  // 🎯 TESTE 1: Verifica se os elementos principais aparecem na tela
  it('deve mostrar o título "Cadastro" na tela', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    // Procura pelo título
    const titulo = screen.getByText('Cadastro')
    expect(titulo).toBeInTheDocument()
  })

  // 🎯 TESTE 2: Verifica se todos os campos de input estão presentes
  it('deve ter todos os campos de cadastro', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    // Verifica se os inputs estão na tela
    expect(screen.getByPlaceholderText('Digite seu nome completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu nome de usuário')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu endereço de email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite uma senha')).toBeInTheDocument()
  })

  // 🎯 TESTE 3: Verifica se o botão de cadastrar está presente
  it('deve ter o botão "Cadastrar"', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    const botaoCadastrar = screen.getByText('Cadastrar')
    expect(botaoCadastrar).toBeInTheDocument()
  })

  // 🎯 TESTE 4: Verifica se o link "Já possui uma conta?" aparece
  it('deve ter o link "Já possui uma conta?"', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    const linkLogin = screen.getByText('Já possui uma conta?')
    expect(linkLogin).toBeInTheDocument()
  })

  // 🎯 TESTE 5: Verifica se consegue digitar nos campos
  it('deve permitir digitar no campo nome', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    const inputNome = screen.getByPlaceholderText('Digite seu nome completo')
    
    // Simula digitação
    fireEvent.change(inputNome, { target: { value: 'João Silva' } })
    
    // Verifica se o valor foi atualizado
    expect(inputNome.value).toBe('João Silva')
  })

  // 🎯 TESTE 6: Verifica se mostra erro quando campos estão vazios
  it('deve mostrar alerta quando tentar cadastrar com campos vazios', async () => {
    // Mock do window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    const botaoCadastrar = screen.getByText('Cadastrar')
    
    // Clica no botão sem preencher nada
    fireEvent.click(botaoCadastrar)
    
    // Verifica se o alert foi chamado
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Verifique se todos os campos estão preenchidos.')
    })

    alertSpy.mockRestore()
  })

  // 🎯 TESTE 7: Verifica se detecta usuário já existente
  it('deve mostrar erro quando usuário já existe', async () => {
    // Mock do window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    // Context com um usuário já existente
    const contextComUsuario = {
      ...mockContextValue,
      vetorObjetosUsuarios: [
        { 
          usuario_email: 'joao@email.com', 
          usuario_apelido: 'joao123' 
        }
      ]
    }

    render(
      <TelaCadastroWrapper contextValue={contextComUsuario}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    // Preenche os campos com dados de usuário existente
    fireEvent.change(screen.getByPlaceholderText('Digite seu nome completo'), { 
      target: { value: 'João Silva' } 
    })
    fireEvent.change(screen.getByPlaceholderText('Digite seu nome de usuário'), { 
      target: { value: 'joao123' } 
    })
    fireEvent.change(screen.getByPlaceholderText('Digite seu endereço de email'), { 
      target: { value: 'joao@email.com' } 
    })
    fireEvent.change(screen.getByPlaceholderText('Digite uma senha'), { 
      target: { value: '123456' } 
    })

    // Clica no botão cadastrar
    fireEvent.click(screen.getByText('Cadastrar'))

    // Verifica se mostra erro de usuário existente
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Não foi possível criar sua conta, usuário já existente')
    })

    alertSpy.mockRestore()
  })

  // 🎯 TESTE 8: Verifica se faz requisição para buscar usuários
  it('deve fazer requisição para buscar usuários ao carregar', async () => {
    render(
      <TelaCadastroWrapper contextValue={mockContextValue}>
        <TelaCadastro />
      </TelaCadastroWrapper>
    )

    // Aguarda a requisição ser feita
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/usuario')
    })
  })
})