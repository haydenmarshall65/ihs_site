import {} from "express";
const apiOnlyMiddleware = function (req, res, next) {
    const reqUrl = req.url;
    if (reqUrl.includes('/api') || reqUrl === '/healthcheck') {
        next();
    }
    else {
        res.redirect('/');
    }
};
export default apiOnlyMiddleware;
//# sourceMappingURL=apiOnly.js.map