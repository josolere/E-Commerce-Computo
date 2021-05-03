import { Link } from 'react-router-dom';
import styles from "./buildPcFilter.module.scss"
import imageIntel from "../images/imageIntel.jpg"
import imageAmd from "../images/imageAmd.jpg"


 
const BuildPcFilter = () => {
    return ( 
        <div className={styles.contenedor}>

            <div className={styles.contenedorImages}>
            <h1>Arma tu PC</h1>
                <Link to="/armatupc/amd">

                    <img src={imageAmd}></img>
                </Link>
                <Link to="/armatupc/intel">
                    <img src={imageIntel}></img>
                 </Link>
            </div>

        </div>
     );
}
 
export default BuildPcFilter;