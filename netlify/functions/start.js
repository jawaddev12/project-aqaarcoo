const serverless = require("serverless-http");
const { app } = require("./functions/dist/server/main");

exports.handler = serverless(app());