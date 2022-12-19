import axios from "axios";
import express, { Request, Response } from 'express';
import shell from 'shelljs';

const router = express.Router();

router.get('/token', async (req: Request, res: Response) => {

    const toEncode = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    const encoded = Buffer.from(toEncode).toString('base64');

    var config = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Host': 'accounts.spotify.com',
            'User-Agent': 'python-requests/2.28.1',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Authorization': `Basic ${encoded}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            "grant_type": "client_credentials"
        }
    };

    let response;

    try {
        response = await axios(config)
    } catch (error) {
        console.error(error);
        res.json({ success: false, data: { error } });
        return;
    }

    res.json({ success: true, data: { token: response.data.access_token } });

});

router.get('/:spotify_id', async (req: Request, res: Response) => {

    const { spotify_id } = req.params;
    const { code, stderr } = shell.exec(`python -m spotdl --format mp3 --output "./songs/{track-id}" https://open.spotify.com/track/${spotify_id}`);

    if (code === 0) {
        res.download(`./songs/${spotify_id}.mp3`)
        return;
    }

    console.error(stderr);
    res.json({ success: false, data: { error: stderr } })

});

module.exports = router;