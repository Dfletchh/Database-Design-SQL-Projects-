const CreateStadium = () => {
    const handleOnSubmit = (e) => {
      // Get team name from value.
      console.log(e.target.Stadium.value);
  
      // Create new team object from values.
  
      // Write to DB
    };
  
    return (
      <div>
        <form onSubmit={handleOnSubmit}>
          <h1>Create Stadium</h1>
          <label>
            Stadium Name:
            <input type="text" name="Stadium" />
          </label>
        </form>
      </div>
    );
  };
  
  export default CreateStadium ;