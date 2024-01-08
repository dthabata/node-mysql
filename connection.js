const mysql = require("mysql");

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "bank",
    });

connection.connect(function(err){
    if(err) {
        console.log(err)
    } else {
        console.log("Conectado!")
    }
});

module.exports = connection;
