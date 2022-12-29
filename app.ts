import * as dotenv from 'dotenv';
dotenv.config()
import express, { Request, Response } from 'express';

const app = express();

const songsRoute = require('./routes/songs');
app.use('/songs', songsRoute);

app.get('/', async (req: Request, res: Response) => {

    const uptime = process.uptime();
    res.send(`The process has been running for ${uptime} seconds.`)

})
export default app;