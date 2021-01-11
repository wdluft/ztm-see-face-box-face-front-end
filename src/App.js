/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import Leaderboard from './components/leaderboard/Leaderboard';

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
      value: '#ffffff',
    },
  },
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({ ...initialUserState });

  const resetState = () => {
    setInput(() => '');
    setImageUrl(() => '');
    setBox(() => ({}));
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

  const onInputChange = (e) => {
    setInput(() => e.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(() => box);
  };

  const onPictureSubmit = () => {
    setImageUrl(() => input);

    // set server url env variable on heroku to https://ancient-island-08121.herokuapp.com
    fetch(`${process.env.REACT_APP_SERVER_URL}/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch((err) => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = async (newRoute) => {
    if (newRoute === 'home') {
      setIsSignedIn(() => true);
    } else {
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
        onRouteChange={onRouteChange}
        onInputChange={onInputChange}
        onPictureSubmit={onPictureSubmit}
        imageUrl={imageUrl}
        box={box}
        loadUser={loadUser}
        user={user}
      />
    </div>
  );
}

const Container = ({
  route,
  onRouteChange,
  onInputChange,
  onPictureSubmit,
  imageUrl,
  box,
  loadUser,
  user,
}) => {
  if (route === 'home') {
    return (
      <>
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onPictureSubmit={onPictureSubmit}
        />
        <FaceRecognition imageUrl={imageUrl} box={box} />
      </>
    );
  }
  if (route === 'leaderboard') {
    return (
      <>
        <Logo />
        <Leaderboard />
      </>
    );
  }
  if (route === 'register') {
    return (
      <>
        <Logo />
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      </>
    );
  }
  return (
    <>
      <Logo />
      <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
    </>
  );
};

export default App;
