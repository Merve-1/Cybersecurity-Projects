const http = require('http');
const server = http.createServer((request,response)=> {
    response.writeHead(200,{'Content-type': 'text/html'});
    if (request.method === 'GET'){
        response.end('GET');   
    }
    if (request.method === 'POST'){
        response.end('POST');   
    }
    if (request.method === 'PUT'){
        response.end('PUT');   
    }
    if (request.method === 'DELETE'){
        response.end('DELETE');   
    }

    //response.write('<h1>Welcome to Node.js!</h1>');
    response.end('<h1> Welcome to Node.js !!</h1>');
}).listen(3000, ()=>console.log("http://localhost:3000"));

// const serve2 = http.createServer((request,response)=> {
//     response.writeHead(200,{'Content-type': 'text/html'});
//     //response.write('<h1>Welcome to Node.js!</h1>');
//     response.end('<h1> Welcome to Node.js2 !!</h1>');
// }).listen(4000, ()=>console.log("http://localhost:4000"));