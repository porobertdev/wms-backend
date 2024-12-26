const express = require('express');
const loadEnvConfig = require('./utils/loadEnv');
const helmet = require('helmet');
const cors = require('cors');
const { rootRouter: v1RootRouter } = require('./routes/v1/rootRouter');
const db = require('./database/db');
const { handleError } = require('./middleware/handleError');

// TODO: find a way to require it properly from queue-related modules.
// Keep in mind that queueService must be available when the queue event is emitted.
require('./workers/v1/queueWorker');

// load env vars
loadEnvConfig();

// db
db.init();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
    Set security-related HTTP headers
    as seen on: https://blog.risingstack.com/node-js-security-checklist/#:~:text=Security%20HTTP%20Headers
*/
app.use(helmet());

// Set CORS to allow requests from frontend
app.use(
    cors({
        origin: process.env.FRONTEND_HOST,
    })
);

// Reduce fingerprinting
app.disable('x-powered-by');

app.get('/', (req, res) => res.send('<h2>Its working</h2>'));

// API
app.use('/api/v1', v1RootRouter);

// error middleware
app.use(handleError);

app.listen(PORT, () => console.log('[SERVER] is running...'));
