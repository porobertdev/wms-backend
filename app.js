const express = require('express');
const loadEnvConfig = require('./utils/loadEnv');
const { rootRouter: v1RootRouter } = require('./routes/v1/rootRouter');

// load env vars
loadEnvConfig();

const PORT = process.env.PORT || 3000;
console.log('🚀 ~ PORT:', PORT);
const app = express();

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('<h2>Its working</h2>'));

// API
app.use('/api/v1', v1RootRouter);

app.listen(PORT, () => console.log('[SERVER] is running...'));
