const connection = require("../config/db");

class indexcontrollers{
  abririndex = (req,res) => {
    let sql = `SELECT * FROM hospital`;

    connection.query(sql,(err,result) => {
      if(err){
        throw err
      }
      else{
       console.log(result);  
       res.render("index", {result}); 
      };
    });
  }
}

module.exports = new indexcontrollers();