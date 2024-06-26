module.exports = app => {
    const bodyParser = require('body-parser');
    const nodes = require("../controllers/node.controller");
    
    var router = require("express").Router();

    // Create an node.
    router.post('/create', bodyParser.json(), nodes.create);

    // Find all nodes in group.
    router.get('/all/:groupId', nodes.findAllNode);

    // Find all user scores in group.
    router.get('/all/ranking/group', nodes.getGroupRanking);

    router.get('/all/rankingByNewRule/group', nodes.getGroupRankingNewRule);

    // Get one node.
    router.get('/:id', nodes.findOneNode);

    router.get('/', nodes.getAllRank);

    // Update one node.
    router.put('/:nodeId', nodes.updateNode);

    app.use('/api/nodes', router);
}