const express = require('express'); // load express module
const router = express.Router();    // express object to acess: get() post() put() delete()

//router.use(express.json()); // middleware

const teams = [
    { id: 1, name: 'Rays' },
    { id: 2, name: 'Lightening' },
    { id: 3, name: 'Buccaneers' },
    { id: 4, name: 'Red Sox' },
    { id: 5, name: 'Yankees' }
];

//// View ////
// Get all the Teams
router.get('/', (req, res) => {
    res.send(teams); 
});
// Get the Team by an ID number
router.get('/:id', (req, res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id)); // find team
    if (!team) return res.status(404).send('The team with the given ID was not found.') // !found
    
    res.send(team); // send resource to the client
});

//// Create ////
// Create the a new Team
router.post('/', (req, res) => {
    const { error } = validateTeam(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Team to be added to the DB
    const team = {
        id: teams.length + 1,
        name: req.body.name
    };
    // push into array
    teams.push(team);
    // send resource to the client
    res.send(team);
});

//// Update ////
// Update player by ID
router.put('/:id', (req, res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id)); // find team
    if (!team) return res.status(404).send('The team with the given ID was not found.') // !found

    const { error } = validateTeam(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    team.name = req.body.name;
    res.send(team);
});

//// Delete ////
// Delete a team by an ID number
router.delete('/:id', (req, res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id)); // find team
    if (!team) return res.status(404).send('The team with the given ID was not found.') // !found

    const index = teams.indexOf(team); // get index
    teams.splice(index, 1);            // delete at index

    res.send(team); // send resource to client
});

//// Validation logic ////
function validateTeam(team) {
    const schema = Joi.object({
        name: Joi.string().min(3).required() // Team name required and 3 char long
    });
    return schema.validate(team);
}

module.exports = router;