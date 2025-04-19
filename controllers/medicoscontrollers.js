const connection = require("../config/db");

class medicoscontrollers {
  sqlprofile = (req, res) => {
    let sql = "SELECT * FROM medicos";

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render("medicoprofile", { result });
      }
    });
  };

  medicoprofile = (req, res) => {
    const { medico_id } = req.params;
    let sql = `SELECT * FROM medicos WHERE medicos_id = ${medico_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render("medicoprofile", { result });
      }
    });
  };

  newmedico = (req, res) => {
    const {hospital_id} = req.params;
    res.render("newmedico", {hospital_id});
  };

  delmed = (req, res) => {
    const { medicos_id, hospital_id } = req.params;
    console.log(req.params);
    let sql = `DELETE FROM medicos WHERE medicos_id = ${medicos_id} AND hospital_id = ${hospital_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/hospital/hospitalprofile/${hospital_id}`);
      }
    });
  };

  registermedicos = (req, res) => {
    const {hospital_id} = req.params;
    console.log(req.params)
    const {
      name_medic,
      specialty,
      degree,
      description,
    } = req.body;

    if (
      !name_medic ||
      !specialty ||
      !degree ||
      !description
    ) {
      res.render("register", { message: "algún campo está vacío" });
    }
    let sql = `INSERT INTO medicos (name_medic, specialty, degree, description, hospital_id) VALUES ('${name_medic}', '${specialty}', '${degree}', '${description}', ${hospital_id})`;



    if (req.file) {
       sql = `INSERT INTO medicos (name_medic, specialty, degree, description, photo, hospital_id) VALUES ("${name_medic}", "${specialty}", "${degree}", "${description}", "${req.file.filename}", ${hospital_id})`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/hospital/hospitalprofile/${hospital_id}`);
      }
    });
  };


   editmedico = (req, res) => {
    const {medicos_id, hospital_id} = req.params;
    let sql = `SELECT name_medic, specialty, degree, description, medicos_id, hospital_id FROM medicos WHERE medicos_id = ${medicos_id}`
    connection.query(sql,(err, result) => {
      if(err){
        throw err;
      }else{
        res.render("medicoedit", {data:result[0], hospital_id}) 
      };
    }); 
    };
  

  editarmedico = (req,res) => {
    const {medicos_id, hospital_id} = req.params;
    const {name_medic, specialty, degree, description} = req.body;
    console.log("req.body", req.body)
    let sql = `UPDATE medicos SET name_medic = '${name_medic}', specialty = '${specialty}', degree = '${degree}', description = '${description}' WHERE medicos_id = ${medicos_id}`;

    connection.query(sql ,(err, result) => {
      if(err){
        throw err;
      }else{
        res.redirect(`/hospital/hospitalprofile/${hospital_id}`) 
      };
    });
  }

}
module.exports = new medicoscontrollers();
