import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express('dist');
const port = process.env.PORT || 8080;

app.use(helmet.hsts( { maxAge: 31536000, includeSubDomains: true, preload: true }))
app.use(morgan('dev'))
app.use(express.static('dist'));

// Beginning to trouble shoot how to run both node server and react app from the same port.
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);
console.log('Server started at http://localhost:' + port);