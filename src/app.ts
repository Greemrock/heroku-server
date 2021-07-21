/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import categories from './category/router';
import words from './words/router';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.end(`<div><h1>Home Page</h1></div>`)
})
app.use('/api/categories', categories);
app.use('/api/words', words);

app.listen(port, () => console.log(`Server started on port ${port}`));
