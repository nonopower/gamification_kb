module.exports = app => {
    const bodyParser = require('body-parser');
    const boss = require("../controllers/boss.controller");
    
    var router = require("express").Router();
  
    router.get("/getCurrentBoss", bodyParser.json(), boss.getCurrentBoss);// 查詢現在boss模式和血量

    router.post('/updateBossHP', bodyParser.json(), boss.updateBossHP )// 更新現在boss血量
  
    router.post('/updateBossLevel', bodyParser.json(), boss.updateBossLevel )// 更新現在boss等級
  
    router.post('/updateBossMode', bodyParser.json(), boss.updateBossMode )// 更新現在boss模式

    router.post('/createBoss', bodyParser.json(), boss.createBoss )// 設定boss
  
    app.use('/api/boss', router);
  };