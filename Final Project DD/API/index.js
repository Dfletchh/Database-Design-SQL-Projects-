const Joi = require('joi');         // module for err handling
const teams = ('./routes/teams');
const players = ('./routes/players');
const locations = ('./routes/locations');
const games = ('./routes/games');
const express = require('express'); // load express module
const app = express();              // express object to acess: get() post() put() delete()

app.use(express.json()); // middleware
app.use('/api/teams', teams);
app.use('/api/players', players);
app.use('/api/locations', locations);
app.use('/api/games', games);

// create: teams w/stadiums, players, games
// Get: Teams rosters/statistics, game information, season leaderboard
// Delete: Teams, Players 

// Use environment variable PORT else use 3000
// log what port were listening on
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));