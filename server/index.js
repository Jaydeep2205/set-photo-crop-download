const express = require("express");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/userRoutes");

app.use(cors(), express.json());

app.get("/", (req, res) =>
  res.json({ success: true, message: "server is running!" })
);

app.use("/api/userRoutes", userRouter);
global.bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))


app.post('/stored', (req, res) => {
    console.log(req.body);
    db.collection('quotes').insertOne(req.body, (err, data) => {
        if(err) return console.log(err);
        res.send(('saved to db: ' + data));
    })
});

module.exports = app;
