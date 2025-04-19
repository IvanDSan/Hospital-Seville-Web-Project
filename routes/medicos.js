var express = require('express');
var router = express.Router();
const uploadImage = require('../middleware/uploadImage')
const medicoscontrollers = require("../controllers/medicoscontrollers");

router.get("/medicoprofile/:medico_id",medicoscontrollers.medicoprofile);
router.get("/newmedico/:hospital_id",medicoscontrollers.newmedico);
router.get('/delmedic/:medicos_id/:hospital_id', medicoscontrollers.delmed);
router.post("/newmedico/:hospital_id", uploadImage("images"), medicoscontrollers.registermedicos);
router.get('/editmedico/:medicos_id/:hospital_id', medicoscontrollers.editmedico);
router.post('/editmedico/:medicos_id/:hospital_id', medicoscontrollers.editarmedico);


module.exports = router;

