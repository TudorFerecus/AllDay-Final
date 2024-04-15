const express = require("express");
const router = express.Router();

const {checkIP} = require("../controllers/features");

router.route('/checkIP').get(checkIP);

module.exports = router;