import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./TelaUsuarioConfigs.css"
import{ GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import IconUserCircle from "../components/IconUserCircle"
import ResenhasConfigs from "../components/ResenhasConfigs"
import NavbarVertical from "../components/NavbarVertical"
import axios from "axios"


function TelaUsuarioConfigs() {

  const {posicaoUsuario, setPosicaoUsuario, posicaoUsuarioID, setPosicaoUsuarioID, vetorObjetosUsuarios, setVetorObjetosUsuarios, usuarioLogado, setUsuarioLogado, dadosUsuarioLogado, setDadosUsuarioLogado}=useContext(GlobalContext)
  const [editarNome, setEditarNome]=useState('')
  const [editarEmail, setEditarEmail]=useState('')
  const [editarSenha, setEditarSenha]=useState('')
  const navigate = useNavigate()

  useEffect (() => {

    if(usuarioLogado == false){

      alert('Não há usuário logado, por favor, cadastre-se ou entre na sua conta.')
      navigate('/')

    }else{

      // for (let i = 0; i < vetorObjetosUsuarios.length; i++){

      //   if(posicaoUsuarioID == vetorObjetosUsuarios[i].usuario_id){

      //     setPosicaoUsuario(i)
      //   }
        
      // }

      // let user = vetorObjetosUsuarios.filter((u) => u.usuario_id == posicaoUsuarioID)
      // console.log(user);

    }

  }, [])

  function verificarInputsRegistrados(){
    
    if (editarNome == `` && editarEmail == `` && editarSenha == ``){
      
      return true
      
    }else{
      // alert(`oi`)
      return false
    }
  }

  function verificarInputsIguais(){

    if (editarNome == dadosUsuarioLogado.usuario_nome || editarEmail == dadosUsuarioLogado.usuario_email || editarSenha == dadosUsuarioLogado.usuario_senha){
      return true
    }else{
      return false
    }
  }

  function verificarEmailExistente(){

    for(let i = 0; i < vetorObjetosUsuarios.length; i++){

      if (editarEmail == vetorObjetosUsuarios[i].usuario_email && posicaoUsuarioID != vetorObjetosUsuarios[i].usuario_id ){
        return true
      }

    }

    return false

  }

  const fetchClientes = async () => {
    try {
        const response = await axios.get('http://localhost:3000/usuario');
        setVetorObjetosUsuarios(response.data);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

  const editarDados = async (e) => {
    e.preventDefault();
    switch (true) {
      case verificarInputsRegistrados():
        alert(`Verifique se ao menos um campo esteja preenchido`)
        break

      case verificarInputsIguais():
        alert('Algum dado é idêntico ao que já existe')
        break
      
      case verificarEmailExistente():
        alert('Não foi possivel alterar os dados: email já existente')
        break

      default: 
        console.log('entrei no default')
        let dadosUsuarioEditado = {...dadosUsuarioLogado, usuario_nome: editarNome || dadosUsuarioLogado.usuario_nome, usuario_email: editarEmail || dadosUsuarioLogado.usuario_email, usuario_senha: editarSenha || dadosUsuarioLogado.usuario_senha}
        console.log(`dados de usuario editado: `, dadosUsuarioEditado)

        const response = await axios.put(`http://localhost:3000/usuario/${dadosUsuarioLogado.usuario_id}`, dadosUsuarioEditado);
        console.log('to no put no frontend ')
          if (response.status === 200) {
              fetchClientes(); // Atualiza a lista de clientes após a edição
              setDadosUsuarioLogado(dadosUsuarioEditado)
              setEditarNome(''); // Limpa o campo 
              setEditarEmail(''); // Limpa o campo
              setEditarSenha(''); // Limpa o campo
              
          }

      
        // alert('Dados alterados!')
        // let usuariosAtualizado = { 
        //   ...vetorObjetosUsuarios[posicaoUsuario], 
          // nome: editarNome || vetorObjetosUsuarios[posicaoUsuario].nome, 
          // email: editarEmail || vetorObjetosUsuarios[posicaoUsuario].email, 
          // senha: editarSenha || vetorObjetosUsuarios[posicaoUsuario].senha 
        // }

        // const novosUsuarios = [...vetorObjetosUsuarios]

        // novosUsuarios[posicaoUsuario] = usuariosAtualizado
        
        // setVetorObjetosUsuarios(novosUsuarios)
        // setEditarNome('')
        // setEditarEmail('')
        // setEditarSenha('')
    }

  }

  function deslogarUsuario(){

    alert('Até mais!')
    setUsuarioLogado(false)
    setPosicaoUsuarioID(null)
    navigate('/landingpage')

  }

  const deletarUsuario = async (e) => {
    e.preventDefault();

    let promptApagarConta = prompt('ATENÇÃO! Insira a sua senha na caixa abaixo se você realmente deseja deletar sua conta\n *Essa ação será irreversível, e todas as suas resenhas serão deletadas juntas*')

    if(promptApagarConta == dadosUsuarioLogado.usuario_senha){

       
      try {
        const response = await axios.delete(`http://localhost:3000/usuario/${dadosUsuarioLogado.usuario_id}`);
        if (response.status === 200) {
          
          let usuariosAtualizado = vetorObjetosUsuarios.filter(e => e.usuario_id != dadosUsuarioLogado.usuario_id)
          // usuariosAtualizado.splice(posicaoUsuario, 1)
          console.log(usuariosAtualizado)
          
          setVetorObjetosUsuarios(usuariosAtualizado)

          alert(`Conta deletada com sucesso.`)
          setUsuarioLogado(false) //hi
          navigate(`/landingpage`)
            
        }
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }

      


    }else{

      alert(`Senha incorreta, cancelando operação...`)

    }

  }

  useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuario'); // Faz a requisição para o backend
                setVetorObjetosUsuarios(response.data); // Atualiza o vetor de usuários com os dados do backend
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, [setVetorObjetosUsuarios]);




  return (
    <div className="usuarioConfigs-container">

      <div className="usuarioConfigs-div-esquerda">



      </div>

      <div className="usuarioConfigs-body">
        
        
        

        <div className="usuarioConfigs-body-cima">

        </div>

        <div className="usuarioConfigs-body-meio">

          <div className="usuarioConfigs-body-meio-papel">

            <div className="usuarioConfigs-body-meio-papel-conta">

              <div className="usuarioConfigs-bmpc-titulo">

                <label className="lbl-titulos">Configurações de usuário</label>
                <IconUserCircle/>
                <label className="lbl-nome-usuario" >Nome Completo: {dadosUsuarioLogado.usuario_nome}</label>

              </div>

              <div className="usuarioConfigs-bmpc-infos">

              <label className="lbl-infos" >Usuário: {dadosUsuarioLogado.usuario_apelido}</label>
              <label className="lbl-infos" >Email: {dadosUsuarioLogado.usuario_email}</label>
              <label className="lbl-infos" >Senha: {dadosUsuarioLogado.usuario_senha}</label>

              <input type="text" 
                className="input"
                value={editarNome} 
                onChange={(event) => setEditarNome(event.target.value)}
                placeholder="Edite seu nome completo" />
                <input type="text" 
                className="input"
                value={editarEmail} 
                onChange={(event) => setEditarEmail(event.target.value)}
                placeholder="Edite seu email" />
                <input type="text" 
                className="input"
                value={editarSenha} 
                onChange={(event) => setEditarSenha(event.target.value)}
                placeholder="Edite sua senha" />
              </div>

              {/* <div className="usuarioConfigs-bmpc-inputs">

              </div> */}

              <div className="usuarioConfigs-bmpc-buttons">

                <button className="btn" onClick={editarDados}>Editar dados</button>
                <button className="btn" onClick={deslogarUsuario} >Deslogar</button>
                <button className="btn btn-delete" onClick={deletarUsuario}>Apagar conta</button>
              </div>

            </div>

            <div className="usuarioConfigs-body-meio-papel-resenhas">

              <div className="usuarioConfigs-bmpr-titulo">

                <label className="lbl-titulos">Minha resenhas</label>
                {/* <label className="lbl-titulos">Minhas resenhas</label> */}

              </div>

              <div className="usuarioConfigs-bmpr-body">
                
              <ResenhasConfigs/><ResenhasConfigs/><ResenhasConfigs/><ResenhasConfigs/>
              </div>

          

            </div>

          </div>

        </div>

        <div className="usuarioConfigs-body-baixo">

        </div>

      </div>

      <div className="usuarioConfigs-navbar-container">
     
      <NavbarVertical />
      </div>
      
    </div>
  )
}

export default TelaUsuarioConfigs