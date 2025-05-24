const socket = new WebSocket(
  "wss://s14655.nyc1.piesocket.com/v3/1?api_key=HfzN46IBGbvWsdXvqz2VHLupJtADPyodwpkLSZOk&notify_self=1"
);
const epcInput = document.getElementById("epcInput").value;
const mensagemStatus = document.getElementById("mensagemStatus");
const mandaEpcButton = document.getElementById("mandaEpcButton");

function conectarWebSocket() {
  displayMessage("Conectando ao WebSocket...", "INFO");

  socket.onopen = () => {
    displayMessage("Conectado ao WebSocket!", "SUCCESS");
    mandaEpcButton.disabled = false;
  };

  socket.onclose = () => {
    displayMessage("Conexão fechada. Tentando reconectar...", "ERROR");
    mandaEpcButton.disabled = true;
    setTimeout(conectarWebSocket, 5000);
  };

  ws.onerror = (error) => {
    displayMessage("Erro no WebSocket. Verifique o console.", "error");
    console.error("WebSocket Error:", error);
  };
}

async function enviarEpc() {
  epcCode = epcInput.trim();

  displayMessage("Enviando código EPC via WebSocket...", "loading");
  mandaEpcButton.disabled = true;

  try{
    const payload = {epcCode: epcCode};
    socket.send(JSON.stringify(payload));
    displayMessage("Código EPC enviado com sucesso!", "SUCCESS");
    epc.value= "";
  } catch (error) {
    displayMessage("Erro ao enviar código EPC.", "ERROR");
    console.error("Erro ao enviar código EPC:", error);
  } finally {
    mandaEpcButton.disabled = false;
  }
}

function displayMessage(message, type){
  mensagemStatus.textContent = message;
  mensagemStatus.className = `statusMessage ${type}`;
  mensagemStatus.style.display = 'block';

  mandaEpcButton.addEventListener('click', mandaEpcData);
}

conectarWebSocket();

