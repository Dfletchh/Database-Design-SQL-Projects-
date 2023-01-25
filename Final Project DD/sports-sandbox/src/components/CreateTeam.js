const CreateTeam = () => {
  const handleOnSubmit = (e) => {
    // Get team name from value.
    console.log(e.target.teamName.value);

    // Create new team object from values.

    // Write to DB
  };
  const newTeam = {
    Id: e.target.Id.value,
    Name: e.target.Name.value,
    Wins: e.target.Wins.value,
    Losses: e.target.Losses.value,
    Location: e.target.Location.value,
  };
  fetch('/api/teams', {method:'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newTeam)})
  console.log("newTeam: ", newTeam);

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Team</h1>
        <label>
          Team Name:
          <input type="text" name="teamName" />
        </label>
      </form>
    </div>
  );
};

export default CreateTeam;
