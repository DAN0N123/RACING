/* eslint-disable react/prop-types */
import { PlayerVehicle, BotVehicle } from './Vehicles'
import { useEffect, useRef, useState} from 'react'
import road from "../assets/road.jpg"
import '../styles/board.css'
import InputBox from './InputBox'




export default function Board(){
    const [runInterval, setRunInterval] = useState(false);
    const [gameInfo, setGameInfo] = useState({started: false, username: '', difficulty: 'easy', over: false, winner: null})
    const radius = 278;
    const playerSpeed = 3; 
    let botSpeed = 0.2;
    const intervalRef = useRef(null);

    useEffect(() => {
        if (runInterval) {
          intervalRef.current = setInterval(() => {
            moveBot()
          }, 16);
        }
    
        return () => {
          clearInterval(intervalRef.current);
        };
      }, [runInterval]);
    
    

    switch (gameInfo.difficulty) {
        case 'EASY':
            botSpeed = 0.2
            break;
        case 'MEDIUM':
            botSpeed = 0.3;
            break;
        case 'HARD':
            botSpeed = 0.35;
            break;
        case 'IMPOSSIBLE':
            botSpeed = 1;
    }

    const playerRef = useRef(null);
    const [playerState, setPlayerState] = useState({ move: 0, rotation: 0, lap: 0});

    const botRef = useRef(null)
    const [botState, setBotState] = useState({rotation: 0, interval: null, lap: 0});

    function moveBot() {
        if(gameInfo.started && !gameInfo.over){
            setBotState(prevBotState => {
                try {
                let newRotation = (prevBotState.rotation + botSpeed) % 360;
                let newLap = prevBotState.lap;
                if (newRotation >= 180) { 
                    newRotation = 0;
                    newLap++;
                    if(newLap === 5){
                        winGame('AI')
                    }
                }
                const x = Math.cos((newRotation * Math.PI) / 180) * radius;
                const y = Math.sin((newRotation * Math.PI) / 180) * radius;
                botRef.current.style.transform = `rotate(${newRotation}deg) translate(${x}px, ${y}px) rotate(${newRotation}deg)`;
                if (botRef.current.classList.contains('hide')) botRef.current.classList.remove('hide');
                return {...botState, rotation: newRotation, lap: newLap };
                }catch(error){ console.log(error) }
                
            });
        }
        }
        
    function winGame(who){
        setGameInfo({...gameInfo, over: true, winner: who, started: false, cycle: null})
        setRunInterval(false);
    }

    function movePlayer() {
        if(playerRef.current.classList.contains('hide')){
            playerRef.current.classList.remove('hide') 
            setRunInterval(true)
        }
        let newMove = playerState.move + 1
        let newLap = playerState.lap 
        if(newMove === 60){
            newMove = 0;
            newLap++
            if(newLap === 5){
                return winGame(gameInfo.username)
            }
        }
        const newRotation = (playerState.rotation + playerSpeed) % 360;

        const x = Math.cos((newRotation * Math.PI) / 180) * radius;
        const y = Math.sin((newRotation * Math.PI) / 180) * radius;
        
        playerRef.current.style.transform = `rotate(${newRotation}deg) translate(${x}px, ${y}px) rotate(${newRotation}deg)`;
        setPlayerState({...playerState, move: newMove, rotation: newRotation, lap: newLap});
    }

    const [inputs, setInputs] = useState([
        { id: 1, value: 'EASY', selected: true },
        { id: 2, value: 'MEDIUM', selected: false },
        { id: 3, value: 'HARD', selected: false },
        { id: 4, value: 'IMPOSSIBLE', selected: false }
      ])
    
    function handleInputClick(id){
    setInputs(inputs.map(input =>
        input.id === id ? { ...input, selected: true } : { ...input, selected: false }
    ));
    }

    function handleFormSubmit(e){
        e.preventDefault()
        const myForm = e.target;
        const username = myForm.querySelector('.usernameInput').value
        let difficulty = null;
        for(const input of inputs){
            if (input.selected === true){
                difficulty = input.value
            }
        }
        setGameInfo({started:true, username: username, difficulty: difficulty})
    }

    function playAgain() {
        setGameInfo({started: false, username: '', difficulty: 'easy', over: false, winner: null})
        setPlayerState({ move: 0, rotation: 0, lap: 0});
        setBotState({rotation: 0, lap: 0});
    }
    if(!gameInfo.over){
        if (gameInfo.started) {return (
            <div className='screen' onClick={movePlayer}>
                <div className="scoreboard">
                    <div className="playerInfo info">
                        <div className="name"> {gameInfo.username}:</div> 
                        <div className="lap"> {playerState.lap} </div>
                    </div>
                    <div className="botInfo info"> 
                        <div className="name">AI:</div> 
                        <div className="lap">{botState.lap}</div>
                    </div>
                </div>
                <div className="board">
                    <img src={road} alt="image of round road" />
                    <PlayerVehicle reference={playerRef}/>
                    <BotVehicle reference={botRef}/>
                </div>
            </div>
        )} else return(
            <div className="start">
                <form className='startForm' onSubmit={handleFormSubmit}>
                    <input type="text" placeholder='Your username:' className='usernameInput' required/>
    
                    <div className="boxInputs">
                        {inputs.map(input => (
                            <InputBox
                            key={input.id}
                            value={input.value}
                            selected={input.selected}
                            onClick={() => handleInputClick(input.id)}
                            />
                        ))}
                    </div>
                    <button type='submit'> PLAY </button>
                </form>
            </div>
        )
    }else return(
        <div className="end">
            <div className="endScreen shaker">
                <div className="winner">{gameInfo.winner} won!</div>
                <button className="playAgain" onClick={playAgain}> PLAY AGAIN</button>
            </div>
        </div>
        )
        
    
}