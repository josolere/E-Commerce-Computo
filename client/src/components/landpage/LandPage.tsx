import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandPage.css'
import '../fonts/audiowide.regular.ttf';
import '../fonts/Baumans-Regular.ttf';
import '../fonts/Revalia-Regular.ttf';
import { Link } from 'react-router-dom'
import start from '../images/Landstart.png'

const VideoLand = () => {

    let urltest = 'video/LandingVideo2.mp4'

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
                        url={urltest}
                        playing={play}
                        volume={audio}
                        width={1200}
                        height={800}
                    />
                </div>
                <div className='setbuttonvideos'>
                    <button className='buttonvideo' onClick={playstop}  >Play/Stop</button>
                    <button className='buttonvideo' onClick={addaudio} >Audio +</button>
                    <button className='buttonvideo' onClick={lessaudio} >Audio -</button>
                    <button className='buttonvideo' onClick={mute} >Mute</button>
                </div >
                <h4 className='henrycavill'>Find the computer of your dreams, be like Henry Cavill</h4>
                <Link to='/Home' >
                    <img className='iconlanding' src={start} alt='' />
                </Link>
            </div>
        </div>
    )
}

export default VideoLand