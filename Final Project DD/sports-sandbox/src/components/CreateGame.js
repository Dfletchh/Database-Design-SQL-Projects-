const CreateGame = () => {
    const handleOnSubmit = (e) => {
      // Get team name from value.
      console.log(e.target.Game.value);
  
      // Create new team object from values.
  
      // Write to DB
    };
  
    return (
      <div>
        <form onSubmit={handleOnSubmit}>
          <h1>Create Game</h1>
          <label>
            Game Name:
            <input type="text" name="Game" />
          </label>
        </form>
      </div>
    );
  };
  
  export default CreateGame;
  