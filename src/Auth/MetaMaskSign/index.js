
import React, {useState} from 'react';
import { ethers } from "ethers";
function MetaMaskSign() {
  
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
            Mensaje {msg}
            Direccion {address}
            Firma
             <textarea value={signature} placeholder={'Waiting for value'}></textarea>
          
    </React.Fragment>
  );
}

export { MetaMaskSign };
