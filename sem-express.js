const http = require('node:http');
const { URL } = require('node:url');
const bd = require("./connection");
const querystring = require('node:querystring'); 

function helloWorld(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');  
}

function favicon(req, res){
    res.statusCode = 301
    res.setHeader('location', 'https://en.wikipedia.org/static/favicon/wikipedia.ico');
    res.end();  
    
}

function nomes(req, res){
    const select = "SELECT * FROM clients";
    bd.query(select, function(err, results) {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain');
            res.end(err)
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/json');
            console.log(results);
            res.end(JSON.stringify(results))
        }
    });
}

function nomesParamsComGET(req, res, params = {}){
    let name = params.get('name')

    const get = "SELECT * FROM clients WHERE nome = ?";
    bd.query(get, [name], function(err, results) {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain');
            res.end(err)
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(results))
        }
    });
}

function nomesParamsComDELETE(req, res, params = {}){
    let abobora = params.get('abobora')

    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        body = data.toString()

        console.log(body);
        console.log(abobora);
        console.log(`${abobora} ${body}`);

        const get = "SELECT * FROM clients WHERE nome = ?";
        bd.query(get, [`${abobora} ${body}`], function(err, results) {
            if (err) {
                console.log(err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain');
                res.end(err)
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/json');
                res.end(JSON.stringify(results))
            }
        });
    });
}


function testeMetodoPOST(req, res, params = {}){
    let muito = params.get('muito')

    console.log(muito);

    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        body = data.toString()
        
        console.log(body.split('').length);


        if (body.split('').length > 20) {
            res.statusCode = 500
            res.end()
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
    
            resposta = `cazezinho é ${body} e muito ${muito}`
            res.end(resposta)
        }
    });
}

function testeMetodoPOST(req, res, params = {}){
    let muito = params.get('muito')

    console.log(muito);

    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        body = data.toString()
        
        console.log(body.split('').length);


        if (body.split('').length > 20) {
            res.statusCode = 500
            res.end()
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
    
            resposta = `cazezinho é ${body} e muito ${muito}`
            res.end(resposta)
        }
    });
}

function nomesParamsComPOST(req, res, params = {}){
    let name = params.get('name')

    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        console.log("Data: ", data.toString());
        
        const get = "SELECT * FROM clients WHERE nome = ?";
        bd.query(get, [data], function(err, results) {
            if (err) {
                console.log(err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain');
                res.end(err)
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/json');
                res.end(JSON.stringify(results))
            }
        }); 
    });
}

// function nomesParamsComPOST(req, res){}

const server = http.createServer((req, res) => {
    console.log('-------- inicio')
    const url = new URL(`http://${req.url}`);
    console.log(req.url);
    const { hostname  } = url;

    console.log("METODO: ", req.method);

    searchParams = url.searchParams;
    
    if (hostname == 'hello-world') {
        helloWorld(req, res)
    } else if (hostname == 'favicon.ico') {

        favicon(req, res);

    } else if (hostname == 'nomes') {

        nomes(req, res);

    } else if (hostname == 'nomesparamscomget' && req.method == "GET") {

        nomesParamsComGET(req, res, searchParams);


    } else if (hostname == 'nomesparamscompost' && req.method == "POST") {

        nomesParamsComPOST(req, res, searchParams);

    } else if (hostname == "cazezinho" && req.method == "POST") {

        testeMetodoPOST(req, res, searchParams);

    } else if (hostname == "nomesparamscomdelete" && req.method == "DELETE") {

        nomesParamsComDELETE(req, res, searchParams);

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Rota nao existe');    
    }
});

server.listen(8080, '127.0.0.1', () => {
    console.log(`Server running at http://8080:127.0.0.1/`);
});
