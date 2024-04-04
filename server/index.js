import express from 'express';

import cors from 'cors';
import Connection from './database/db.js';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';


const app = express();
app.use('/uploads',express.static('uploads'))
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.


app.use(cors());
app.use(cookieParser())
// cookieParser() parses these cookies and attaches them to the req.cookies object in Express.js middleware chain.
// Once the cookies are parsed, your Express.js routes and middleware can access the cookies through the req.cookies object.

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))


app.use('/', router);

const PORT = 8000;
Connection()

app.listen(PORT||process.env.PORT, () => console.log(`server is running successfully on PORT ${PORT}`));