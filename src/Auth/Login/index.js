
import React, {useState} from 'react';
import './Login.css';
import { Button, Card, Modal } from "react-bootstrap";
import { TbCurrencyEthereum } from "react-icons/tb";
import { MetamaskAuth } from '../MetamaskAuth';
import { MetaMaskSign } from '../MetaMaskSign';
import { ethers } from "ethers";
import image from "../../assets/metamask.png";
function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(MetaMaskSign);
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState(undefined);
  const [signature, setSignature] = useState("");
  const sign = async (message) => {
    try {
      if (!window.ethereum) {
        alert("Debes instalar metamask");
      }
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const signature = await signer.signMessage(message);
      setMsg(message);
      setAddress(address);
      setSignature(signature);
      console.log(address);
    } catch (error) {
      console.log(error);
    }
    console.log(message);
  };
  return (
    <React.Fragment>
    <Card body className={'Login'}>
      <h1>Login to MyAPP</h1>
      <h6>CREATE NEW ACCOUNTS WITH A WALLET</h6>
      <Button className={'btn-Login'} variant="info" size="lg" onClick={handleShow}>
      <TbCurrencyEthereum className={'icon-Login'} />
          Connect Wallet
      </Button>
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className={'Login-Modal'}>
          
            <MetamaskAuth sign={sign} msg={msg} address={address} signature={signature} />
        </Modal.Body>
      </Modal>
    </Card>
    </React.Fragment>
  );
}

export { Login };
