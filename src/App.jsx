import React, { isValidElement, useState } from "react";

import { Board } from "./components/Board";
import { Btnm } from "./components/Btnm";
import { ScoreBoard } from "./components/ScoreBoard";
import { ToggleSwitch } from "./components/ToggleSwitch";
import { Navbar } from "./components/Navbar";
import Swal from "sweetalert2";
import './App.css';
import './index.css';

const App = () => {
  const [sizet,setSiz] = useState(3);
  const click = () =>{
    setSiz(val)
    setBox(val*val)
    setBoard(Array(val*val).fill(null))
  }
  
  const [val, setVal] = useState(3)

  const inu = event =>{
    //alert(event.target.value)
    setVal(event.target.value)
  }
  const [box,setBox] = useState(3*3);
  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(box).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([Array(box).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {   
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";   
      } else {
        return value;
      }
    })
    //playLog(board);
    setBoard(updatedBoard);
    playLog(updatedBoard);
    const nextHistory = [...history.slice(0, currentMove + 1), updatedBoard];
    setHistory(nextHistory); 
    setCurrentMove(nextHistory.length - 1);
    
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        Swal.fire(
          'O Win!',
          'You clicked the button!'
        )
        setScores({ ...scores, oScore })   
      } else {
        let { xScore } = scores;
        xScore += 1;
        Swal.fire(
          'X Win!',
          'You clicked the button!'
        )
        setScores({ ...scores, xScore })
      }
    }
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    const WIN_CONDITIONS = [
      [0, 1, 2],
      [0,val*1,val*2],
      [0,val*1+1,(val*2)+2],
      [2,val*1+1,val*2]
    ]
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      for(let j = 0; j< val-2;j++){
        for(let k =0;k< val*val; k+=3){
          if (board[x+j+k] && board[x+j+k] === board[y+j+k] && board[y+j+k] === board[z+j+k]) {
            setGameOver(true);  
            return board[x+j+k];
          }
        }
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(val*val).fill(null));
    setHistory([Array(box).fill(null)]);
  }
  
  const playLog = () =>{
    setHistory(board);
  }

  function jumpTo(nextMove) {
    setBoard(history[nextMove])
    setHistory(history.slice(0,nextMove+1))
  }

  const moves = history.map((box, move) => {
    let description;
    if (move > 0) {
      description = 'Move-' + move;
    } else {
      description = 'Reset';
    }
    return (
      <li key={move}>
        <button className="ok-btn" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="app">
      <div className="top">
        {/* <Navbar></Navbar> */}
        <h1>XO GAME</h1>
        {/* <ToggleSwitch></ToggleSwitch> */}
        <p>  Board Size <input value={val} onInput={inu} /><Btnm test={click}></Btnm> </p>
      </div>
      <div className="middle">
        <ScoreBoard scores={scores} xPlaying={xPlaying} />
        <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} size={sizet}/>
      </div>
      <div className="bottom">
        {moves}
      </div>
      
    </div>
  );
}

export default App;