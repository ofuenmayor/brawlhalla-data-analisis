const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDataBase} = require('./services/mongo/mongo');
const {insertPlayerInfo, getPlayerInfo, deletePlayerInfo, updatePlayerInfo} = require('./services/mongo/brahwhalla')

const app = express()

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async (req, res) => {
  res.send(await getPlayerInfo());
});

app.post('/', async (req, res) => {
  const newPlayer = req.body;
  await insertPlayerInfo(newPlayer);
  res.send({message: 'new Player has been created'});
});

app.delete('/:id', async (req, res) => {
  await deletePlayerInfo(req.params.id);
  res.send({message: `Player ${req.params.id} has been deleted`});
});

app.put('/:id', async (req, res) => {
  const player = req.body;
  await updatePlayerInfo(req.params.id, player);
  res.send({message: 'Player has been updated'});
});

startDataBase().then(async() =>{
  await insertPlayerInfo({steamId:"steam-id",brahwhallaId:"1234",playerName:"omfest", region:"US"});
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});

