import React, { useState, useEffect } from 'react';
import Menu from './components/menu/Menu';
import Credits from './components/credits/Credits';
import StartScreen from './components/startScreen/StartScreen';

function App() {
  const [selectedGame, setSelectedGame] = useState();
  const [componentHistory, setComponentHistory] = useState([]); //go back component
  const [currentComponent, setCurrentComponent] = useState(<StartScreen />); //set component

  //Arrows working with click
  const simulateArrowsKeyEvent = (key) => {
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
    simulateArrowsKeyEvent(`Arrow${direction}`);
  };
  //

  //Handle 'A' button
  const handleAButtonClick = () => {
    if (currentComponent.type === Menu) {
      if (selectedGame) {
        setComponentHistory([...componentHistory, currentComponent]);
        if (selectedGame === 'CREDITS') {
          setCurrentComponent(<Credits />);
        }
      }
    }
  };

  //Handle 'B' button
  const handleBButtonClick = () => {
    if (currentComponent.type != Menu && currentComponent.type != StartScreen) {
      const previousComponent = componentHistory.pop();
      setComponentHistory([...componentHistory]);
      setCurrentComponent(previousComponent);
    }
  };

  //Handle KeyEvents button
  useEffect(() => {
    const handleActionEvent = (event) => {
      if (event.code === 'KeyZ' || event.key === ' ' || event.key === 'Enter') {
        handleAButtonClick();
      } else if (event.code === 'KeyX' || event.key === 'Backspace' || event.key === 'Escape') {
        handleBButtonClick();
      } else if (event.type === 'keydown') {
        if (currentComponent.type === StartScreen) {
          setCurrentComponent(<Menu selectedGame={selectedGame} setSelectedGame={setSelectedGame} />);
        }
      }
    };

    document.addEventListener('click', handleActionEvent);
    document.addEventListener('keydown', handleActionEvent);

    return () => {
      document.removeEventListener('click', handleActionEvent);
      document.removeEventListener('keydown', handleActionEvent);
    };
  }, [handleAButtonClick, handleBButtonClick]);

  return (
    <>
      <div className='arcade-machine'>
        <div className='screen'>
          {currentComponent.type === Menu ? <Menu selectedGame={selectedGame} setSelectedGame={setSelectedGame} /> : currentComponent}
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
              <button className='button-arcade' onClick={handleAButtonClick}><span>A</span></button>
            </div>
            <div className='button-right'>
              <button className='button-arcade' onClick={handleBButtonClick}><span>B</span></button>
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