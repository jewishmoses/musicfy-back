import * as dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = parseInt(process.env.PORT || "3000");

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Running at port http://localhost:${PORT}`);
});