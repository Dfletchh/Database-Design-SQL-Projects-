
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