module.exports = app => {
    const bodyParser = require('body-parser');
    const backPack = require("../controllers/backPack.controller");
    var router = require("express").Router();

    router.get("/getGroupBackPack", bodyParser.json(), backPack.getGroupBackPack);

    app.use('/api/backPack', router);
}