/**
 * Created by gssl on 16-7-19.
 */
var http = require("http");
var express = require("express");

http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type" : "text/plain" // 输出类型
    });
    response.write("Hello World");// 页面输出
    response.end();
}).listen(8100); // 监听端口号
console.log("nodejs start listen 8100 port!");