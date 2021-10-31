const {getInstance} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'players-data';

async function insert(playersData){
  const database = await getInstance();
  const {insertedId} = await database.collection(collectionName).insertOne(playersData);
  return insertedId;
}

async function get(){
  const database = await getInstance();
  return await database.collection(collectionName).find({}).toArray();
}

async function erase(id){
  const database = await getInstance();
  console.log(id);
  await database.collection(collectionName).deleteOne({
   _id:new ObjectID(`${id}`),
  });
}

async function update(id, playerInfo){
  const database = await getInstance();
  delete playerInfo._id;
  await database.collection(collectionName).update(
    {
      _id: new ObjectID(id),
    },
    {
      $set: 
      {
	...playerInfo,
      },
    });
}



module.exports = {
  insertPlayerInfo:insert,
  getPlayerInfo:get,
  deletePlayerInfo:erase,
  updatePlayerInfo:update,
};
