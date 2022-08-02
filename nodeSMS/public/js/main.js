const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.querySelector(".button");
const response = document.querySelector(".response");

button.addEventListener("click", send, false);

const socket = io();

socket.on("smsStatus", function (data) {
  response.innerHTML =
    "<h5>Messsage Is Successfully Sent To " + data.number + "</h5>";
});

function send() {
  const number = numberInput.value.replace(/\D/g, "");
  const text = textInput.value;

  fetch("/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
