import './App.css';
import { AppUI } from './AppUI';

let identificadorTiempoDeEspera;

function temporizadorDeRetraso() {
  identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 10000);
}

function funcionConRetraso() {
  console.log("Han pasado 3 segundos.");
  return temporizadorDeRetraso()
}
function App() {
  // temporizadorDeRetraso()
  return (
    <AppUI />
  );
}

export default App;
