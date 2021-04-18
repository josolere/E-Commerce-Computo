import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandPage.css';
import '../fonts/audiowide.regular.ttf';
import '../fonts/Baumans-Regular.ttf';
import '../fonts/Revalia-Regular.ttf';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavBar from "../NavBar/NavBar"



interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}


const VideoLand = () => {

    return (
        <div className="containerLand">
            <img className="imgLand" src="https://images.unsplash.com/photo-1613258176465-eb77f3a050d2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"></img>
            
            <h1 className="titleLand">Bienvenidos a CompuHenry</h1>
            <p className="pLand">Siempre desde tu lado gamer</p>
            <Link to="/home"><button className="botonLand">Ir a la Tienda</button></Link>
              <footer className="footerLand">
                 <h2>Proximamente Redes</h2>
              </footer>  
        </div>
    )
}

export default VideoLand;