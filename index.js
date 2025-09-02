// index.js
import express from 'express';
import path from 'path';
import { AppContainer } from 'react-dom-server';
import React from 'react';
import App from './src/app'; // Your main React component

const app = express();
app.set('view engine', 'pug'); // Or 'ejs', 'handlebars', etc.

app.use(express.static(path.join(__dirname, 'public'))); // Serving static files
app.use(function (req, res, next) {
  res.locals.reactData = React.hydrate(
    <AppContainer>{<App />}</AppContainer>,
    document.getElementById('root')
  );
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'EduAccess' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ', process.env.PORT || 3000);
});