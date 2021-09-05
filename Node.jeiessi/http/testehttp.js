var http = require('http');

http.createServer(function (req, res) {
    res.end("Ola, servidor local do Gui.");

}).listen(7777);

console.log("Salve"); 