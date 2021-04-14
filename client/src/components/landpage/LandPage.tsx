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

    return (
        <div className="containerLand">
            <NavBar/>
            <img className="imgLand" src="https://images.unsplash.com/photo-1613258176465-eb77f3a050d2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"></img>
            
            <h1 className="titleLand">Bienvenidos a CompuHenry</h1>
            <p className="pLand">Siempre desde tu lado gamer</p>
            <Link to="/home"><button className="botonLand">Ir a la Tienda</button></Link>
              <footer className="footerLand">
                 <h2>Proximamente Redes</h2>
              </footer>  



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
                 {/*  <div  className="videoLand">
                   <ReactPlayer
                        url={url}
                        loop={true}
                        playing={true}
                        muted={true}
                        
                    /> 
                 </div> */}
            
        </div>
    )
}

export default VideoLand;