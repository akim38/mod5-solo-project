const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

//initialize express
const app = express();

//connect morgan middleware for logging info about req and res
app.use(morgan('dev'));

//cookie parse middleware for parsing cookes, express.json middleware for parsing JSON bodies
app.use(cookieParser());
app.use(express.json());

//Security Middleware
if (!isProduction) {
    // enables cors only in developement
    app.use(cors());
}
//helmet helps better secure app by setting variety of headers
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

//connect all routes
app.use(routes);

app.use((_req, ))

module.exports = app;
