import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  baseTime = 1200;
  baseInterval = 1000;
  statusOff = 'off';
  statusRest = 'rest';
  statusWork = 'work';

  state = {
    status: this.statusOff,
    time: 150,
    timer: null,
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time % 60).toString();

    return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  };

  step = () => {
    this.setState(prevState => ({
      time: prevState.time - 1,
    }));

    if (this.state.time === 0) {
      this.playBell();

      if (this.state.status === this.statusWork) {
        this.setState({
          status: this.statusRest,
          time: 20,
        });
      } else if (this.state.status === this.statusRest) {
        this.setState({
          status: this.statusWork,
          time: this.baseTime,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({
      status: this.statusWork,
      time: this.baseTime,
      timer: setInterval(this.step, this.baseInterval),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: this.statusOff,
      time: 0,
    });
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => {
    window.close();
  };


  render() {
    const { status, time, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>

        {status === this.statusOff &&
          <div className="description">
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>}

        {status === this.statusWork && <img src="./images/work.png" />}

        {status === this.statusRest && <img src="./images/rest.png" />}

        {status !== this.statusOff && <div className="timer">{this.formatTime(time)}</div>}

        {status === this.statusOff && <button className="btn" onClick={() => this.startTimer()}>Start</button>}

        {status !== this.statusOff && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}

        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};


render(<App />, document.querySelector('#app'));