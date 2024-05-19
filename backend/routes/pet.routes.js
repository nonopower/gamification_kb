module.exports = app => {
    const bodyParser = require('body-parser');
    const pet = require("../controllers/pet.controller");
    var router = require("express").Router();

    router.post("/updCurrentPet", bodyParser.json(), pet.updCurrentPet);
    
    router.post("/updPet", bodyParser.json(), pet.updPet);

    router.post("/insertPet", bodyParser.json(), pet.insertPet);

    router.post("/getCurrentPet", bodyParser.json(), pet.getPet);

    app.use('/api/pet', router);
}