import './CardLista.css'

function CardLista({ titulo }) {
  return (
    <div className='container__card--listas'>

        <div className="img__card--listas">

            {/* <img src="./flipi/capa.webp" alt="" className='image__capa--listas'/> */}

        </div>

        <div className="title__card--listas">

            <label htmlFor="">{titulo}</label>

        </div>
      
    </div>
  )
}

export default CardLista
