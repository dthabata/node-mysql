const bd = require("./connection");
const express = require("express");
const app = express();
const body = require("body-parser");

app.use(body.json());

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
    const body  = req.body;
    bd.query(insert, [body.nome, body.idade, body.valor, body.chavepix], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send("Usuário inserido!")
        }
    });
})

app.put("/update/:id", function(req, res) {
    const update = "UPDATE clients SET nome = ?, idade = ?, valor = ?, chavepix = ? WHERE id = ?";
    const body = req.body;
    bd.query(update, [body.nome, body.idade, body.valor, body.chavepix, req.params.id], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send("Usuário atualizado!")
        }
    });
})

app.delete("/del/:id", function(req, res) {
    const del = "DELETE FROM clients WHERE id = ?";
    bd.query(del, [req.params.id], function(err, results) {
        if(err) {
            console.log(err)
        } else {
            res.send("Usuário deletado!")
        }
    });
})

app.listen(8080, function() {
    console.log("O servidor está rodando...");
});
