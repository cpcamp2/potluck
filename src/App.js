import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: ''
    }
  }
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
            <form>
              <input type='text' name='username' placeholder='Enter your name' onChange={this.handleChange} value={this.state.username} />
              <input type='text' name='currentItem' placeholder='Enter your dish' onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Dish</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
