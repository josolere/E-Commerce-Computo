import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';
import { setFilter } from '../../redux/actions';
import { Cookies } from "react-cookie";
import NavBarItem from "./NavBarItem";
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER } from "../../gql/loginGql";

interface user {
  currentUser: {
      name: string,
      password: string,
      email: string
  }
}

const NavBar = (): JSX.Element => {
  const dispatch = useDispatch()

  let user:any = {}

  const {data} = useQuery<user>(ACTUAL_USER)

  user = data?.currentUser

  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [cookiess, setCookies ] = useState<any>()
 
  const cookie = new Cookies


  useEffect(() => {
    setCookies(cookie.get('User'))
  }, [])


  const handleRedirCart = () => {
    window.location.href = "http://localhost:3000/Carrodecompras"
  }

  const handleRedirProducts= () => {
    dispatch(setFilter(""))
    window.location.href = "http://localhost:3000/Home"
  }


  return (
    <>
      <div className={navBar.container}>
        <Link to='/'> <h1 className={navBar.titleNav} >CH</h1> </Link>
        <SearchBar />

        <Link className={navBar.linkCart} to="/Carrodecompras" onClick={handleRedirCart}>
        <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />
          <p>{quantity}</p>
         {/*  <span>${new Intl.NumberFormat().format(idsProducts)}</span> */}

        </Link>
        
        <div className={navBar.containerLinks}>

        <Link to='/armatupc'> <p className={navBar.linksNav} >Armá tu PC</p> </Link>

        {true ? <a onClick={ handleRedirProducts }><p className={navBar.linksNav}>Productos</p></a> : false}

        <div>

          {user?.name ? false : <Link className={navBar.linksNav} to="/login"><p>Iniciar Sesion</p></Link>}
         
        </div>
        
          <p>{user?.name && <NavBarItem info= "Mi Cuenta"></NavBarItem>  }</p>
        
        </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;
