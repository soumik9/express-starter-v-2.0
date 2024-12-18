import express from 'express';
import path from 'path';
import cors from 'cors'
import helmet from "helmet";
import xss from 'xss-clean'
import sanitize from 'express-mongo-sanitize'
import { routes } from './app/routes/routes.js';
import bootstrap from './config/server/bootstrap.js';
import { registerRoutes } from './config/server/registerRoutes.js';
import requestLogger from './config/logger/requestLogger.js';
import upload from './config/multer/multerConfig.js';
import RouteNotFound from './app/routes/RouteNotFound.js';
import GlobalErrorHandler from './config/errors/GlobalErrorHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize());
app.use(xss());
app.use(helmet());
app.use(requestLogger);

// multer configure
app.use(
    upload.fields([
        { name: "single", maxCount: 1 },
        { name: "multiple", maxCount: 10 },
    ])
);

// files route
app.use('/public', express.static('public'));

// Welcome route
app.get('/', (req, res) => {
    const filePath = path.join(process.cwd(), 'public', 'html', 'index.html');
    res.sendFile(filePath);
})

// Register all routes under `/api`
registerRoutes(app, '/api', routes);

// global error handler
app.use(GlobalErrorHandler);

// handle route not found
app.use(RouteNotFound);

// server & database
bootstrap(app);