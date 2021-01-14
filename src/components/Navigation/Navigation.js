/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{ display: 'flex', justifyContent: 'flex-end' }}
        className="white"
      >
        <p
          className="f3 link dim underline pa3 pointer"
          onClick={() => onRouteChange('home')}
        >
          Home
        </p>
        <p
          className="f3 link dim underline pa3 pointer"
          onClick={() => onRouteChange('leaderboard')}
        >
          Leaderboard
        </p>
        <p
          className="f3 link dim underline pa3 pointer"
          onClick={() => onRouteChange('signin')}
        >
          Sign Out
        </p>
      </nav>
    );
  }
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f3 link dim underline pa3 pointer"
        onClick={() => onRouteChange('leaderboard')}
      >
        Leaderboard
      </p>
      <p
        className="f3 link dim underline pa3 pointer"
        onClick={() => onRouteChange('signin')}
      >
        Sign In
      </p>
      <p
        className="f3 link dim underline pa3 pointer"
        onClick={() => onRouteChange('register')}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
