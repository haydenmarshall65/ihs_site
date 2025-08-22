import Express from "express";
import {} from "express";
import { Logger } from "./utils/logger.js";
const logger = Logger.getLogger();
const api = Express();
const PORT = process.env.PORT || 3001;
api.get('/', (req, res) => {
    logger.log({ message: 'testing 123', req: req });
    res.send('Hello World!');
});
api.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map