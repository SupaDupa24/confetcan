import React from 'react';
import { Canvas } from './components/Canvas/Canvas';
import Navigation from './components/Navigation/Navigation';
import { Greeting } from './components/Greeting/Greeting';
import { Jumbo } from './components/Jumbo/Jumbo';
import './App.css';


const initialState = {
  input: '',
  
 
  route: 'intro',
  showJumbo: false,
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= initialState;
  }

  



  onRouteChange = (route) => {
    if (route === 'intro') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://127.0.0.1:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://127.0.0.1:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

 

  render() {
  return (
    <div className="App">
      <Canvas />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.isSignedIn} />
      <Jumbo>
        <Greeting onClick={this.onButtonSubmit} />
      </Jumbo>


      
    </div>
  );
}
}

export default App;
