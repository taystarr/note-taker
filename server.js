const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// CRUD set up


// keep end of page
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});