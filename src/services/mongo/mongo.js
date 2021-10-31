const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function start(){
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  const conncetion = await MongoClient.connect(mongoUri, {useNewUrlParser: true});

  database = conncetion.db();
}

async function getInstance(){
  if(!database) await start();
  return database;
}

module.exports = {
  getInstance,
  startDataBase:start,
};
