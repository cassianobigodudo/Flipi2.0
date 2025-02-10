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
      


    function verificarInputsRegistrados() {
        
        if (inputNomeUsuario == null || inputSenha == null){

            return true

        }

        return false
    }

    
    function verificarCadastroInexistente(){
        
        // console.log('Antes de iniciar o for')
        for (let i = 0; i < vetorObjetosUsuarios.length; i++){
            
            // console.log('índice número '+ i)
            if(vetorObjetosUsuarios[i].usuario_apelido == inputNomeUsuario){
                
                //!resolver a posicao do usuario no login
                variavel = i
                // console.log('oi eu passei aqui')
                return false
            }
            
        }
        return true
        
    }
    

    function verificarLoginIncorreto(){

        if (inputSenha == vetorObjetosUsuarios[variavel].usuario_senha){

            return false
        }else{
            return true
        }

    }


    const verificarLogin = async (e) => {
        e.preventDefault()
        switch (true){

            case verificarInputsRegistrados():
                alert('Verifique se todos os campos estão preenchidos.')
                break;
            case verificarCadastroInexistente():
                alert('Nome de usuário inexistente.')
                break;
            case verificarLoginIncorreto():
                alert('Login Incorreto.')
                break;
            default:
                setPosicaoUsuarioID(vetorObjetosUsuarios[variavel].usuario_id)
                alert('Login feito com sucesso!')
                setUsuarioLogado(true)
                navigate("/telaprincipal")

        }

        // if (verificarInputsRegistrados()) {
            
        //     alert('Verifique se todos os campos estão preenchidos.')

        // }else if(verificarCadastroInexistente()){

        //     alert('Nome de usuário inexistente.')

        // }else{
        //     alert("boa")
        // }

    }
    


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
                <button className="botao-login" onClick={verificarLogin}>Entrar</button>
                <Link className="label-nao-tem-conta" to="/telacadastro">Não tem uma conta?</Link>
            </div>
        </div>
    </div>
</div>

  )
}

export default TelaLogin
