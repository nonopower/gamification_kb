module.exports = app => {
    const bodyParser = require('body-parser');
    const notice = require("../controllers/notice.controller");
    var router = require("express").Router();

    router.post("/insertGroupNotice", bodyParser.json(), notice.InsertGroupNotice);

    router.post("/getUserNotice", bodyParser.json(), notice.GetUserNotice);

    router.post("/updateUserNotice", bodyParser.json(), notice.UpdateUserNotice);

    app.use('/api/notice', router);
}