import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./TelaUsuarioConfigs.css"
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import ResenhasConfigs from "../components/ResenhasConfigs"
import NavbarVertical from "../components/NavbarVertical"
import axios from "axios"

function TelaUsuarioConfigs() {

  const {
    posicaoUsuario,
    setPosicaoUsuario,
    posicaoUsuarioID,
    setPosicaoUsuarioID,
    vetorObjetosUsuarios,
    setVetorObjetosUsuarios,
    usuarioLogado,
    setUsuarioLogado,
    dadosUsuarioLogado,
    setDadosUsuarioLogado
  } = useContext(GlobalContext)
  const [editarNome, setEditarNome] = useState('')
  const [editarEmail, setEditarEmail] = useState('')
  const [editarDescricao, setEditarDescricao] = useState('')
  const [editarFoto, setEditarFoto] = useState('')
  const [editarSenha, setEditarSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    if (usuarioLogado == false) {

      alert('Não há usuário logado, por favor, cadastre-se ou entre na sua conta.')
      navigate('/')

    } else {

      // for (let i = 0; i < vetorObjetosUsuarios.length; i++){

      //   if(posicaoUsuarioID == vetorObjetosUsuarios[i].usuario_id){

      //     setPosicaoUsuario(i)
      //   }

      // }

      // let user = vetorObjetosUsuarios.filter((u) => u.usuario_id == posicaoUsuarioID)
      // console.log(user);

    }

  }, [])

  function verificarInputsRegistrados() {

    if (editarNome == `` && editarEmail == `` && editarSenha == ``) {

      return true

    } else {
      // alert(`oi`)
      return false
    }
  }

  function verificarInputsIguais() {

    if (editarNome == dadosUsuarioLogado.usuario_nome || editarEmail == dadosUsuarioLogado.usuario_email || editarSenha == dadosUsuarioLogado.usuario_senha) {
      return true
    } else {
      return false
    }
  }

  function verificarEmailExistente() {

    for (let i = 0; i < vetorObjetosUsuarios.length; i++) {

      if (editarEmail == vetorObjetosUsuarios[i].usuario_email && posicaoUsuarioID != vetorObjetosUsuarios[i].usuario_id) {
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

  const editarDados = async (campo) => {
    let novoValor;
    switch (campo) {
      case "nome":
        if (!editarNome || editarNome === dadosUsuarioLogado.usuario_nome) return alert("Nome inválido ou igual ao atual.");
        novoValor = { usuario_nome: editarNome };
        break;
      case "email":
        if (!editarEmail || editarEmail === dadosUsuarioLogado.usuario_email) return alert("E-mail inválido ou igual ao atual.");
        if (verificarEmailExistente()) return alert("E-mail já em uso.");
        novoValor = { usuario_email: editarEmail };
        break;
      case "foto":
        if (!editarFoto || editarFoto === dadosUsuarioLogado.url_foto) return alert("URL inválida ou igual à atual.");
        novoValor = { url_foto: editarFoto };
        break;
      case "senha":
        if (!editarSenha || editarSenha === dadosUsuarioLogado.usuario_senha) return alert("Senha inválida ou igual à atual.");
        novoValor = { usuario_senha: editarSenha };
        break;
      default:
        return;
    }

    const dadosAtualizados = { ...dadosUsuarioLogado, ...novoValor };

    try {
      const response = await axios.put(`http://localhost:3000/usuario/${dadosUsuarioLogado.usuario_id}`, dadosAtualizados);
      if (response.status === 200) {
        setDadosUsuarioLogado(dadosAtualizados);
        fetchClientes();
        alert("Dados atualizados com sucesso!");

        // limpa apenas o campo atualizado
        if (campo === "nome") setEditarNome("");
        if (campo === "email") setEditarEmail("");
        if (campo === "foto") setEditarFoto("");
        if (campo === "senha") setEditarSenha("");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  function deslogarUsuario() {

    alert('Até mais!')
    setUsuarioLogado(false)
    setPosicaoUsuarioID(null)
    navigate('/')

  }

  const deletarUsuario = async (e) => {
    e.preventDefault();

    let promptApagarConta = prompt('ATENÇÃO! Insira a sua senha na caixa abaixo se você realmente deseja deletar sua conta\n *Essa ação será irreversível, e todas as suas resenhas serão deletadas juntas*')

    if (promptApagarConta == dadosUsuarioLogado.usuario_senha) {

      try {
        const response = await axios.delete(`http://localhost:3000/usuario/${dadosUsuarioLogado.usuario_id}`);
        if (response.status === 200) {

          let usuariosAtualizado = vetorObjetosUsuarios.filter(e => e.usuario_id != dadosUsuarioLogado.usuario_id)
          console.log(usuariosAtualizado)

          setVetorObjetosUsuarios(usuariosAtualizado)

          alert(`Conta deletada com sucesso!!`)
          setUsuarioLogado(false)
          navigate(`/landingpage`)

        }
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }

    } else {
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

  // Calcula a pontuação com base na quantidade de resenhas do usuário
  const resenhasUsuario = dadosUsuarioLogado.resenhas || [];
  const pontuacao = resenhasUsuario.length * 10; // Exemplo: 10 pontos por resenha
  const nivel = Math.floor(pontuacao / 100) + 1; // Exemplo: cada 100 pontos sobe de nível
  const pontosProximoNivel = 100;
  const progresso = ((pontuacao % pontosProximoNivel) / pontosProximoNivel) * 100;

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

                <label className="lbl-titulos"></label>
                <img
                  src={editarFoto || dadosUsuarioLogado.url_foto}
                  alt="Foto do usuário"
                  className="img-usuario"
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
                <div className="usuarioNomeDescricao">
                  <h2>{dadosUsuarioLogado.usuario_nome}</h2>
                  <div className="campo-editavel">
                    <textarea
                      className="lbl-infos"
                      value={editarDescricao}
                      onChange={(e) => setEditarDescricao(e.target.value)}
                      placeholder={dadosUsuarioLogado.descricao || "Sua descrição..."}
                    />
                    <button
                      className="btn-editar"
                      onClick={async () => {
                        if (!editarDescricao || editarDescricao === dadosUsuarioLogado.descricao) {
                          alert("Descrição inválida ou igual à atual.");
                          return;
                        }
                        try {
                          const response = await axios.put(`http://localhost:3000/usuario/${dadosUsuarioLogado.usuario_id}`, {
                            ...dadosUsuarioLogado,
                            descricao: editarDescricao
                          });
                          if (response.status === 200) {
                            setDadosUsuarioLogado(prev => ({
                              ...prev,
                              descricao: editarDescricao
                            }));
                            setEditarDescricao("");
                            alert("Descrição atualizada com sucesso!");
                          }
                        } catch (error) {
                          console.error("Erro ao atualizar descrição:", error);
                        }
                      }}
                    >✏️</button>
                  </div>
                </div>

              </div>
              <div className="usuarioConfigs-bmpc-infos">
                <div className="senha-container">
                  <label className="lbl-infos">
                    Senha: {mostrarSenha
                      ? dadosUsuarioLogado.usuario_senha
                      : "•".repeat(dadosUsuarioLogado.usuario_senha?.length || 0)}
                  </label>

                  <button
                    className="btn-olhoMagico"
                    onMouseDown={() => setMostrarSenha(true)}
                    onMouseUp={() => setMostrarSenha(false)}
                  >
                    👁️
                  </button>
                </div>
                <div className="teste">
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="text"
                        className="input"
                        value={editarNome}
                        onChange={(e) => setEditarNome(e.target.value)}
                        placeholder={dadosUsuarioLogado.usuario_nome}
                      />
                      <button className="btn-editar" onClick={() => editarDados("nome")}>✏️</button>
                    </div>
                  </div>
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="email"
                        className="input"
                        value={editarEmail}
                        onChange={(e) => setEditarEmail(e.target.value)}
                        onBlur={() => {
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (editarEmail && !emailRegex.test(editarEmail)) {
                            alert("Por favor, insira um e-mail válido.");
                            setEditarEmail("");
                          }
                        }}
                        placeholder={dadosUsuarioLogado.usuario_email}
                      />
                      <button className="btn-editar" onClick={() => editarDados("email")}>✏️</button>
                    </div>
                  </div>
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="text"
                        className="input"
                        value={editarFoto}
                        onChange={(e) => setEditarFoto(e.target.value)}
                        placeholder="Cole a URL da imagem"
                      />
                      <button className="btn-editar" onClick={() => editarDados("foto")}>✏️</button>
                    </div>
                  </div>
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="text"
                        className="input"
                        value={editarSenha}
                        onChange={(e) => setEditarSenha(e.target.value)}
                        placeholder="Editar Senha"
                      />
                      <button className="btn-editar" onClick={() => editarDados("senha")}>✏️</button>
                    </div>
                  </div>
                </div>
                <div className="teste2">
                  <h3>Nível</h3>
                  <div className="nivel-numero">{nivel}</div>
                  <p>Pontuação: {pontuacao} pontos</p>
                  <p>Progresso para o próximo nível...</p>
                  <div className="progresso">
                    <div className="preenchido" style={{ width: `${progresso}%` }}></div>
                  </div>
                </div>
               </div>
               <div className="deslogar-deletar">
                <button className="btn" onClick={deslogarUsuario} >Deslogar</button>
                <button className="btn btn-delete" onClick={deletarUsuario}>Deletar conta</button>
               </div>
                <div className="listas-btn">
                  <button className="btn-secao">Listas Personalizadas</button>
                  <button
                    className="btn-secao"
                    onClick={() => navigate("/telaescrivaninha")}
                  >
                    Resenhas
                  </button>
              </div>
            </div>

            <div className="usuarioConfigs-body-meio-papel-resenhas">
              <div className="usuarioConfigs-bmpr-titulo">
                <label className="lbl-titulos">Minhas resenhas</label>
              </div>

              <div className="usuarioConfigs-bmpr-body">
                <ResenhasConfigs /><ResenhasConfigs /><ResenhasConfigs /><ResenhasConfigs />
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