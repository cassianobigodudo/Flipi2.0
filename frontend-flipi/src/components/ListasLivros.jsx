import { useEffect, useState } from 'react'
import './ListasLivros.css'
import CardLista from './CardLista';
import MinhaLista from './MinhaLista';
import axios from "axios";
// import { GlobalContext } from '../contexts/GlobalContext';
// const { usuarioLogado } = useContext(GlobalContext);

function ListasLivros() {

    const [abriuForm, setAbriuForm] = useState(false);
    const [nomeLista, setNomeLista] = useState('');
    const [descricaoLista, setDescricaoLista] = useState('');
    const [listas, setListas] = useState([]);
    const [mostrarLista, setMostrarLista] = useState(false);

    // function salvarLista(){

    //     if (nomeLista === '' || descricaoLista === ''){
    //         alert('Todos os campos do formulário devem ser preenchidos!')
    //     }

    //     if (nomeLista.trim() && descricaoLista.trim()) {
    //         setListas(prevListas => {
    //             const novasListas = [...prevListas, { nomeLista, descricaoLista }];
    //             setNomeLista(""); // Limpa o input
    //             setDescricaoLista(""); // Limpa o input
    //             setAbriuForm(false); // Fecha o diálogo APÓS atualizar a lista
    //             console.log(novasListas)
    //             return novasListas;
    //         });
    //     }

    // }

    const salvarLista = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3000/listas",
             {
                nome: nomeLista,
                descricao: descricaoLista
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
                        listas.map((lista, index) => (

                            <div className="card__lista" onClick={() => setMostrarLista(true)}>
                                <CardLista key={index} titulo={lista.nomeLista} />
                            </div>
                        ))
                    ) : (
                            <p>Nenhuma lista criada ainda.</p>
                    )
                }
 
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
