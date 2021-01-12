import React from 'react';
import Home from '../home/Home';
import Leaderboard from '../leaderboard/Leaderboard';
import Logo from '../logo/Logo';
import Register from '../register/Register';
import SignIn from '../sign-in/SignIn';

const Container = ({ route, user, onRouteChange, loadUser, setUser }) => {
  // Home page
  if (route === 'home') {
    return (
      <>
        <Logo />
        <Home user={user} setUser={setUser} />
      </>
    );
  }

  // Leaderboard page
  if (route === 'leaderboard') {
    return (
      <>
        <Logo />
        <Leaderboard />
      </>
    );
  }

  // Register page
  if (route === 'register') {
    return (
      <>
        <Logo />
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      </>
    );
  }

  // Sign in page
  return (
    <>
      <Logo />
      <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
    </>
  );
};

export default Container;
