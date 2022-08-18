import React, { useEffect, useState } from "react";
import styles from "./MetamaskAuth.css";
import image from "../../assets/metamask.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  }).then(console.log('xD Hola')).catch((error) => {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      toast('No fue posible autenticar al usuario.', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert('User rejected the request.')
      return(<h1>MetaMask</h1>);
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
    }
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  let accounts = '';
  if (window.ethereum) {
    await window.ethereum.request({
      method: "eth_accounts",
    }).catch((error) => {
      // EIP-1193 userRejectedRequest error
      // console.log('Please connect to MetaMask.');

    });
    console.log(accounts);
    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}
function MetamaskAuth() {
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  // useEffect(() => {
  //   onAddressChanged(userAddress);
  // }, [userAddress]);
  console.log(userAddress);
  return userAddress ? (
    <div>
    Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress}/>
  );
}

export { MetamaskAuth };



function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
      <button className={styles.button}>
      Connect to MetaMask
      </button>
      </a>
    );
  }


  return (
    <React.Fragment>
    <button className={'btn-Modal'} onClick={() => connect(setUserAddress)}>
    <img className={'Image-Modal'} src={image} />
    <h1>MetaMask</h1>
    <h4>Connect to your MetaMask Wallet</h4>
    </button>
    <ToastContainer />
    </React.Fragment>

    // <button className={styles.button} onClick={() => connect(setUserAddress)}>
    //   Connect to MetaMask
    // </button>
  );
}


function Address({ userAddress }) {
  return (
    <span className={styles.address}>{userAddress}</span>
    // <span className={styles.address}>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}
