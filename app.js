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

// const insertUser = (nome, idade, valor, chavepix) => {
//     return [nome, idade, valor, chavepix]
// }

app.post("/insert", function(req, res) {
    const insert = "INSERT INTO clients SET nome = ?, idade = ?, valor = ?, chavepix = ?";
    bd.query(insert, ["Renato", 32, 140, "renato.silva@gmail.com"], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    });
})

app.put("/update/:id", function(req, res) {
    const update = "UPDATE clients SET nome = ?, idade = ?, valor = ?, chavepix = ? WHERE id = ?";
    bd.query(update, ["Renato", 33, 150, "renato.silva@gmail.com", req.params.id], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    });
})

app.delete("/del/:id", function(req, res) {
    const del = "DELETE FROM clients WHERE id = ?";
    bd.query(del, [req.params.id], function(err, results) {
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
