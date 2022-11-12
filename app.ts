import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';

const app = express();

const songsRoute = require('./routes/songs');
app.use('/songs', songsRoute);

export default app;