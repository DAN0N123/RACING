import { PlayerVehicle, BotVehicle } from './Vehicles'
import { useRef, useState } from 'react'
import road from "../assets/road.jpg"
import '../styles/board.css'

export default function Board(){
    const radius = 278;
    const playerSpeed = 3; 


    const playerRef = useRef(null);
    const [playerState, setPlayerState] = useState({ distance: 0, rotation: 0 });

    function movePlayer() {
        if(playerRef.current.classList.contains('hide')){
            playerRef.current.classList.remove('hide')
        }
        const newRotation = (playerState.rotation + playerSpeed) % 360;
        const newDistance = playerState.distance; 

        const x = Math.cos((newRotation * Math.PI) / 180) * radius;
        const y = Math.sin((newRotation * Math.PI) / 180) * radius;
        
        playerRef.current.style.transform = `rotate(${newRotation}deg) translate(${x}px, ${y}px) rotate(${newRotation}deg)`;
        console.log(playerRef.current)
        setPlayerState({ distance: newDistance, rotation: newRotation });
    }

    return (
        <div className='screen' onClick={movePlayer}>
            <div className="board">
                <img src={road} alt="image of round road" />
                <PlayerVehicle reference={playerRef}/>
                <BotVehicle />
            </div>
        </div>
    )
}