(function () {
  let username;
  const socket = io();

  //   form-message
  const formMessage = document.getElementById("form-message");
  // input-message
  const inputMessage = document.getElementById("input-message");
  // lon-messages
  const logMessages = document.getElementById("log-messages");

  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = inputMessage.value;
    socket.emit("new-message", { username, text });
    console.log("nuevo mensaje", { username, text });
    inputMessage.value = "";
    inputMessage.focus();
  });

  function updateLogMessage(messages) {
    logMessages.innerText = "";
    messages.forEach((msg) => {
      const p = document.createElement("p");
      p.innerText = `${msg.username}: ${msg.text}`;
      logMessages.appendChild(p);
    });
  }
  socket.on("notification", ({ messages }) => {
    updateLogMessage(messages);
  });

  Swal.fire({
    title: "identificate por favor",
    input: "text",
    inputLabel: "ingresa tu username",
    allowOutsideClick: false,
    inputInvalidator: (value) => {
      if (!value) {
        return "necesitamos que ingreses un username para continuar";
      }
    },
  }).then((result) => {
    username = result.value.trim();
    console.log(`Hola${username}, bienvenido`);
  });
})();
