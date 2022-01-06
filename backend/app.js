const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');

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

//catch unhandled requests
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resources couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
