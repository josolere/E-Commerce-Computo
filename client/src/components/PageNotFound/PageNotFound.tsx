import { Link } from 'react-router-dom'
import pageNot from './PageNotFound.module.css'

const PageNotFound = () => {
    return (
        <>
        <div className={pageNot.containerPage}>
          <p>PAGINA NO ENCONTRADA REGRESA AL INICIO</p>  
          <Link to = '/home' className={pageNot.linkInicio}>Inicio</Link>
        </div>
        </>
    )
}

export default PageNotFound
