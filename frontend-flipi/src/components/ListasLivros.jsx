import { useContext, useEffect, useState } from 'react'
import './ListasLivros.css'
import CardLista from './CardLista';
import MinhaLista from './MinhaLista';
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";

function ListasLivros() {
    
    const [listaSelecionada, setListaSelecionada] = useState(null);
    const [abriuForm, setAbriuForm] = useState(false);
    const [nomeLista, setNomeLista] = useState('');
    const [descricaoLista, setDescricaoLista] = useState('');
    const [listas, setListas] = useState([]);
    
    const { idUsuarioLogado, posicaoUsuarioID } = useContext(GlobalContext);
    console.log("idUsuarioLogado:", idUsuarioLogado);
    console.log("posicaoUsuarioID:", posicaoUsuarioID);

    
    const idUsuario = idUsuarioLogado || posicaoUsuarioID;
    useEffect(() => {
        const buscarListas = async () => {
            try {
                const resposta = await axios.get(`http://localhost:3000/listas_personalizadas/usuario/${idUsuario}`);
                setListas(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar listas:", erro);
            }
            };

            if (idUsuario) {
                buscarListas();
            }
            
    }, [idUsuario]);

    const salvarLista = async (e) => {

        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3000/listas_personalizadas",
             {
                nome: nomeLista,
                descricao: descricaoLista,
                criador: idUsuarioLogado || posicaoUsuarioID
            });
            alert("Lista criada com sucesso!");
            console.log("Lista criada:", res.data);
            setListas((prevListas) => [...prevListas, res.data]);
            setNomeLista(""); // Limpa o input
            setDescricaoLista(""); // Limpa o input
            setAbriuForm(false); // Fecha o diálogo APÓS atualizar a lista
          
        } catch (err) {
          console.error(err);
          alert("Erro ao criar lista");
        }

    };

  return (
    <div className='container__listas'>

        {listaSelecionada ? (
            <MinhaLista 
                nomeLista={listaSelecionada.nome_lista} 
                descricaoLista={listaSelecionada.descricao_lista}
                lista={listaSelecionada}
                voltar={() => setListaSelecionada(null)}
                listas={listas}
                setListas={setListas}
                listaSelecionada={listaSelecionada}
                setListaSelecionada={setListaSelecionada}
                setLista={setListaSelecionada}
            />
        ) : (

            <>
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

                        <div className="card__listas">

                            {listas.length > 0 ? (
                                listas.map((lista) => (
                                    <div className="card__lista"
                                    onClick={() => setListaSelecionada(lista)} 
                                    key={lista.id}
                                    >
                                        <CardLista nome={lista.nome_lista} />
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma lista criada ainda.</p>
                            )}
            
                        </div>

                    </div>

                </div>

                    <dialog open={abriuForm} className='dialog_lista-livros'>

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
            </>
        )}

    </div>
  )
}

export default ListasLivros
