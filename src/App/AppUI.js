import './App.css';
import React from 'react';
import { MetamaskAuth } from '../Auth/MetamaskAuth';
import { Login } from '../Auth/Login';

function AppUI() {

  // <MetamaskAuth />
  return (
    <React.Fragment>
    <Login />
    </React.Fragment>
  );
}

export { AppUI };
