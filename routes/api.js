/* [{"COUNT(*)":22}] */

var express = require('express');        // call express
var router  = express.Router();
var bodyParser = require('body-parser');
var combatantController = require('../controllers/combatantcontroller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res) { res.json({ message: 'hooray! welcome to our api!' });});
router.get('/combatant/count', combatantController.getNumberOfCombatants);
router.get('/combatant', combatantController.getAllCombatants);
router.get('/combatant/:combatantid', combatantController.getCombatant);
router.get('/combatant/:attribute/:value', combatantController.getCombatantsByAttribute);
router.post('/combatant/create', combatantController.createCombatant);
router.post('/combatant/:combatantid/name', combatantController.updateCombatantName);

module.exports = router;
