import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Login</button>
            }
            <h1>Potluck</h1>
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name" value={this.state.user.displayName || this.state.user.email} />
                  <input type="text" name="username" placeholder="What dish are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Dish</button>
                </form>
              </section>
              <section className='display-item'>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>
                        brought by: {item.user}
                        {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                        <button onClick={() => this.removeItem(item.id)}>Remove Dish</button> : null}
                      </p>
                    </li>
                  )
                })}
              </section>
            </div>
          </div>
          :
          <div className='wrapper'>
            <p>You must be logged in to see the potluck list and add dishes of your own.</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
