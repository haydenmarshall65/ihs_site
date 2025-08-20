import express from "express"
import { Logger } from "./utils/logger.js";

const logger = Logger.getLogger();

const api = express();

const PORT = process.env.PORT || 3001;

api.get('/', (req, res) => {
  console.log('Received a GET request on /');
  console.log(req.headers);
  res.send('Hello World!');
});

api.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});