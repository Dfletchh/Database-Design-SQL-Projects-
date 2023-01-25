let Db = require('./dboperations');
const dboperations = require('./dboperations');

// Modules //
let express = require('express');
let cors = require('cors');
let app = express();
let router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);


// get requests //
router.route('/games').get((req, res) => {
    dboperations.getGames().then(result => {
       res.json(result[0]);
    });
});
router.route('/teams').get((req, res) => {
    dboperations.getTeams().then(result => {
       res.json(result[0]);
    });
});
router.route('/teams/:id').get((req, res) => {
    dboperations.getTeam(req.params.id).then(result => {
       res.json(result[0]);
    });
});
router.route('/games/:id').get((req, res) => {
    dboperations.getGame(req.params.id).then(result => {
       res.json(result[0]);
    });
});
router.route('/teams/:id').get((req, res) => { // all players for a team
    dboperations.getRoster(req.params.id).then(result => {
       res.json(result[0]);
    });
});
router.route('/teams/:id').get((req, res) => { // teams in order by games won
    dboperations.getLeaderboard(req.params.id).then(result => {
       res.json(result[0]);
    });
});

// add requests //
router.route('/teams').post((req, res) => {
    let team = {...req.body};

    dboperations.addTeam(team).then(result => {
       res.status(201).json(result);
    });
});
router.route('/players').post((req, res) => {
    let player = {...req.body};

    dboperations.addPlayer(player).then(result => {
       res.status(201).json(result);
    });
});
router.route('/games').post((req, res) => {
    let game = {...req.body};

    dboperations.addGame(game).then(result => {
       res.status(201).json(result);
    });
});

// Update // 
router.route('/games/:id').put((req, res) => {
    dboperations.updateGame(req.params.id).then(result => {
       res.json(result[0]);
    });
});
router.route('/players/:id').put((req, res) => {
    dboperations.updatePlayer(req.params.id).then(result => {
       res.json(result[0]);
    });
});

// delete requests //
router.route('/teams/:id').delete((req, res) => {
    dboperations.deleteTeam(req.params.id).then(result => {
        res.json(result[0]);
     });
});
router.route('/players/:id').delete((req, res) => {
    dboperations.deletePlayer(req.params.id).then(result => {
        res.json(result[0]);
     });
});


// Port setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));