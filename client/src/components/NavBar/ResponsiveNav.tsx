import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faShoppingCart, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';
import { setFilter } from '../../redux/actions';
import { Cookies } from "react-cookie";
import NavBarItem from "./NavBarItem";
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER } from "../../gql/login";
import styles from './ResponsiveNav.module.scss'

interface user {
  currentUser: {
    name: string,
    password: string,
    email: string
  }
}

const NavBarResponsive = () => {

  const dispatch = useDispatch()

  let user: any = {}

  const { data } = useQuery<user>(ACTUAL_USER)

  user = data?.currentUser

  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [cookiess, setCookies] = useState<any>()

  const cookie = new Cookies

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  return (
    <div className={styles.header}>
        <div className={styles.logo_container}>
          <Link to='/' > <h1 className={styles.LogoCH} >CH</h1> </Link>
        </div>
        <div className={styles.searchBar} >
          <SearchBar />
        </div>
        <ul className={click ? styles.nav_options_active : styles.nav_options}>
          <li className={styles.optionCart} onClick={closeMobileMenu}>
            <Link className={styles.optionCartLink} to="/Carrodecompras">
              <p className={styles.optionCartLink}> <FontAwesomeIcon icon={faShoppingCart} style={{marginRight:'25%'}} /> {quantity}</p>
            </Link>
          </li>
          <li className={styles.optionProducts} onClick={closeMobileMenu}>
            {true ? <Link onClick={() => { dispatch(setFilter("")) }} to="/Home"
            >
              <p className={styles.optionProductsLink} ><FontAwesomeIcon icon={faListAlt} style={{marginRight:'5%'}} />Productos</p>
              </Link> : false}          
              </li>

          <div className={styles.optionLogin} onClick={closeMobileMenu}>
            {user?.name ? false :
              <Link to="/login">
                <p className={styles.optionLoginLink} > <FontAwesomeIcon icon={faUserAlt} style={{marginRight:'5%'}} />Iniciar sesión</p>
                </Link>}
            <p>{user?.name &&
              <NavBarItem info="Mi Cuenta"></NavBarItem>}</p>
          </div>
        </ul>
      <div className={styles.mobile_menu} onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default NavBarResponsive;
