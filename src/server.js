import 'dotenv/config'

import express from 'express';
const configViewEngine = require('./config/configEngine.js').default;
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const routes = require('./routes/web.js');
const cronJobContronler = require('./controllers/cronJobContronler.js');
const socketIoController = require('./controllers/socketIoController.js');
require('dotenv').config();
let cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup viewEngine
configViewEngine(app);
// init Web Routes
routes.initWebRouter(app);

// Cron game 1 Phut 
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever 
socketIoController.sendMessageAdmin(io);

// app.all('*', (req, res) => {
//     return res.render("404.ejs"); 
// });

server.listen(port, () => {
    console.log("Connected success port: " + port);
});

