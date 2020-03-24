import React from 'react';
import { render } from 'react-dom';
import { Description } from './Description/Description';

class App extends React.Component {

  formatTime = time => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time % 60).toString();

    return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  };
  
  render() {

    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <Description />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">18:23</div>}
        {(status === 'off') && <button className="btn">Start</button>}
        {(status !== 'off') && <button className="btn">Stop</button>}
        <button className="btn btn-close">X</button>
      </div>
    )
  };
};

render(<App />, document.querySelector('#app'));
