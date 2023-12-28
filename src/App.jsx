import Games from './components/games/Games';

function App() {

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

  return (
    <>
      <div className='arcade-machine'>
        <div className='screen'>
          <Games />
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
              <button className='button-arcade'>A</button>
            </div>
            <div className='button-right'>
              <button className='button-arcade'>B</button>
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