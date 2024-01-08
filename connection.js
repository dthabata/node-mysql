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

    connection.query("SELECT * FROM clients", (err, results, fields) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results);
            console.log(fields);
        }
    })
});

module.exports = connection;
