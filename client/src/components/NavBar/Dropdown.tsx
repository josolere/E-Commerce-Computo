import { Link } from "react-router-dom"
import styles from "./Dropdown.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faFolderPlus, faUserMinus, faUnlock, faUserPlus, faList, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { BiUserCircle } from "react-icons/bi"
import { RiQuestionnaireFill } from "react-icons/ri"
import { FaCashRegister, FaShippingFast, FaUserPlus } from "react-icons/fa"
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER, LOGOUT } from "../../gql/login";
import {useDispatch} from 'react-redux'
import { deleteCart } from '../../redux/actions'


interface user {
    currentUser: {
        name: string,
        password: string,
        email: string
    }
}

function DropdownMenu(props: any) {

    const dispatch = useDispatch()

    const [out, nothing] = useMutation(LOGOUT);

    let user: any = {}

    const { data } = useQuery<user>(ACTUAL_USER)

    user = data?.currentUser

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);

    const logoutchange = () => {
        out()
        window.location.href = 'http://localhost:3000/Home'
         localStorage.clear()
            dispatch(deleteCart())
    }

    return (
        <div className={styles.dropdown} onMouseLeave={props.data}>
            <Link className={styles.profile} to="/EditarCuenta"><BiUserCircle style={{marginRight:'3%'}}></BiUserCircle>{user?.name}</Link>
            {user?.privilege === 'user' ?
                <div className={styles.orderdiv}>
                    <p className={styles.pDrop} >
                        <Link to={`/Ordenes/Usuario`}><FaShippingFast style={{marginRight:'3%'}}  ></FaShippingFast>Mis Pedidos</Link></p>
                    <p className={styles.pDrop} >
                        <Link to='/ResetContraseña'><FontAwesomeIcon style={{marginRight:'3%'}}  icon={faUnlock}  /> Cambiar contraseña</Link> </p>
                    <p className={styles.pDrop} >
                        <Link to='/BorrarUsuario'><FontAwesomeIcon style={{marginRight:'3%'}}  icon={faUserMinus}  /> Borrar Usuario</Link></p>
                    <p className={styles.pDrop} >
                        <RiQuestionnaireFill style={{marginRight:'3%'}}  ></RiQuestionnaireFill>Preguntas</p>
                    <p className={styles.pDrop} onClick={logoutchange} >
                        <FontAwesomeIcon style={{marginRight:'3%'}}  icon={faSignOutAlt}></FontAwesomeIcon>Cerrar Sesión</p>
                </div>
                : false}
            {user.privilege === "admin" ?
                <div className={styles.orderdiv}>
                    <p className={styles.pDrop} >
                        <Link to='/AdminBorrar'><FontAwesomeIcon style={{marginRight:'3%'}}  icon={faUserMinus} /> Borrar Usuario</Link></p>
                    <p className={styles.pDrop} >
                        <Link to="/CrearAdministrador"><FontAwesomeIcon style={{marginRight:'3%'}}   icon={faUserPlus}></FontAwesomeIcon> Asignar Administrador</Link></p>
                    <p className={styles.pDrop} >
                        <Link to="/CrearProducto"><FontAwesomeIcon style={{marginRight:'3%'}}   icon={faCashRegister}></FontAwesomeIcon>Añadir Producto</Link></p>
                    <p className={styles.pDrop} >
                        <Link to="/CrearCategoria"><FontAwesomeIcon style={{marginRight:'3%'}}   icon={faList}></FontAwesomeIcon>Añadir Categoría</Link></p>
                    <p className={styles.pDrop} >
                        <Link to="/Ordenes"><FaShippingFast style={{marginRight:'3%'}}  ></FaShippingFast>Ordenes</Link></p>
                    <p className={styles.pDrop} onClick={logoutchange} >
                        <FontAwesomeIcon style={{marginRight:'3%'}}   icon={faSignOutAlt}></FontAwesomeIcon>Cerrar Sesión</p>
                </div> : false}
        </div>
    )


}
export default DropdownMenu;