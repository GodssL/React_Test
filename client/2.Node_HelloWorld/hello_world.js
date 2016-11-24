/**
 * Created by root on 16-7-19.
 */
const http = require('http');

const hostname = '127.0.0.1'; // 定义连接地址
const port = 3000; // 定义端口

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});