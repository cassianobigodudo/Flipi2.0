import { createContext, useState, useContext } from "react";
import { livros } from "./Livros";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

const [bairro, setBairro] = useState('Monte Verde')
const [vetorObjetosUsuarios, setVetorObjetosUsuarios] = useState([])
const [usuarioLogado, setUsuarioLogado] = useState(false)
const [posicaoUsuario, setPosicaoUsuario] = useState('vazio')
const [posicaoUsuarioID, setPosicaoUsuarioID] = useState(null)
const [idUsuarioLogado, setIdUsuarioLogado] = useState(null)
const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState('')
const [livroAcessado, setLivroAcessado] = useState('')

const [biblioteca, setBiblioteca] = useState(livros);

    return(
        <GlobalContext.Provider value={{bairro, setBairro, vetorObjetosUsuarios, setVetorObjetosUsuarios, usuarioLogado, setUsuarioLogado, posicaoUsuario, setPosicaoUsuario, posicaoUsuarioID, setPosicaoUsuarioID, dadosUsuarioLogado, setDadosUsuarioLogado, biblioteca, setBiblioteca, livroAcessado, setLivroAcessado, idUsuarioLogado, setIdUsuarioLogado}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
