import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./TelaUsuarioConfigs.css"
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import ResenhasConfigs from "../components/ResenhasConfigs"
import NavbarVertical from "../components/NavbarVertical"
import axios from "axios"
import ListasLivros from "../components/ListasLivros"

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
    setDadosUsuarioLogado,
    idUsuarioLogado,
    setIdUsuarioLogado
  } = useContext(GlobalContext)
  const [editarNome, setEditarNome] = useState('')
  const [editarEmail, setEditarEmail] = useState('')
  const [editarDescricao, setEditarDescricao] = useState('')
  const [editarFoto, setEditarFoto] = useState('')
  const [editarSenha, setEditarSenha] = useState('')
  const [mostrarComponente, setMostrarComponente] = useState('resenhas');
  // const [mostrarSenha, setMostrarSenha] = useState(false)
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
        if (verificarEmailExistente()) {
          if (!editarDados.emailAlertShown) {
            alert("E-mail já em uso.");
            editarDados.emailAlertShown = true;
            setTimeout(() => {
              editarDados.emailAlertShown = false;
            }, 1000); // impede múltiplos alerts em sequência
          }
          return;
        }
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
      case "descricao":
        if (!editarDescricao || editarDescricao === dadosUsuarioLogado.usuario_descricao) return alert("Descrição inválida ou igual à atual.");
        novoValor = { usuario_descricao: editarDescricao };
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
        if (campo === "descricao") setEditarDescricao("");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  function deslogarUsuario() {

    alert('Até mais!')

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("posicaoUsuarioID");
    localStorage.removeItem("idUsuarioLogado");
    localStorage.removeItem("dadosUsuarioLogado");

    setUsuarioLogado(false)
    setPosicaoUsuarioID(null)
    setDadosUsuarioLogado(null);
    setIdUsuarioLogado(null);
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


          alert(`Conta deletada com sucesso.`)
          localStorage.removeItem("usuarioLogado");
          localStorage.removeItem("posicaoUsuarioID");
          localStorage.removeItem("idUsuarioLogado");
          localStorage.removeItem("dadosUsuarioLogado");
          setUsuarioLogado(false) //hi
          setPosicaoUsuarioID(null)
          setDadosUsuarioLogado(null);
          navigate(`/`)
            
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
  // Busca as resenhas do usuário logado para calcular pontos e nível
  const [resenhasUsuario, setResenhasUsuario] = useState([]);

  useEffect(() => {
    const fetchResenhasUsuario = async () => {
      try {
        // Supondo que o backend tenha um endpoint para buscar resenhas por usuário
        const response = await axios.get(`http://localhost:3000/resenha?usuario_id=${dadosUsuarioLogado.usuario_id}`);
        setResenhasUsuario(response.data || []);
      } catch (error) {
        setResenhasUsuario([]);
      }
    };

    if (dadosUsuarioLogado?.usuario_id) {
      fetchResenhasUsuario();
    }
  }, [dadosUsuarioLogado?.usuario_id]);

  // Calcula pontuação, nível e progresso sempre que resenhasUsuario mudar
  const [pontuacao, setPontuacao] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const novaPontuacao = resenhasUsuario.length * 10;
    const novoNivel = Math.floor(novaPontuacao / 100) + 1;
    const pontosProximoNivel = 100;
    const novoProgresso = ((novaPontuacao % pontosProximoNivel) / pontosProximoNivel) * 100;

    setPontuacao(novaPontuacao);
    setNivel(novoNivel);
    setProgresso(novoProgresso);
  }, [resenhasUsuario]);

  // Função para lidar com a alteração da senha
  const handleSenhaClick = async () => {
    const senhaAtual = prompt("Digite sua senha atual para alterar:");
    if (senhaAtual === null) return; // Cancelado
    if (senhaAtual !== dadosUsuarioLogado.usuario_senha) {
      alert("Senha atual incorreta!");
      return;
    }
    const novaSenha = prompt("Digite a nova senha:");
    if (novaSenha === null || novaSenha.trim() === "") {
      alert("Nova senha não pode ser vazia.");
      return;
    }
    setEditarSenha(novaSenha);
    // Opcional: já chama salvarAlteracoes ou deixa para o usuário apertar Enter
    // await editarDados("senha");
  };

  // Função para salvar todas as alterações feitas nos campos editáveis
  const salvarAlteracoes = async () => {
    // Nome
    if (editarNome && editarNome !== dadosUsuarioLogado.usuario_nome) {
      await editarDados("nome");
    }
    // Email
    if (editarEmail && editarEmail !== dadosUsuarioLogado.usuario_email) {
      await editarDados("email");
    }
    // Foto
    if (editarFoto && editarFoto !== dadosUsuarioLogado.url_foto) {
      await editarDados("foto");
    }
    // Senha
    if (editarSenha && editarSenha !== dadosUsuarioLogado.usuario_senha) {
      await editarDados("senha");
    }
    // Descrição (caso queira salvar também, adicione lógica aqui)
    if (editarDescricao && editarDescricao !== dadosUsuarioLogado.descricao) {
      // Implemente a lógica para salvar a descrição se necessário
      await editarDados("descricao");
    }
  };

  // Sistema de descrição/bio editável
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
                />
                <div className="usuarioNomeDescricao">
                  <h2>{dadosUsuarioLogado.usuario_nome}</h2>
                  <div className="campo-descricao">
                    <textarea
                      className="descricao"
                      value={editarDescricao}
                      onChange={(e) => setEditarDescricao(e.target.value)}
                      placeholder={dadosUsuarioLogado.usuario_descricao || "Sua descrição..."}
                      onFocus={(e) => {
                        if (!editarDescricao && dadosUsuarioLogado.usuario_descricao) {
                          setEditarDescricao(dadosUsuarioLogado.usuario_descricao);
                        }
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          await editarDados("descricao");
                        }
                      }}
                      rows={3}
                    />
                  </div>
                </div>

              </div>
              <div className="usuarioConfigs-bmpc-infos">
                <div className="teste">
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="text"
                        className="input"
                        value={editarNome}
                        onChange={(e) => setEditarNome(e.target.value)}
                        placeholder={dadosUsuarioLogado.usuario_nome}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            await salvarAlteracoes();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="email"
                        className="input"
                        value={editarEmail}
                        onChange={(e) => setEditarEmail(e.target.value)}
                        onBlur={async () => {
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (editarEmail && !emailRegex.test(editarEmail)) {
                            alert("Por favor, insira um e-mail válido.");
                            setEditarEmail("");
                          } else {
                            await salvarAlteracoes();
                          }
                        }}
                        placeholder={dadosUsuarioLogado.usuario_email}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            await salvarAlteracoes();
                          }
                        }}
                      />
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
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            await salvarAlteracoes();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="campo-editavel">
                    <div className="input-container">
                      <input
                        type="password"
                        className="input"
                        value={editarSenha}
                        onChange={(e) => setEditarSenha(e.target.value)}
                        placeholder="Nova senha"
                        onClick={handleSenhaClick}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            await salvarAlteracoes();
                          }
                        }}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="teste2">
                  <h3 className="nivel-titulo">Nível</h3>
                  <div className="nivel-numero">{nivel}</div>
                  <p>Pontuação: {pontuacao} pontos</p>
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
                  <button className="btn-secao" onClick={() => setMostrarComponente('listas')}>Listas</button>
                  <button
                    className="btn-secao"
                    onClick={() => setMostrarComponente('resenhas')}
                  >
                    Resenhas
                  </button>
              </div>
            </div>

            <div className="usuarioConfigs-body-meio-papel-resenhas">
              { mostrarComponente === 'resenhas' && <ResenhasConfigs />}
              { mostrarComponente === 'listas' && <ListasLivros />}
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

export default TelaUsuarioConfigs;