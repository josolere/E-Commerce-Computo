import { Link } from "react-router-dom"
import styles from "./Dropdown.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { BiUserCircle } from "react-icons/bi"
import { RiQuestionnaireFill } from "react-icons/ri"
import { FaShippingFast } from "react-icons/fa"



function DropdownMenu(props: any) {

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);

    const logoutchange = () => {
        removeCookie('User')
        window.location.href = 'http://localhost:3000/Home'
    }

    return (
        <div className={styles.dropdown} onMouseLeave={props.data}>
            <Link className={styles.profile} to="/EditarCuenta"><BiUserCircle className={styles.iconButton}></BiUserCircle>{cookies.User.name}</Link>

            {cookies.User.privilege === "user" ?

                <>
                    <p >
                        <Link to={`/Ordenes/Usuario`}>
                            <FaShippingFast className={styles.icon} ></FaShippingFast>Mis Pedidos
                    </Link>

                    </p>
                    <p ><RiQuestionnaireFill className={styles.icon}></RiQuestionnaireFill>Preguntas</p></>


                : false}



            {cookies.User.privilege === "admin" ?
                <>
                    <p><Link to="/CrearAdministrador"><FontAwesomeIcon className={styles.icon} icon={faFolderPlus}></FontAwesomeIcon>Asignar Permisos</Link></p>
                    <p><Link to="/CrearProducto"><FontAwesomeIcon className={styles.icon} icon={faFolderPlus}></FontAwesomeIcon>Añadir Producto</Link></p>
                    <p><Link to="/CrearCategoria"><FontAwesomeIcon className={styles.icon} icon={faFolderPlus}></FontAwesomeIcon>Añadir Categoría</Link></p>
                    <p><Link to="/Ordenes"><FaShippingFast className={styles.icon}></FaShippingFast>Ordenes</Link></p>
                </> : false}


            <p onClick={logoutchange} ><FontAwesomeIcon className={styles.icon} icon={faSignOutAlt}></FontAwesomeIcon>Cerrar Sesión</p>
        </div>
    )


}
export default DropdownMenu;