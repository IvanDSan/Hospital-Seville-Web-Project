const connection = require("../config/db");
const bcrypt = require("bcrypt");


class hospitalcontrollers{
   

  hospitalprofile = (req,res) => {
    const {hospital_id} = req.params;
      let sqlhospital = `SELECT * FROM hospital WHERE hospital_id = ${hospital_id}`
      let sqlmedicos = `SELECT * FROM medicos WHERE hospital_id = ${hospital_id}`
  
      connection.query(sqlhospital, (errhospital, resulthospital)=>{
        if(errhospital){
          throw errhospital
        }else{
          connection.query(sqlmedicos, (errmedicos, resultmedicos)=>{
            if(errmedicos){
              throw errmedicos
            }else{
              console.log("resulthospital", resulthospital);
              console.log("resultmedicos", resultmedicos);
              
              res.render("hospitalprofile", {
                result: resulthospital[0],  
                medicos: resultmedicos
            });
            }
          })
        }
      })      
    };

  newhospital = (req,res) => {
    res.render("newhospital",{title:"newhospital"});
  };

  registerhos = (req, res) => {
    const { name_hospital, e_mail, password, repetPassword, adress, city, description, phone_number} = req.body;
    console.log(req.body);
    if (password != repetPassword) {
      res.render("newhospital", {message: "Las contraseñas no coinciden"});
    } else if (!name_hospital || !e_mail || !password || !adress || !city || !description || !phone_number) {
      console.log("name_hospital");
      res.render("newhospital", {message: "algún campo está vacío"});
    } else {
      
      bcrypt.hash(password, 10, (errHash, hash)=>{
        if(errHash){
          console.log(errHash);
          throw errHash
          
        } else{
          let sql = `INSERT INTO hospital (name_hospital, e_mail, password, adress, city, description, phone_number) VALUES ("${name_hospital}", "${e_mail}", "${hash}", "${adress}", "${city}", "${description}", "${phone_number}")`;

          if(req.file) {
            sql = `INSERT INTO hospital (name_hospital, e_mail, password, adress, city, description, phone_number, photo) VALUES ("${name_hospital}", "${e_mail}", "${hash}", "${adress}", "${city}", "${description}", "${phone_number}", "${req.file.filename}")`;
          }
          console.log(sql);
          connection.query(sql, (err, result) => {
            if (err) {
              if(err.errno == 1062){
                res.render("register",{message: "Ya existe un usuario con ese email"})
              }else{
                throw err;
              }
            } else {
              res.redirect("/");
            }
          });
        };
      });
    };
  };








};

module.exports = new hospitalcontrollers();









