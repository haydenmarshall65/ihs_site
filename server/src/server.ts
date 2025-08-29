import path from "path";
import Express from "express"
import logMiddleware from "./middleware/log.js";
import apiOnlyMiddleware from './middleware/apiOnly.js'
import healthcheckRouter from './routes/healthcheck.js'

const api = Express();

// Static setup
api.use(Express.static(path.resolve('dist/public')))

const PORT = process.env.PORT || 3001;

// Middleware
api.use(logMiddleware);
api.use(apiOnlyMiddleware);

// Routes
api.use('/healthcheck', healthcheckRouter)

api.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});