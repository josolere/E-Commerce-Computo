import { Link } from "react-router-dom";
import styles from "./Dropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faFolderPlus,
  faUserMinus,
  faUnlock,
  faUserPlus,
  faList,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { BiUserCircle } from "react-icons/bi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaCashRegister, FaShippingFast, FaUserPlus } from "react-icons/fa";
import { useMutation, useQuery, gql } from "@apollo/client";
import { ACTUAL_USER, LOGOUT } from "../../gql/login";

interface user {
  currentUser: {
    name: string;
    password: string;
    email: string;
  };
}

function DropdownMenu(props: any) {
  const [out, nothing] = useMutation(LOGOUT);

  let user: any = {};

  const { data } = useQuery<user>(ACTUAL_USER);

  user = data?.currentUser;

  const [cookies, setCookie, removeCookie] = useCookies(["User"]);

  const logoutchange = () => {
    out();
    //Nos desuscribimos del localStorage
    localStorage.setItem("productsLocal", "");
    localStorage.setItem("priceSubTotal", "");
    localStorage.setItem("quantity", "");

    window.location.href = "http://localhost:3000/Home";
  };

  return (
    <div className={styles.dropdown} onMouseLeave={props.data}>
      <Link className={styles.profile} to="/EditarCuenta">
        <BiUserCircle className={styles.iconButton}></BiUserCircle>
        {user?.name}
      </Link>
      {user?.privilege === "user" ? (
        <div className={styles.orderdiv}>
          <p>
            <Link to={`/Ordenes/Usuario`}>
              <FaShippingFast className={styles.icon}></FaShippingFast>Mis
              Pedidos
            </Link>
          </p>
          <p>
            <Link to="/ResetContraseña">
              <FontAwesomeIcon icon={faUnlock} className={styles.icon} />{" "}
              Cambiar contraseña
            </Link>{" "}
          </p>
          <p>
            <Link to="/BorrarUsuario">
              <FontAwesomeIcon icon={faUserMinus} className={styles.icon} />{" "}
              Eliminar mi cuenta
            </Link>
          </p>
          {/*  <p >
            <RiQuestionnaireFill className={styles.icon}></RiQuestionnaireFill>
            Preguntas
          </p> */}

          <p style ={{marginLeft:"1.4rem"}} onClick={logoutchange}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faSignOutAlt}
            ></FontAwesomeIcon>
            Cerrar Sesión
          </p>
        </div>
      ) : (
        false
      )}
      {user.privilege === "admin" ? (
        <div className={styles.orderdiv}>
          <Link to="/CrearAdministrador">
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUserPlus}
            ></FontAwesomeIcon>{" "}
            Asignar Administrador
          </Link>

          <Link to="/CrearProducto">
            <FontAwesomeIcon
              className={styles.icon}
              icon={faCashRegister}
            ></FontAwesomeIcon>
            Añadir Producto
          </Link>

          <Link to="/CrearCategoria">
            <FontAwesomeIcon
              className={styles.icon}
              icon={faList}
            ></FontAwesomeIcon>
            Añadir Categoría
          </Link>

          <Link to="/Ordenes">
            <FaShippingFast className={styles.icon}></FaShippingFast>Ordenes
          </Link>

          <p style ={{marginLeft:"0.5rem"}} onClick={logoutchange}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faSignOutAlt}
            ></FontAwesomeIcon>
            Cerrar Sesión
          </p>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
export default DropdownMenu;
