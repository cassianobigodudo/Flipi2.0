import React, { useEffect, useState, useContext } from 'react';
import ResenhasConfigs from './ResenhasConfigs';
import { GlobalContext } from '../contexts/GlobalContext';

function ResenhasConfigsList() {
  const { user } = useContext(GlobalContext); // supondo que user tem o id do usuário logado
  const [resenhas, setResenhas] = useState([]);

  useEffect(() => {
    fetch(`/api/resenhas?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setResenhas(data));
  }, [user.id]);

  return (
    <div className="usuarioConfigs-bmpr-body">
      {resenhas.length === 0 ? (
        <p>Você ainda não cadastrou nenhuma resenha.</p>
      ) : (
        resenhas.map(resenha => (
          <ResenhasConfigs key={resenha.id} {...resenha} />
        ))
      )}
    </div>
  );
}

export default ResenhasConfigsList;