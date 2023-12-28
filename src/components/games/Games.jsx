import React, { useState, useEffect } from 'react';
import './Games.css';

const Games = () => {
  const gamesList = ["a", "b", "c"];
  const [selectedGame, setSelectedGame] = useState(gamesList[0]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
      const currentIndex = gamesList.indexOf(selectedGame);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : gamesList.length - 1;
      setSelectedGame(gamesList[newIndex]);
    } else if (e.key === 'ArrowDown') {
      const currentIndex = gamesList.indexOf(selectedGame);
      const newIndex = currentIndex < gamesList.length - 1 ? currentIndex + 1 : 0;
      setSelectedGame(gamesList[newIndex]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedGame]);

  return (
    <>
      <h2>SELECT GAME</h2>
      <ul className="games-list">
        {gamesList.map((game) => (
          <li key={game} onClick={() => handleGameClick(game)} className={selectedGame === game ? 'selected' : ''}>
            {game}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Games;