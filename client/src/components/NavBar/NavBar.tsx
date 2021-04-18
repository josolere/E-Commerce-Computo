import React, {useState} from "react";
import SearchBar from "../SearchBar/SearchBar";
import navBar from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setFilter } from '../../redux/actions';

const NavBar = (): JSX.Element => {

  const [showadmin, setShowadmin] = useState(false)

  const dispatch = useDispatch()

  const opciones = ['Crear Producto', 'Crear Categoria']

  return (
    <>
      <div className={navBar.container}>
        <Link to='/'className={navBar.linksNav} > <h1 className={navBar.titleNav} >CompuHenry</h1> </Link>
        <SearchBar />
        {true? <Link onClick={() => {dispatch(setFilter(""))}} to="/Home" className = {navBar.linksNav}>Productos</Link>:false}  
          <div>
        <Link className={navBar.linksNav} to="/cart">
        <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} /></Link>
        <Link className={navBar.linksNav} to="/login"> Iniciar Sesion</Link>
        {false? <Link to="/cuenta" className = {navBar.linksNav}>Mi Cuenta</Link>:false}  
          </div>
          <div>
          <button className={navBar.linksNav} onClick={() =>setShowadmin(!showadmin)} >✓</button>
          {showadmin ? <Link className={navBar.linksNav} to='/Crear'><p>Crear</p></Link> : null}
          </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;
