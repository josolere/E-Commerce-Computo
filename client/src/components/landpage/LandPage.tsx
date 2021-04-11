import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandPage.css';
import '../fonts/audiowide.regular.ttf';
import '../fonts/Baumans-Regular.ttf';
import '../fonts/Revalia-Regular.ttf';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import SearchBar from "../SearchBar/SearchBar"
import NavBar from "../NavBar/NavBar"
import { start } from 'node:repl';


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

const Pepe = gql` 
    query Pepe {
        getProducts {
            id
            name
        }
    }
`;

const VideoLand = () => {

    const { loading, error, data } = useQuery<DetailsData>(Pepe);

    const products = data?.getProducts

    let url = 'https://www.youtube.com/watch?v=2jpGbR9Dpl8&ab_channel=SantiRosales'

 
    return (
        <div>
            <div className="NavBarLanding">
                <h1 className="titleLanding">Titulo</h1>
                 <SearchBar/>
                 <div className="linksLanding">
                 <Link className="linksLanding" to="/Productos">Productos</Link>
                 <Link className="linksLanding" to="#">Ayuda</Link>
                 <Link className="linksLanding" to="/MiCuenta">Mi Cuenta</Link>
                 </div>
            </div>
          
            {/*Aca iria el import de la NavBar, configurar para que los links se adapten segun}
             el componente en el que se encuentra*/}
                   <ReactPlayer
                        url={url}
                        loop={true}
                        playing={true}
                        muted={true}
                    /> 
                
               {/*  <h4>Aca irian los productos</h4>
                {products && products.map((item) => {
                <div>
                    <p>{item.name}</p>
                    <Link to={{
                        pathname: '/Details',
                        state: {
                            id: item.id
                        }
                    }}>
                    <img src={item.image} alt=''/>
                    </Link>
                </div>
            })} */}
               {/*  <Link to='/Home' >
                    <img className='iconlanding' src={start} alt='' />
                </Link> */}
            
        </div>
    )
}

export default VideoLand