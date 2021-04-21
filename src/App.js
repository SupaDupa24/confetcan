import React from 'react';
import { Canvas } from './components/Canvas/Canvas';
import Navigation from './components/Navigation/Navigation';
import { Greeting } from './components/Greeting/Greeting';
import { Form } from './components/Form/Form';
import './App.css';


const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
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
    age: 0,
    pet: ''
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= initialState;
  }

  componentDidMount(){
    this.setState({showJumbo:true})
  }



  onRouteChange = (route) => {
    if (route === 'intro') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
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
      <Greeting />
      <Form />


      
    </div>
  );
}
}

export default App;
