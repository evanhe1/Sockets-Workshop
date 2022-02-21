const socket = io("ws://localhost:3000");

const messages = document.getElementById("messages");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.onclick = () => {
  const text = input.value;
  socket.emit("message", text);
};

socket.on("message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
