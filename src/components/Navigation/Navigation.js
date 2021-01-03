/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className="f3 link dim black underline pa3 pointer"
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
        className="f3 link dim black underline pa3 pointer"
        onClick={() => onRouteChange('signin')}
      >
        Sign In
      </p>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => onRouteChange('register')}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
