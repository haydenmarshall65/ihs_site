import {} from "express";
import { Logger } from "../utils/logger.js";
const logMiddleware = function (req, res, next) {
    const logger = Logger.getLogger();
    logger.log({ req: req });
};
export default logMiddleware;
//# sourceMappingURL=log.js.map