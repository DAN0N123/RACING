import { useState, useRef, useEffect} from "react";
import red from '../assets/redDown.png'
import black from '../assets/black.png'
import '../styles/vehicles.css'




export function PlayerVehicle({reference}) {
    const playerRef = reference;

    return (
        <div className="car player hide" ref={playerRef}>
            <img src={red} alt="image of red car" className="vehicle"/>
        </div>
    )
}


export function BotVehicle() {
    const [state, setState] = useState( {distance: 0, rotation: 0})

    const botRef = useRef(0)

    return (
        <div className="car bot" ref={botRef}>
            <img src={black} alt="image of black car" className="vehicle" />
        </div>
    )
}