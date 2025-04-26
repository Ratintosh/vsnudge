console.log("Hello from frontend app.js!");

window.addEventListener('message', event => {
  const message = event.data;
  console.log("Received message from backend:", message);
});