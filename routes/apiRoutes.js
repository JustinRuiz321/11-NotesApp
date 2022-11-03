//Constants for the routers
const router = require('express').Router();
const fs = require("fs");
const path = require('path');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
const { v1: uuidv1 } = require('uuid');

//To be able to read the notes from the db.json
router.get("/", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


//To create a new note
router.post("/", (req,res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
      const note = {
        title,
        text,
        id: uuidv1(),
      };
  
      readAndAppend(note, './db/db.json');
      res.json(note);
    }
});


//in order to delete a note that was created
router.delete('/:id', (req, res) => {
    const noteID = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const noteFound = json.filter((note) => note.id !== noteID);
  
        writeToFile('./db/db.json', noteFound);
        res.json("Note deleted");
      });
  });

module.exports = router;