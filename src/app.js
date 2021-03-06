// For ES6 support, see https://medium.freecodecamp.org/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab
// For React frontend, see https://daveceddia.com/create-react-app-express-backend/
import express from 'express';
import '@babel/polyfill';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/wisdomapi', indexRouter);

if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../public", "home.html"));
  });

  app.get("/business", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../public", "business.html"));
  });

  app.get("/privacy", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../public", "privacy.html"));
  });

  app.get("/tos", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../public", "tos.html"));
  });

  app.use(express.static(path.join(__dirname, '../public')));
} else {
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../client/build/home.html"));
  });

  app.get("/business", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../client/build/business.html"));
  });

  app.get("/privacy", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../client/build/privacy.html"));
  });

  app.get("/tos", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../client/build/tos.html"));
  });

  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

mongoose.connect(process.env.DATABASE_URL);

export default app;