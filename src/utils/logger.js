const log4js = require("log4js");
const config = require("../../config.js");

const level = config.LOG_LEVEL || "info";

let core = log4js.getLogger("[Core]");
core.level = level;

let sql = log4js.getLogger("[SQL]");
sql.level = level;

let socket = log4js.getLogger("[Socket.io]");
socket.level = level;

module.exports = {
    core,
    sql,
    socket
}