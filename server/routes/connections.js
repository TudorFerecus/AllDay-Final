const express = require("express");
const router = express.Router();

const {postConnection, getLastConnection, getAllConnections, getConnectionByTeam} = require("../controllers/connectionsController");

router.route('/postConnection').post(postConnection);
router.route('/getLastConnection').get(getLastConnection);
router.route('/getAllConnections').get(getAllConnections);
router.route('/getConnectionByTeam').post(getConnectionByTeam);

module.exports = router;