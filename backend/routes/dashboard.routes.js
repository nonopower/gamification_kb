module.exports = app => {
    const bodyParser = require('body-parser');
    const dashboard = require("../controllers/dashboard.controller");
    var router = require("express").Router();

    router.post("/getUserNodeSummary", bodyParser.json(), dashboard.getUserNodeSummary);

    app.use('/api/dashboard', router);
}