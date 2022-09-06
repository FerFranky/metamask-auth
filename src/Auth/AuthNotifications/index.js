import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState }  from 'react';

async function checkIfWalletIsConnected(onConnected) {
  let accounts = '';
  if (window.ethereum) {
    accounts = await window.ethereum.request({
      method: "eth_accounts",
    })
    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
    }
  }
}
let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 10000);
}

function mandarMensaje() {
  var accounts = window.ethereum.request({
    method: "eth_accounts",
  }).then(function(response) {
    if (response[0] === undefined) {
      if (localStorage.getItem("autenticated")=="ok") {
        localStorage.setItem("autenticated", "no_ok");
        // toast('User denied message signature.', {
        //   position: "bottom-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }
    }else {
      localStorage.setItem("autenticated", "ok");
    }
  })
}

function AuthNotifications() {
  localStorage.setItem("autenticated", 'no_ok');
  repetirCadaSegundo()
  return (
    <h1>
    </h1>
    // <ToastContainer />
  );
}

export { AuthNotifications };
