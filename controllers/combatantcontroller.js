exports.getNumberOfCombatants = function(req, res) {
    console.log("Combatant Count");
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "master",
        password: "mysql",
        database: "battlesim",
    });

    con.connect(function(err) {
        if (err) res.send(err);
        con.query("SELECT COUNT(*) FROM `Combatant`", function(err, result, fields) {
            if (err)
                throw res.json({
                    message: 'Failed to retrieve combatantcount'
                });
            else {

                console.log('Result: ' + result);
                console.log('Result: ' + result[0]["COUNT(*)"]);
                res.json({
                    count: result[0]["COUNT(*)"]
                });
            }
        });
    });
};

exports.getAllCombatants = function(req, res) {
    console.log("Combatant");
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "master",
        password: "mysql",
        database: "battlesim",
    });


    con.connect(function(err) {
        if (err) res.send(err);
        con.query("SELECT * FROM `Combatant`", function(err, result, fields) {
            if (err)
                throw res.json({
                    message: 'FAIL!!!!'
                });
            else
                res.json(result);
        });
    });
};

exports.getCombatant = function(req, res) {
    console.log("Combatant ID");
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "master",
        password: "mysql",
        database: "battlesim",
    });

    con.connect(function(err) {
        var sqlQuery;
        if (err) res.send(err);
        if (req.params.combatantid == undefined)
            sqlQuery = "SELECT * FROM `Combatant`";
        else
            sqlQuery = "SELECT * FROM `Combatant` WHERE combatantid = " + req.params.combatantid;

        console.log("Request ID -" + req.params.combatantid + "-");

        con.query(sqlQuery, function(err, result, fields) {
            if (err)
                throw res.json({
                    message: 'FAIL!!!!'
                });
            else
                res.json(result);
        });
    });
};

exports.getCombatantsByAttribute = function(req, res) {
    var mysql = require('mysql');
    var reqAttribute = req.params.attribute;
    var reqValue = req.params.value;
    console.log("reqAttribute - " + reqAttribute);
    console.log("reqValue     - " + reqValue);
    var validAttributes = ["combatantid","health","mana","attack","defense","strength",
                           "dexterity","constitution","intelligence","determination",
                           "wisdom","ranged","luck"];
    var errorMsg;
    var index = 0;
    var foundError = true;
    while(index < validAttributes.length && foundError) {
        if(reqAttribute.toLowerCase() === validAttributes[index])
            foundError = false;
        index++;
    }

    if(foundError) {
        res.send({message: "Error - Invalid Attribute - " + reqAttribute});
    }
    if(reqAttribute === undefined || reqValue === undefined) {
        res.send({message: 'Error - values not populated'});
    }
    if(!foundError) {
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "master",
            password: "mysql",
            database: "battlesim",
        });

        con.connect(function(err) {
            var sqlQuery;
            if (err) res.send(err);
            else {
                sqlQuery = "SELECT * FROM `Combatant` WHERE " + reqAttribute + " > " + reqValue;
                console.log(sqlQuery);
                con.query(sqlQuery, function(err, result, fields) {
                    if (err)
                        throw res.json({
                            message: 'FAIL!!!!'
                        });
                    else
                        res.json(result);
                });
            }
        });
    }

}

exports.updateCombatantName = function(req, res) {
    var mysql = require('mysql');
    var reqCombatantId = req.params.combatantid;
    var reqValue = req.body.name;
    console.log("reqCombatantId - " + reqCombatantId);
    console.log("reqValue       - " + reqValue);

    if(reqCombatantId === undefined || reqValue === undefined) {
        res.json({ message: "No value sent - Failed to update" });
    }
    else {
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "master",
            password: "mysql",
            database: "battlesim",
        });

        con.connect(function(err) {
            var sqlQuery;
            if (err) res.send(err);
            else {
                sqlQuery = "UPDATE `Combatant` SET name = '" + reqValue + "' WHERE combatantid = " + reqCombatantId;
                console.log(sqlQuery);
                con.query(sqlQuery, function(err, result, fields) {
                    if (err)
                        throw res.json({ message: 'Update failed.' });
                    else
                        res.json( { message: 'Successfully update.' });
                });
            }
        });
    }
}

exports.createCombatant = function(req, res) {
    var mysql = require('mysql');
    var reqCombatantId = req.params.combatantid;
    var reqBody = req.body;
    console.log(req.body);
    if(reqBody !== undefined) {
        var sqlQueryStart = "INSERT INTO `Combatant` (name, age, gender, classname, description, health, mana, "
                     + "attack, defense, strength, dexterity, constitution, intelligence, determination, "
                     + "wisdom, ranged, luck) ";
        var sqlQueryValues  = "VALUES ('" + reqBody.name + "',"
                            + reqBody.age + ", "
                            + "'" + reqBody.gender + "', "
                            + "'" + reqBody.classname + "', "
                            + "'" + reqBody.description + "', "
                            + reqBody.health + ", "
                            + reqBody.mana + ", "
                            + reqBody.attack + ", "
                            + reqBody.defense + ", "
                            + reqBody.strength + ", "
                            + reqBody.dexterity + ", "
                            + reqBody.constitution + ", "
                            + reqBody.intelligence + ", "
                            + reqBody.determination + ", "
                            + reqBody.wisdom + ", "
                            + reqBody.ranged + ", "
                            + reqBody.luck + ")";
        var sqlQuery = sqlQueryStart + sqlQueryValues;

        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "master",
            password: "mysql",
            database: "battlesim",
        });

        con.connect(function(err) {
            if (err) res.send(err);
            else {
                console.log(sqlQuery);
                con.query(sqlQuery, function(err, result, fields) {
                    if (err)
                        throw res.json({ message: 'Update failed.' });
                    else
                        res.json( { message: 'Successfully update.' });
                });
            }
        });
    }
}
