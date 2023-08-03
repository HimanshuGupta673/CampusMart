import express from 'express';

import cors from 'cors';
import Connection from './database/db.js';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';


const app = express();
app.use('/uploads',express.static('uploads'))

app.use(cors());
app.use(cookieParser())

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))


app.use('/', router);

const PORT = 8000;
Connection()

app.listen(PORT||process.env.PORT, () => console.log(`server is running successfully on PORT ${PORT}`));