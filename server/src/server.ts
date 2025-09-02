import path from "path";
import Express from "express"
// middleware
import logMiddleware from "./middleware/log.js";
import apiOnlyMiddleware from './middleware/apiOnly.js'
// routers
import healthcheckRouter from './routes/healthcheck.js'
import researchPaperRouter from './routes/researchPapers.js'

const api = Express();

// Static setup
api.use(Express.static(path.resolve('dist/public')))

const PORT = process.env.APP_PORT || 3001;

// Middleware
api.use(logMiddleware);
api.use(apiOnlyMiddleware);

// Routes
api.use('/healthcheck', healthcheckRouter)
api.use('/download', researchPaperRouter);

api.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});