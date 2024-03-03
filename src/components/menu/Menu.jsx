import React, { useEffect, useState } from 'react';
import ClickSound from '../../assets/ClickSound.mp3';
import { gamesList, translate } from '../../utilities/variables';
import './Menu.css';

const Menu = ({ selectedGame, setSelectedGame, selectedLanguage }) => {

  const clickSound = new Audio(ClickSound);
  clickSound.volume = 0.1;

  // Set first option in menu as selected
  useEffect(() => {
    setSelectedGame(gamesList[0]);
  }, [setSelectedGame]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  // Interact with menu
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
      clickSound.play();
      const currentIndex = gamesList.indexOf(selectedGame);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : gamesList.length - 1;
      setSelectedGame(gamesList[newIndex]);
    } else if (e.key === 'ArrowDown') {
      clickSound.play();
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
      <h2>{translate[selectedLanguage]["SELECT OPTION"]}</h2>
      <ul className="games-list">
        {gamesList.map((game) => (
          <li key={game} onClick={() => handleGameClick(game)} className={selectedGame === game ? 'selected' : ''}>
            {translate[selectedLanguage][game]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;