const express = require("express");
const app = express();

const router = require('./routes/routes')
app.use(express.static("./public"))

app.use("/", router)

const port = process.env.port || 4000;
const dbConnect = require("./db/db_connect");
const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
