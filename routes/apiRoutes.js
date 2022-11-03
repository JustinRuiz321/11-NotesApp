const router = require('express').Router();
const fs = require("fs");
const path = require('path');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require("uuid");


router.get("/", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req,res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
      const note = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(note, './db/db.json');
      res.json(note);
    }
});
module.exports = router;