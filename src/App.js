import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Potluck</h1>
          </div>
        </header>
        <div className='container'>
          <section className='add-item'>

          </section>
        </div>
        <section className='display-item'>
          <div className='wrapper'>
            <ul>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
