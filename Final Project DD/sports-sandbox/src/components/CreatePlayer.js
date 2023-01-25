import { teams } from "../data/teams";

const CreatePlayer = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevents any default behavior by the browser for forms.
    console.log(e);

    /**
     * {
     *  playerName: ""
     *  teamID: ""
     * }
     */

    const newPlayer = {
      playerName: e.target.playerName.value,
    };

    console.log("newPlayer: ", newPlayer);

    // Write some API
    try {
    } catch (err) {}
  };

  return (
    <div>
      <h1>Create Player</h1>
      <form onSubmit={handleOnSubmit}>
        <label>
          Player Name:
          <input type="text" name="playerName" />
        </label>
        <br />
        <select name="teamName">
          {teams.map((team, idx) => (
            <option value={team.teamName}>{team.teamName}</option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePlayer;
