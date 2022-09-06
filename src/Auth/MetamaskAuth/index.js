import React, { useEffect, useState, useRef } from "react";
import styles from "./MetamaskAuth.css";
import image from "../../assets/metamask.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then(console.log("xD Hola"))
    .catch((error) => {
      if (error.code === 4001) {
        toast("No fue posible autenticar al usuario.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error(error);
      }
    });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  let accounts = "";
  if (window.ethereum) {
    accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((error) => {
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
function MetamaskAuth({ sign, msg, address, signature }) {
  const text_area = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    sign(text_area.current.value);
  };
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);
  console.log(userAddress);
  return userAddress ? (
    <div className={"row"}>
      <div className={"col-6"}>
        <h3>Wallet conectada </h3>
        <h6>
          <Address userAddress={userAddress} />
        </h6>

        <h3>Ingresa mensaje a firmar</h3>
        <textarea className={"form-control"} ref={text_area}></textarea>
        <br />
        <button
          className={"btn btn-outline-primary btn-lg"}
          type="submit"
          onClick={handleSubmit}
        >
          Generar firma
        </button>
        <br />
        <br />
      </div>
      <div className={"col-6"}>
        <h4>Firma generada: </h4>
        <textarea
          className={"form-control"}
          value={signature}
          readOnly
          rows={"8"}
        ></textarea>
      </div>
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
}

export { MetamaskAuth };

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }

  return (
    <React.Fragment>
      <button className={"btn-Modal"} onClick={() => connect(setUserAddress)}>
        <img className={"Image-Modal"} src={image} />
        <h1>MetaMask</h1>
        <h4>Connect to your MetaMask Wallet</h4>
      </button>
      <ToastContainer />
    </React.Fragment>
  );
}

function Address({ userAddress }) {
  return <span className={styles.address}>{userAddress}</span>;
}
