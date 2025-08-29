import Express from "express"
import { type Request, type Response } from "express";
import { Logger } from "./utils/logger.js";

const logger = Logger.getLogger();

const api = Express();

const PORT = process.env.PORT || 3001;

api.get('/', (req: Request, res: Response) => {
  const err = new TypeError('No body provided')
  logger.log({req: req, error: err, message: 'False error, ignore'})
  
  res.send('Hello World!');
});

api.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});