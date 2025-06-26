
import { createContext, useState, useContext, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [vetorObjetosUsuarios, setVetorObjetosUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    return localStorage.getItem("usuarioLogado") === "true";
  });

  const [posicaoUsuario, setPosicaoUsuario] = useState("vazio");

  const [posicaoUsuarioID, setPosicaoUsuarioID] = useState(() => {
    return localStorage.getItem("posicaoUsuarioID") || null;
  });

  const [idUsuarioLogado, setIdUsuarioLogado] = useState(() => {
    return localStorage.getItem("idUsuarioLogado") || null;
  });

  const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState(() => {
    try {
      const data = localStorage.getItem("dadosUsuarioLogado");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Erro ao carregar dadosUsuarioLogado:", e);
      localStorage.removeItem("dadosUsuarioLogado");
      return null;
    }
  });

  const [livroAcessado, setLivroAcessado] = useState("");
  const [listaResenhas, setListaResenhas] = useState([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [usuarioId, setUsuarioId] = useState();
  const [livrosPesquisados, setLivrosPesquisados] = useState([]);

  // 🔄 Sincronização com localStorage
  useEffect(() => {
    localStorage.setItem("usuarioLogado", usuarioLogado);
  }, [usuarioLogado]);

  useEffect(() => {
    if (posicaoUsuarioID) {
      localStorage.setItem("posicaoUsuarioID", posicaoUsuarioID);
    } else {
      localStorage.removeItem("posicaoUsuarioID");
    }
  }, [posicaoUsuarioID]);

  useEffect(() => {
    if (idUsuarioLogado) {
      localStorage.setItem("idUsuarioLogado", idUsuarioLogado);
    } else {
      localStorage.removeItem("idUsuarioLogado");
    }
  }, [idUsuarioLogado]);

  useEffect(() => {
    if (dadosUsuarioLogado) {
      try {
        localStorage.setItem("dadosUsuarioLogado", JSON.stringify(dadosUsuarioLogado));
      } catch (e) {
        console.error("Erro ao salvar dadosUsuarioLogado:", e);
      }
    } else {
      localStorage.removeItem("dadosUsuarioLogado");
    }
  }, [dadosUsuarioLogado]);

  return (
    <GlobalContext.Provider
      value={{
        livrosPesquisados,
        setLivrosPesquisados,
        vetorObjetosUsuarios,
        setVetorObjetosUsuarios,
        usuarioLogado,
        setUsuarioLogado,
        posicaoUsuario,
        setPosicaoUsuario,
        posicaoUsuarioID,
        setPosicaoUsuarioID,
        dadosUsuarioLogado,
        setDadosUsuarioLogado,
        livroAcessado,
        setLivroAcessado,
        listaResenhas,
        setListaResenhas,
        usuarioId,
        setUsuarioId,
        idUsuarioLogado,
        setIdUsuarioLogado,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

