import React, { useEffect, useState } from 'react'
import "./TelaLogin.css"
import { Link, useNavigate } from "react-router-dom"
import{ GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import axios from 'axios'
useState

function TelaLogin() {
    let variavel
    
    const [inputNomeUsuario, setInputNomeUsuario] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const navigate = useNavigate()
    const {vetorObjetosUsuarios, usuarioLogado, setUsuarioLogado, posicaoUsuarioID, setPosicaoUsuarioID, setVetorObjetosUsuarios} = useContext(GlobalContext)


    useEffect (() => {

        if(usuarioLogado){
    
          alert('Há um usuário já logado, por favor, deslogue nas configurações de usuário primeiro')
          navigate('/telaprincipal')
        }

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
    
      }, [])

      useEffect(() => {
        console.log(vetorObjetosUsuarios)
    }, [vetorObjetosUsuarios])
      
    const verificarLogin = async (apelido, senha) => {
        try{
            const resposta = await axios.post('http://localhost:3000/login', {
                usuario_apelido: apelido,
                usuario_senha: senha
            });

            const dados = resposta.data;
            console.log('Login Feito:', dados);

            setPosicaoUsuarioID(dados.usuario_id);
            console.log('id do usuario:', posicaoUsuarioID)
            setUsuarioLogado(true);
            alert('Login feito com sucesso!');
            navigate('/telaprincipal');
        }catch (erro){
            if (erro.response && erro.response.status === 401){
                alert('Dados de autenticação inválidas!');
            }else{
                alert('Erro ao fazer login.');
            }
        }
    };
    
  return (<div className="container-tela-login">
    <div className="livro-login-container-esquerda">
        <div className="livro-login-primeiraLayer-esquerda">
            <div className="livro-login-conteudoLayerEsquerda">
                <label htmlFor="label-titulo" className="label-titulos">LOGIN</label>
                <label htmlFor="label-usuario" className="label-inputs">Usuário</label>
                <input 
                    type="text" 
                    id="label-usuario" 
                    className="inputs-login" 
                    placeholder="Digite seu nome de usuário"
                    onChange={(event) => setInputNomeUsuario(event.target.value)} 
                    value={inputNomeUsuario} />
                <label htmlFor="label-senha" className="label-inputs">Senha</label>
                <input 
                    type="password" 
                    id="label-senha" 
                    className="inputs-login" 
                    placeholder="Digite uma senha"
                    onChange={(event) => setInputSenha(event.target.value)} 
                    value={inputSenha} />
            </div>
        </div>
    </div>

    <div className="livro-login-container-direita">
        <div className="livro-login-primeiraLayerDireita">
            <div className="livro-login-conteudoLayerDireita">
                <img className="imagem-parte-login" src="public\images\Hand holding pen-amico.png" alt="" />
                <button className="botao-login" onClick={() => verificarLogin(inputNomeUsuario, inputSenha)}>Entrar</button>
                <Link className="label-nao-tem-conta" to="/telacadastro">Não tem uma conta?</Link>
            </div>
        </div>
    </div>
</div>

  )
}

export default TelaLogin
