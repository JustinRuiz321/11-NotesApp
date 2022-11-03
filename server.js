const express = require('express');
const path = require('path');
const app = express();
const index = require('./routes/index')


//PORT number for local host
const PORT = process.env.PORT || 3001;

//All app.use lines
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api' , index)


//All app.get lines
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

//Listening when starting the server
app.listen(PORT, () =>
  console.log(`App listening at localhost:${PORT}`)
);