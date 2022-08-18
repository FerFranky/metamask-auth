
import React, {useState} from 'react';
import './Login.css';
import { Button, Card, Modal } from "react-bootstrap";
import { TbCurrencyEthereum } from "react-icons/tb";
import { MetamaskAuth } from '../MetamaskAuth';
import image from "../../assets/metamask.png";
function Login() {
  // <MetamaskAuth />
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <MetamaskAuth />
        </Modal.Body>
      </Modal>
    </Card>
    </React.Fragment>
  );
}

export { Login };
