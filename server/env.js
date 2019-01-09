const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'localhost';
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || '27017';
const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

let MONGO_DB_CONNECTION_STRING = MONGO_DB_USERNAME && MONGO_DB_PASSWORD 
  ? `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@ds253094.mlab.com:53094/montana-pyd-beanfest`
  : `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}`;

module.exports = {
  MONGO_DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET || 'CHANGE_ME!!!!!$$$',
};