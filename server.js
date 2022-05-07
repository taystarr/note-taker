const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Read db info - places on left side, need add to db
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        res.json(notes);
    })
});

// Create!! note-add to db
// app.post('/api/notes', (req, res) => {
//     const notes = JSON.parse(data);
//     notes.id = uuid.v4();
//     const note = createNewNote(req.body, notes);
//     res.json(note);
// });

// to create notes and save to db
app.post('/api/notes', (req, res) => {
    notes = fs.readFileSync('./db/db.json');
    notes = JSON.parse(notes);

    // couldn't figure out uuid so used .length ¯\_(ツ)_/¯
    req.body.id = notes.length;
    notes.push(req.body);
    notes = JSON.stringify(notes);

    fs.writeFile('./db/db.json', notes, function (err){
        if (err) throw err;
    }); 
    res.json(JSON.parse(notes));
});


// keep end of page
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});