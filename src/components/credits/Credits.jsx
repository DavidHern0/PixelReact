import { version } from '../../../package.json';
import './Credits.css';

const Credits = () => {
  return (
    <>
      <div className="credits-container">
        <div className="crawl">
          <h2>CREDITS</h2>
          <p>Made with React</p>
          <p>PIXELREACT v{version}</p>
          <p>View the source code on <a href="https://github.com/DavidHern0/PixelReact" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p>Made by: <a href="https://github.com/DavidHern0" target="_blank" rel="noopener noreferrer">DavidHern0</a></p>
          <p>PIXELREACT 2023© ALL RIGHTS RESERVED</p>
        </div>
        <h2 className='hidden-until'>PRESS 'B' TO RETURN</h2>
      </div>
    </>
  );
};

export default Credits;