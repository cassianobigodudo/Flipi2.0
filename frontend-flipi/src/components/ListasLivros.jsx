import { useContext, useEffect, useState } from 'react'
import './ListasLivros.css'
import CardLista from './CardLista';
import MinhaLista from './MinhaLista';
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import { useUser } from '../contexts/UserContext';

function ListasLivros({ userId }) {


    const [abriuForm, setAbriuForm] = useState(false);
    const [nomeLista, setNomeLista] = useState('');
    const [descricaoLista, setDescricaoLista] = useState('');
    const [listas, setListas] = useState([]);
    const [mostrarLista, setMostrarLista] = useState(false);
    
    // const { posicaoUsuarioID } = useContext(GlobalContext);
    const { usuarioID } = useUser();

    //claude ia
    useEffect(() => {
        const fetchListas = async () => {
            console.log('ID do usuário no Listas:', usuarioID);
            
            if (!usuarioID) {
                console.log('ID do usuário não encontrado');
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:3000/listas_personalizadas/usuario/${usuarioID}`
                );
                
                console.log('Listas carregadas:', response.data);
                setListas(response.data);
                
            } catch (error) {
                console.error('Erro ao buscar listas:', error);
            }
        };

        fetchListas();
    }, [usuarioID]);

    //chatgpt
    // useEffect(() => {
    //     console.log('ID do usuário atualizado:', posicaoUsuarioID);
    // }, [posicaoUsuarioID]);

    // useEffect(() => {

    //     console.log('useEffect executado');
    //     console.log('posicaoUsuarioID no useEffect:', posicaoUsuarioID);

    //     if (!posicaoUsuarioID) {
    //         console.log('ID do usuário não encontrado');
    //         return;
    //     }

    //     axios.get(`http://localhost:3000/listas_personalizadas/${posicaoUsuarioID}`)
    //         .then(res => {
    //             setListas(res.data);
    //         })
    //         .catch(err => {
    //             console.error('Erro ao buscar listas', err);
    //             console.log(`id do usuário: ${posicaoUsuarioID}`)
    //         });

    // }, [posicaoUsuarioID]);

    const salvarLista = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3000/listas_personalizadas",
             {
                nome_lista: nomeLista,
                descricao_lista: descricaoLista,
                criador_lista: posicaoUsuarioID
            });
            alert("Lista criada com sucesso!");
            console.log("Lista criada:", res.data);
            setNomeLista(""); // Limpa o input
            setDescricaoLista(""); // Limpa o input
            setAbriuForm(false); // Fecha o diálogo APÓS atualizar a lista
          
        } catch (err) {
          console.error(err);
          alert("Erro ao criar lista");
        }
    };

    // useEffect(() => {
    //     async function fetchListas() {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/listas_personalizadas/usuario/${userId}`);
    //             setListas(response.data);
    //         } catch (error) {
    //             console.error('Erro ao buscar listas:', error);
    //         }
    //     }

    //     fetchListas();
    // }, [userId]);

  return (
    <div className='container__listas'>

        {mostrarLista && <MinhaLista />}

        <div className="listas__header">

            <div className="botao__header">

                <button className="botao__criar--listas" onClick={() => setAbriuForm(true)}>
                    <img src="./teste/criar-listas.svg" alt="Criar lista" className='img__criar--listas'/>
                    <span className='texto__botao--header'>Criar Lista</span>
                </button>

            </div>

        </div>

        <div className="listas__body">

            <div className="listas__body--card__listas">

                {listas.length > 0 ? (
                    listas.map((lista) => (
                        <div className="card__lista" onClick={() => setMostrarLista(true)} key={lista.id}>
                            <CardLista nome={lista.nome_lista} />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma lista criada ainda.</p>
                )}
 
            </div>

        </div>

            <dialog open={abriuForm}>

                <div className="form__listas">

                    <div className="form__nome--lista">

                        <label htmlFor="" className="nome__lista">Nome</label>
                        <input 
                            type="text"
                            className='form__inputs'
                            placeholder='nomeie sua lista aqui...'
                            value={nomeLista}
                            onChange={(event) => setNomeLista(event.target.value)}
                        />

                    </div>

                    <div className="form__descricao--lista">

                        <label htmlFor="" className="nome__lista">Descrição</label>
                        <textarea 
                            type="text"
                            className='form__campo--descricao'
                            placeholder='escreva uma breve descrição sobre sua lista aqui...'
                            value={descricaoLista}
                            onChange={(event) => setDescricaoLista(event.target.value)}
                        />

                    </div>

                    <div className="form__botao--salvar">

                        <button className="salvar__listas" onClick={salvarLista}>Salvar lista</button>

                    </div>

                </div>

            </dialog>
      
    </div>
  )
}

export default ListasLivros
