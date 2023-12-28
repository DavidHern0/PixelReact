import React, { useState } from 'react';
import Games from './components/games/Games';
import Credits from './components/games/credits/Credits';

function App() {
  const [selectedGame, setSelectedGame] = useState();
  const [componentHistory, setComponentHistory] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(<Games selectedGame={selectedGame} setSelectedGame={setSelectedGame} />);

  const simulateKeyEvent = (key) => {
    const event = new KeyboardEvent('keydown', {
      key,
      code: key,
      keyCode: key === 'ArrowUp' ? 38 : key === 'ArrowDown' ? 40 : key === 'ArrowLeft' ? 37 : key === 'ArrowRight' ? 39 : 0,
      which: key === 'ArrowUp' ? 38 : key === 'ArrowDown' ? 40 : key === 'ArrowLeft' ? 37 : key === 'ArrowRight' ? 39 : 0,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const handleButtonClick = (direction) => {
    simulateKeyEvent(`Arrow${direction}`);
  };

  const handleAButtonClick = () => {
    if (currentComponent.type === Games) {
      if (selectedGame) {
        setComponentHistory([...componentHistory, currentComponent]);
        if (selectedGame === 'CREDITS') {
          setCurrentComponent(<Credits />);
        }
      }
    }
  };

  const handleBButtonClick = () => {
    if (currentComponent.type != Games) {
      const previousComponent = componentHistory.pop();
      setComponentHistory([...componentHistory]);
      setCurrentComponent(previousComponent);
    }
  };

  return (
    <>
      <div className='arcade-machine'>
        <div className='screen'>
          {currentComponent.type === Games ? <Games selectedGame={selectedGame} setSelectedGame={setSelectedGame} /> : currentComponent}
        </div>

        <div className='arcade-buttons'>
          <div className="cross">
            <div className="cross-button"></div>
            <button className="cross-button top" onClick={() => handleButtonClick('Up')}></button>
            <button className="cross-button bottom" onClick={() => handleButtonClick('Down')}></button>
            <button className="cross-button left" onClick={() => handleButtonClick('Left')}></button>
            <button className="cross-button right" onClick={() => handleButtonClick('Right')}></button>
          </div>
          <div className='buttons'>
            <div className='button-left'>
              <button className='button-arcade' onClick={handleAButtonClick}>A</button>
            </div>
            <div className='button-right'>
              <button className='button-arcade' onClick={handleBButtonClick}>B</button>
            </div>
          </div>
        </div>
      </div>
      <div className='arcade-machine-shadow'>
      </div>
    </>
  );
}

export default App;