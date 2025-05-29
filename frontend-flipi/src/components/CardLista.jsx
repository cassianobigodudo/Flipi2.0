import './CardLista.css'

function CardLista({ nome }) {
  return (
    <div className='container__card--listas'>

        <label htmlFor="" className="texto-nome-lista">{nome}</label>

    </div>
  )
}

export default CardLista
