const serverless = require("serverless-http");
const { app } = require("./dist/server/main");

exports.handler = serverless(app());