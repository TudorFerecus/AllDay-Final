const Connection = require('../models/connection.js');

const updateConnections = async (req, res) => {
    const team = "UPB AIR"
    Connection.update({}, { team: team }, { multi: true }, function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
      });
}

module.exports = {updateConnections}