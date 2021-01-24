const fileManager = require('./fileManager');

function insertUrl(cb) {
    fileManager.writeFile();
    cb(JSON.stringify({message: "This url has been INSERTED successfully."}));
}

function deleteUrl(cb) {
    fileManager.writeFile();
    cb(JSON.stringify({message: "This url has been DELETED successfully."}));
}

module.exports = { insertUrl, deleteUrl };