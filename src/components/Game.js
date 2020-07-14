import React,{useState} from 'react'
import { calculatorWinner } from "../helper"
import Board from './Board';
 
function Game() {
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber,setStepNumber] = useState(0);
    const [xIsNext,setXisNext] = useState(true);
    const winner = calculatorWinner(history[stepNumber]);
    const x = xIsNext ? "X" : "O";

    const handleClick =(i) => {
         const historyPoint = history.slice(0, stepNumber + 1);
         const current = historyPoint[stepNumber];
         const squares = [...current];

         if(winner || squares[i])
            return;
        squares[i] = x;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    }

    const renderMoves = () => 
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Go to start";
        return (
            <li key={move} >
                <button onClick={() => jumpTo(move)}>{destination}</button>
            </li>
        )   
        })

    return (
        <>
            <h3 className={"heading"}>Tic Tac Toe Game</h3>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className={"sub-head"}>
            <h3>{winner ? "Winner : " + winner : (stepNumber < 9 ? "Next Player : " + x : "No Winner")}</h3>
            </div>
            <div className="info-wrapper">
                    {renderMoves()}
            </div>
        </>
    )
}

export default Game
