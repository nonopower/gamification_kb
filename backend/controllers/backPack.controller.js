const db = require('../models');
const BackPack = db.BackPack;

exports.getGroupBackPack = async (req, res) => {
    try {
      const groupId = req.body.groupId;
      const activityId = req.body.activityId;
      const query = `SELECT * FROM "BackPacks" WHERE "groupId" = ` + groupId + ` AND "activityId" = ` + activityId ;
      const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
  
      res.send(data);
    } catch (error) {
      res.status(500).json(error);
    }
};
