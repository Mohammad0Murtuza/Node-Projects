const express = require("express");
const Vonage = require("@vonage/server-sdk");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const socketIo = require("socket.io");

const vonage = new Vonage(
  {
    apiKey: "aa22bb5a",
    apiSecret: "sixhC581ysyprOj7",
  },
  { debug: true }
);

const app = express();

app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const from = "Vonage APIs";
  const to = "91" + req.body.number;
  const text = req.body.text;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");

        const data = {
          id: responseData.messages[0]["mesage-id"],
          number: responseData.messages[0]["to"],
        };

        io.emit("smsStatus", data);
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
});

const server = app.listen(7000, function () {
  console.log("Server is up and running at port 7000");
});

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Connected");

  io.on("diconnect", () => {
    console.log("Disconnected");
  });
});
