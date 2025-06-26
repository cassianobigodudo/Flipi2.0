
//atualização - JAIME
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LivroParteUm from "../components/LivroParteUm";
import Navbar from "../components/Navbar"
import axios from "axios";
import "./TelaLivro.css";

function TelaLivro() {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [resenhaInd, setResenhaInd] = useState(null);

  const location = useLocation();
  const { isbn } = useParams();

  const atualizarCatalogo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/livro");
      setLivros(response.data);
      console.log("Catálogo atualizado:", response.data);
    } catch (error) {
      console.error("Erro ao buscar catálogo:", error);
    }
  };

  const buscarLivroPorIsbn = async (isbn) => {
    try {
      const response = await axios.get(`http://localhost:3000/livro/${isbn}`);
      setLivroSelecionado(response.data);
      setResenhaInd(1); // Ou alguma lógica baseada no livro
    } catch (error) {
      console.error("Erro ao buscar livro por ISBN:", error);
    }
  };

  const selecionarLivroPorIndex = (index) => {
    const livro = livros[index];
    if (livro) {
      setLivroSelecionado(livro);
      setResenhaInd(index + 1);
    } else {
      console.warn("Livro não encontrado para o index:", index);
    }
  };

  useEffect(() => {
    atualizarCatalogo();
  }, []);

  useEffect(() => {
    // Espera o catálogo carregar antes de tentar selecionar
    if (livros.length > 0) {
      if (isbn) {
        buscarLivroPorIsbn(isbn); // se a URL tem ISBN
      } else if (location.state?.index != null) {
        selecionarLivroPorIndex(location.state.index); // se veio via state
      } else {
        console.warn("Nenhum parâmetro de navegação foi passado.");
      }
    }
  }, [isbn, location.state, livros]);

  return (
    <div className="container-mae">
      <LivroParteUm livro={livroSelecionado} indexResenha={resenhaInd} />
    </div>
  );
}

export default TelaLivro
