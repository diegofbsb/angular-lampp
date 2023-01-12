const express = require("express");
const app = express();
const cors = require("cors");
const createProxyMid = require("http-proxy-middleware")
const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(cors())

app.get("/", createProxyMiddleware({target:'http://localhost:8090', changeOrigin:true}))
app.listen(3000, ()=>{
  console.log("proxy started");
});
