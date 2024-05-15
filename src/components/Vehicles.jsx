/* eslint-disable react/prop-types */
import red from '../assets/redDown.png'
import black from '../assets/blueDown.png'
import '../styles/vehicles.css'




export function PlayerVehicle({reference}) {
    const playerRef = reference;

    return (
        <div className="car player hide" ref={playerRef}>
            <img src={red} alt="image of red car" className="vehicle"/>
        </div>
    )
}


export function BotVehicle( {reference}) {
    const botRef = reference;

    return (
        <div className="car bot hide" ref={botRef}>
            <img src={black} alt="image of black car" className="vehicle" />
        </div>
    )
}