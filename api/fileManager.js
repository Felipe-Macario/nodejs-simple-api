const fileSystem = require('fs');
const path = require('path');

const data = require('./urls.json');

function writeFile() {
    fileSystem.writeFile(
        path.join(__dirname, "urls.json"), 
        JSON.stringify(data, null, 2),
        err => { if(err) throw err }
    )
}

module.exports = { writeFile };