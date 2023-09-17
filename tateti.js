const ip = "192.168.1.191";
const port = "1000";
const uri = "tateti-1ced14d0dfda.herokuapp.com";

const myUsername = prompt("Please enter your name") || "Anonymous";
const socket = new WebSocket(
  `wss://${uri}/tateti?username=${myUsername}`
);

socket.onmessage = (m) => {
  const data = JSON.parse(m.data);
  switch (data.event) {
    case "start":
        localStorage.setItem(data.player1.userName, data.player1.playWith)
        localStorage.setItem(data.player2.userName, data.player2.playWith)
      break;
    case "set-user":
      console.log(data)
      document.querySelector(".player").innerHTML = data.username;
    break;
    case "send-message":
      // display new chat message
      addMessage(data.username, data.message);
      break;
    case "click":
      const $elm = document.querySelector(`#${data.element}`);
      console.log($elm);
      $elm.innerHTML = localStorage.getItem(data.username);
      break;
  }
};

function addMessage(username, message) {
  // displays new message
  document.getElementById(
    "conversation"
  ).innerHTML += `<b> ${username} </b>: ${message} <br/>`;
}

// on page load
window.onload = () => {
    const $elements = document.querySelectorAll(".cell");
  // when the client hits the ENTER key
  $elements.forEach($e => {
    $e.addEventListener("click", HandleClick)
  });
};


function HandleClick(e) {
  socket.send(
    JSON.stringify({
      event: "click",
      element: e.target.id
    })
  )
}

