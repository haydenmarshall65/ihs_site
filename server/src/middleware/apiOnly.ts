import { type Request, type Response, type NextFunction } from "express";

const apiOnlyMiddleware = function(req: Request, res: Response, next: NextFunction) {
    const reqUrl = req.url
    if (reqUrl.includes('/api') || reqUrl === '/healthcheck') {
        next();
    } else {
        res.redirect('/');
    }
}

export default apiOnlyMiddleware