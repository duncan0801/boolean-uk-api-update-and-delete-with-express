const { Client } = require("pg");

const dotenv = require("dotenv");
dotenv.config();

const PGURL = process.env.PGURL;

const dbClient = new Client(PGURL);

module.exports = dbClient;
