import React from 'react';
import { Canvas } from './components/Canvas/Canvas';
import Navigation from './components/Navigation/Navigation';
import { Jumbo } from './components/Jumbo/Jumbo';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';


const initialState = {
  input: '',
  route: 'intro',
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


  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }

  



  onRouteChange = (route) => {
    if (route === 'intro') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }
 

  render() {
  return (
    <div className="App">
      <Canvas />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.isSignedIn} />
      
      { this.state.route === 'intro' ?
      <Jumbo>
         { 
          this.state.isProfileOpen &&
            <Modal>
              <Profile isProfileOpen={this.isProfileOpen} toggleModal={this.toggleModal} user={this.state.user} loadUser={this.loadUser} />
            </Modal>
           }
        
      </Jumbo> : 
      (
        this.state.route === 'signin' ?
       <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )
      }

      
    </div>
  );
}
}

export default App;
