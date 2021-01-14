/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Container from './components/container/Container';

const initialUserState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: '',
};

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#000000',
    },
    size: {
      value: 2,
    },
    line_linked: {
      color: '#000000',
    },
  },
};

function App() {
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({ ...initialUserState });

  const resetState = () => {
    setUser(() => ({ ...initialUserState }));
  };

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === 'home') {
      setIsSignedIn(() => true);
    } else if (newRoute === 'signin' || newRoute === 'register') {
      setIsSignedIn(() => false);
      resetState();
    }
    setRoute(() => newRoute);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Container
        route={route}
        user={user}
        setUser={setUser}
        loadUser={loadUser}
        onRouteChange={onRouteChange}
      />
    </div>
  );
}

export default App;
