import './App.css';
import React from 'react';
import { MetamaskAuth } from '../Auth/MetamaskAuth';
import { Login } from '../Auth/Login';

function AppUI() {
  let identificadorTiempoDeEspera;

  function temporizadorDeRetraso() {
    identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 10000);
  }

  function funcionConRetraso() {
    console.log("Han pasado 3 segundos.");
    return temporizadorDeRetraso()
  }

  // <MetamaskAuth />
  return (
    // temporizadorDeRetraso()
    <React.Fragment>
    <Login />
    </React.Fragment>
  );
}

export { AppUI };
