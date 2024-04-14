module.exports = app => {
    const bodyParser = require('body-parser');
    const radars = require("../controllers/radar.controller");
    
    var router = require("express").Router();
  
    router.get("/:id", radars.findOne);// 查詢學生雷達圖

    router.post('/updateScore', bodyParser.json(), radars.updateScore )// 更新分數
    
    router.post('/updateIdeaScore', bodyParser.json(), radars.updateIdeaScore )// 更新想法分數
  
    router.post('/updateReplyScore', bodyParser.json(), radars.updateReplyScore )// 更新回覆分數
  
    router.post('/updateAskScore', bodyParser.json(), radars.updateAskScore )// 更新提問分數
  
    router.post('/updateRecordScore', bodyParser.json(), radars.updateRecordScore )// 更新紀錄分數
  
    router.post('/updateExperimentScore', bodyParser.json(), radars.updateExperimentScore )// 更新實驗分數
  
    router.post('/updateInfoScore', bodyParser.json(), radars.updateInfoScore )// 更新資訊分數

    app.use('/api/radar', router);
  };