var express = require('express');
const hospitalcontrollers = require('../controllers/hospitalcontrollers');
var router = express.Router();
const uploadImage = require('../middleware/uploadImage')
//http://localhost:3000/hospital
router.get("/hospitalprofile/:hospital_id",hospitalcontrollers.hospitalprofile);
router.get("/newhospital",hospitalcontrollers.newhospital);
router.post("/newhospital", uploadImage("images"), hospitalcontrollers.registerhos);
module.exports = router;
