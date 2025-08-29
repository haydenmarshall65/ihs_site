import { type Request, type Response, type NextFunction } from "express";
import { Logger } from "../utils/logger.js";

const logMiddleware = function(req: Request, res: Response, next: NextFunction) {
    const logger = Logger.getLogger();

    logger.log({req: req})
}

export default logMiddleware;