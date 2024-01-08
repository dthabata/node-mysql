const bd = require("./connection");
const express = require("express");
const app = express();

app.get("/", function(req, res) {
    const select = "SELECT * FROM clients";
    bd.query(select, function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    });
})

// app.get("/:nome", function(req, res) {
//     const select = "SELECT * FROM clients WHERE nome = ?";
//     bd.query(select, [req.params.nome], function(err, results) {
//         if(err) {
//             console.log(err)
//         } else {
//             res.send(results)
//         }
//     });
// })

app.get("/:id", function(req, res) {
    const select = "SELECT * FROM clients WHERE id = ?";
    bd.query(select, [req.params.id], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    });
})

const insertUser = (nome, idade, valor, chavepix) => {
    return [nome, idade, valor, chavepix]
}

app.post("/insert", function(req, res) {
    const insert = "INSERT INTO clients SET nome = ?, idade = ?, valor = ?, chavepix = ?";
    bd.query(insert, insertUser("Renato", 32, 140, "renato.silva@gmail.com"), function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    });
})

app.listen(8080, function() {
    console.log("O servidor está rodando...");
});
