import React, { useContext } from "react";
import { AppContext } from "../../wordle/page.jsx";

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You win bro" : "You failed bro"}</h3>
      <h1>Correct : {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
