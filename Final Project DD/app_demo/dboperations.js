let config = require('./dbconfig'); // loads connection string
const sql = require('mssql');       // load mssql

///// Teams /////
async function getTeams() {
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Teams");
        return result.recordsets;
    }
    catch (error){
        console.log(error);
    }
}
async function getTeam(teamId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, teamId)
            .query("SELECT * from Teams where Id = @input_parameter");
        return result.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getRoster(teamID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, teamID)
            .query("SELECT * from Players where TeamID = @input_parameter");
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function getLeaderboard() { // most wins this season
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .query("SELECT * from Teams where ORDER BY Wins");
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function addTeam(team) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, team.Id)
            .input('Name', sql.NVarChar, team.Name)
            .input('Wins', sql.Int, team.Wins)
            .input('Losses', sql.Int, team.Losses)
            .input('Location', sql.NVarChar, team.Location)
            .execute('InsertTeam');
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function deleteTeam(teamID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, teamID)
            .query("DELETE FROM Teams where Id = @input_parameter");
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

///// players /////
async function addPlayer(player) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, player.Id)
            .input('Fname', sql.NVarChar, player.Fname)
            .input('Lname', sql.NVarChar, player.Lname)
            .input('DOB', sql.NVarChar, player.Dob)
            .input('Position', sql.NVarChar, player.Position)
            .input('TeamID', sql.Date, player.teamId)
            .execute('InsertPlayer');
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function deletePlayer(playerID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, playerID)
            .query("DELETE FROM Players where Id = @input_parameter");
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function updatePlayer(player) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, player)
            .query("SELECT * from Players where Id = @input_parameter");
        return result.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

///// games /////
async function getGames() {
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Games");
        return result.recordsets;
    }
    catch (error){
        console.log(error);
    }
}
async function addGame(game) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, game.Id)
            .input('Home', sql.NVarChar, game.Home)
            .input('Away', sql.NVarChar, game.Away)
            .input('Winner', sql.NVarChar, game.Winner)
            .input('Loser', sql.NVarChar, game.Loser)
            .input('When', sql.Date, game.When)
            .input('Location', sql.NVarChar, game.Location)
            .execute('InsertGame');
        return result.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function getGame(gameID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, gameID)
            .query("SELECT * from Games where Id = @input_parameter");
        return result.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function updateGame(gameID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_parameter', sql.Int, gameID)
            .query("SELECT * from Games where Id = @input_parameter");
        return result.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTeams : getTeams,
    getTeam : getTeam,
    addTeam : addTeam,
    deleteTeam : deleteTeam,
    addPlayer : addPlayer,
    deletePlayer : deletePlayer,
    addGame : addGame,
    getGame : getGame,
    updateGame : updateGame,
    getRoster : getRoster,
    getLeaderboard : getLeaderboard
}