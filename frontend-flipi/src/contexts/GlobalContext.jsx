import { createContext, useState, useContext, useEffect } from "react";
import { livros } from "./Livros";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

    const [vetorObjetosUsuarios, setVetorObjetosUsuarios] = useState([])
    const [usuarioLogado, setUsuarioLogado] = useState(false)
    const [posicaoUsuario, setPosicaoUsuario] = useState('vazio')
    const [posicaoUsuarioID, setPosicaoUsuarioID] = useState(
        localStorage.getItem("posicaoUsuarioID") || null
    )
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(
        localStorage.getItem("idUsuarioLogado") || null
    )
    const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState(
        localStorage.getItem("dadosUsuarioLogado") || ""
    )
    const [livroAcessado, setLivroAcessado] = useState('')

    const [biblioteca, setBiblioteca] = useState(livros);

    // 🔗 Sincroniza o idUsuarioLogado no localStorage
    useEffect(() => {
        if (idUsuarioLogado) {
        localStorage.setItem("idUsuarioLogado", idUsuarioLogado);
        } else {
        localStorage.removeItem("idUsuarioLogado");
        }
    }, [idUsuarioLogado]);

    useEffect(() => {
        if (posicaoUsuarioID) {
        localStorage.setItem("posicaoUsuarioID", posicaoUsuarioID);
        } else {
        localStorage.removeItem("posicaoUsuarioID");
        }
    }, [posicaoUsuarioID]);

    useEffect(() => {
        if (dadosUsuarioLogado) {
        localStorage.setItem("dadosUsuarioLogado", dadosUsuarioLogado);
        } else {
        localStorage.removeItem("dadosUsuarioLogado");
        }
    }, [dadosUsuarioLogado]);

    const [listaResenhas, setListaResenhas] = useState([])
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [usuarioId, setUsuarioId] = useState()
    const [livrosPesquisados, setLivrosPesquisados] = useState([])


    return(
 
        <GlobalContext.Provider value={{
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
            biblioteca, 
            setBiblioteca, 
            livroAcessado, 
            setLivroAcessado,
            listaResenhas, 
            setListaResenhas, 
            usuarioId, 
            setUsuarioId,
            idUsuarioLogado, 
            setIdUsuarioLogado
          }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
