import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

mongoose
  .connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connection to DB successful");
  })
  .catch(err => {
    console.log(`Connection to DB Error: ${err}`);
  });

const app = express();
app.use(cors());

const port = process.env.PORT || 8001;

app.set("port", port);
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);

server.listen({ port }, () => {
  console.log(`Server on http://localhost:${port}/`);
});
