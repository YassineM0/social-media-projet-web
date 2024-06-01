"use client";


import "../game/Game.css";
import Keyboard from "../game/components/Keyboard";
import Board from "../game/components/Board";
import GameOver from "../game/components/GameOver";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "../game/Words";
import SideBar from "../components/SideBar";

export const AppContext = createContext();
function page() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = (keyVal) => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = (keyVal) => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i].toLowerCase();
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("NOT A WORD!");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <div className=" fixed overflow-y-auto h-screen" style={{ backgroundImage: "url('zlijj.png')" }}>
      <div className="w-3 fixed top-0 h-screen">
        <SideBar />
      </div>
      <div className="w-screen ml-4">
        <nav className="">
          <h1 className="text-black">Wordle</h1>
        </nav>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
            onSelectLetter,
            onDelete,
            onEnter,
            correctWord,
            setDisabledLetters,
            disabledLetters,
            gameOver,
            setGameOver,
          }}
        >
          <div className="game">
            <Board />
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default page;
