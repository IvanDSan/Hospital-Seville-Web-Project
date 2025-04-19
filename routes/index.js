var express = require('express');
var router = express.Router();
const indexcontrollers = require("../controllers/indexcontrollers");

router.get("/",indexcontrollers.abririndex);
module.exports = router;
