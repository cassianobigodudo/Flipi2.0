import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./TelaCadastro.css"
import{ GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import axios from 'axios'


export default function TelaCadastro() {
    const [inputNomeCompleto, setInputNomeCompleto] = useState('')
    const [inputNomeUsuario, setInputNomeUsuario] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const navigate = useNavigate()
    const {vetorObjetosUsuarios, setVetorObjetosUsuarios, usuarioLogado, setUsuarioLogado, posicaoUsuarioID,  setPosicaoUsuarioID} = useContext(GlobalContext)

    function verificarUsuarioExistente() {
        // setPosicaoUsuario(0)
        for (let i = 0; i < vetorObjetosUsuarios.length; i++) {
            
            if (inputEmail == vetorObjetosUsuarios[i].usuario_email || inputNomeUsuario == vetorObjetosUsuarios[i].usuario_apelido) {
                return true
            }else{

                // setPosicaoUsuario(i+1)

            }
        }
        
        return false
    }

    function verificarInputsRegistrados() {
        
        if (inputNomeCompleto == null || inputNomeUsuario == null || inputEmail == null || inputSenha == null){

            return true

        }

        return false
        
    }

    useEffect(() => {
        // Função para buscar os dados dos usuários no backend
        const fetchUsuarios = async () => {
            try {
                // Faz a requisição para o backend
                const response = await axios.get('http://localhost:3000/usuario')
                // Armazena os dados recebidos no vetor
                setVetorObjetosUsuarios(response.data)
            } catch (error) {
                console.error('Erro ao buscar usuários:', error)
            }
        };

        fetchUsuarios() // Chama a função ao montar o componente
    }, []) // O array vazio significa que isso só vai rodar uma vez, na montagem inicial do componente

    const verificarCadastro = async (e) => {

        e.preventDefault()
        if (verificarInputsRegistrados()) {

            alert(`Verifique se todos os campos estão preenchidos.`)

        } else if (verificarUsuarioExistente()) {

            alert('Não foi possível criar sua conta, usuário já existente')

        } else {

            let novoUsuario = {
                usuario_id: '',
                usuario_nome: inputNomeCompleto,
                usuario_apelido: inputNomeUsuario,
                usuario_email: inputEmail,
                usuario_senha: inputSenha
            }
            console.log(novoUsuario)

            
            // lol()
            console.log('vou tentar entrar no try')
            try { 
                    // Utilizando o axios para enviar requisição de post do front para o back
                    // console.log('entrei no try')
                    // const response = await axios.post('http://localhost:3000/usuario', novoUsuario)
                    // console.log('tentando receber status 201')
                    // if (response.status === 201) {
                    //     console.log('entrei no status')
                        // setVetorObjetosUsuarios(response.data);
                    //     alert('Usuário cadastrado no banco de dados! :D')
                    // }

                    const response = await axios.post('http://localhost:3000/usuario', novoUsuario);
        
                    if (response.status === 201) {
                        // Atualiza o objeto com o ID retornado pelo backend
                        console.log('respondi com 201')
                        novoUsuario.usuario_id = response.data.usuario_id;
                        console.log('recebi o id do novo usuario ' , novoUsuario.usuario_id)
                        // Adiciona o usuário ao vetor
                        setVetorObjetosUsuarios([...vetorObjetosUsuarios, novoUsuario])
                        console.log('coloquei o usuario dentro do vetor ', vetorObjetosUsuarios) 
        
                        // Define o estado de login como verdadeiro
                        setUsuarioLogado(true);
                        console.log('usuario ta verdadeiro ' ,  usuarioLogado)
        

                        setPosicaoUsuarioID(novoUsuario.usuario_id)
                        navigate("/telaprincipal");
                    }
                    
                } catch (error) {
                    console.error('Erro ao cadastrar usuário! :(', error)
                }

                
                    // Envia os dados para o backend
                    

                // const fetchClienteById = async (id) => {
                //     try {
                //         const response = await axios.get(`http://localhost:3000/clientes/${id}`);
                //         setSelectedCliente(response.data); // Seleciona o cliente para edição
                //         setForm(response.data); // Preenche o formulário com os dados do cliente
                //     } catch (error) {
                //         console.error('Erro ao buscar cliente por ID:', error);
                //     }
                // };

                
            }
        }

     //a cada mudança dentro do vetorObjetosUsuarios, acontecera um console.log
    useEffect(() => {
        console.log(vetorObjetosUsuarios)
    }, [vetorObjetosUsuarios])

    useEffect (() => {

        if(usuarioLogado){
    
          alert('Há um usuário já logado, por favor, deslogue nas configurações de usuário primeiro')
          navigate('/telaprincipal')
        }
    
      }, [])

    function lol(){
        console.log(posicaoUsuarioID)
    }

    return (

        <div className="container-tela-cadastro">

            <div className="livro-cadastro-container-esquerda">
                <div className="livro-cadastro-primeiraLayer-esquerda">
                    <div className="livro-cadastro-conteudoLayerEsquerda">
                        
                        {/* Cassiano: todos os inputs e labels */}
                        <label htmlFor="label-titulo" className="label-titulos">Cadastro</label>
                        <label htmlFor="label-nome" className="label-inputs">Nome</label>
                        <input type="text" 
                            id="label-nome" 
                            className="inputs-cadastro" 
                            placeholder="Digite seu nome completo"
                            onChange={(event) => setInputNomeCompleto(event.target.value)} 
                            value={inputNomeCompleto} />
                        
                        <label htmlFor="label-usuario" className="label-inputs">Usuário</label>
                        <input type="text" 
                            id="label-usuario" 
                            className="inputs-cadastro" 
                            placeholder="Digite seu nome de usuário"
                            onChange={(event) => setInputNomeUsuario(event.target.value)} 
                            value={inputNomeUsuario} />
                        
                        <label htmlFor="label-email" className="label-inputs">Email</label>
                        <input type="email" 
                            id="label-email" 
                            className="inputs-cadastro" 
                            placeholder="Digite seu endereço de email"
                            onChange={(event) => setInputEmail(event.target.value)} 
                            value={inputEmail} />
                        
                        <label htmlFor="label-senha" className="label-inputs">Senha</label>
                        <input type="password" 
                            id="label-senha" 
                            className="inputs-cadastro" 
                            placeholder="Digite uma senha"
                            onChange={(event) => setInputSenha(event.target.value)} 
                            value={inputSenha} />
                        
                    </div>
                </div>
            </div>

            <div className="livro-cadastro-container-direita">

                <div className="livro-cadastro-primeiraLayerDireita">
                    <div className="livro-cadastro-conteudoLayerDireita">
                        
                        <img className="imagem-parte-cadastro" src="public\images\Creative writing-pana (1).png" alt=""/>
                        <button className="botao-cadastro" onClick={verificarCadastro}>Cadastrar</button>

                        {/* Cassiano: uso de router para transicionar para a tela de login */}
                        <Link className="label-possuir-conta" to='/telalogin'>Já possui uma conta?</Link>
                        
                    </div>

                </div>
            </div>
        </div>
    );
}
