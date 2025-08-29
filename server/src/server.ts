import Express from "express"
import { type Request, type Response } from "express";
import { Logger } from "./utils/logger.js";
import logMiddleware from "./middleware/log.js";

const logger = Logger.getLogger();

const api = Express();

const PORT = process.env.PORT || 3001;

api.use(logMiddleware);

api.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

api.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});