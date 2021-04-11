import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandPage.css';
import '../fonts/audiowide.regular.ttf';
import '../fonts/Baumans-Regular.ttf';
import '../fonts/Revalia-Regular.ttf';
import { Link } from 'react-router-dom';
//import start from '../images/Landstart.png';
import { useQuery, gql } from '@apollo/client';
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

    let url = 'https://youtu.be/fslpPpjhRAk'

    const [play, setPlay] = useState(false)

    const [audio, setAudio] = useState(0.5)

    const playstop = () => {
        play ? setPlay(false) : setPlay(true);
    }

    const addaudio = () => {
        if (audio >= 0.9) {
            setAudio(0.9)
        }
        else {
            setAudio(audio + 0.1)
        }
    }

    const lessaudio = () => {
        if (audio <= 0.1) {
            setAudio(0.1)
        }
        else {
            setAudio(audio - 0.1)
        }
    }

    const mute = () => {
        setAudio(0.0)
    }

    return (
        <div className='LandPage' >
            <div className='alignlandpage' >
                <h1 className='titleland' >Hexabyte</h1>
                <div className='video'>
                    <ReactPlayer
                        url={url}
                        loop={true}
                        playing={play}
                        volume={audio}
                        width={1280}
                        height={575}
                    />
                </div>
                <div className='setbuttonvideos'>
                    <button className='buttonvideo' onClick={playstop}  >Play/Stop</button>
                    <button className='buttonvideo' onClick={addaudio} >Audio +</button>
                    <button className='buttonvideo' onClick={lessaudio} >Audio -</button>
                    <button className='buttonvideo' onClick={mute} >Mute</button>
                </div >
                <h4 className='henrycavill'>Find the computer of your dreams, be like Henry Cavill</h4>
                <h4>Aca irian los productos</h4>
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
            })}
               {/*  <Link to='/Home' >
                    <img className='iconlanding' src={start} alt='' />
                </Link> */}
            </div>
        </div>
    )
}

export default VideoLand