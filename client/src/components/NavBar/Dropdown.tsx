import { Link } from "react-router-dom"
import styles from "./Dropdown.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faWrench, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Cookies, CookiesProvider, useCookies } from "react-cookie";


function DropdownMenu (props:any) {

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);

    const logoutchange = () => {
        removeCookie('User')
        window.location.href = 'http://localhost:3000/Home'
    }

    return (
        <div className={styles.dropdown} onMouseLeave={props.data}>
            <p ><FontAwesomeIcon className={styles.icon} icon={faWrench}></FontAwesomeIcon>Perfil</p>
            <p><Link to="/CrearProducto"><FontAwesomeIcon className={styles.icon} icon={faFolderPlus}></FontAwesomeIcon>Añadir Producto</Link></p>
            <p><Link to="/CrearCategoria"><FontAwesomeIcon className={styles.icon} icon={faFolderPlus}></FontAwesomeIcon>Añadir Categoría</Link></p>
            <p onClick = {logoutchange} ><FontAwesomeIcon className={styles.icon} icon={faSignOutAlt}></FontAwesomeIcon>Cerrar Sesión</p>
        </div>
    )
    
  
  } 
  export default DropdownMenu;