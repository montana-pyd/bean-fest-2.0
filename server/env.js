module.exports = {
  MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
  MONGO_DB_PORT: process.env.MONGO_DB_PORT || '27017',
  JWT_SECRET: process.env.JWT_SECRET || 'CHANGE_ME!!!!!$$$',
};