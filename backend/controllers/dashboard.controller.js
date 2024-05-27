const db = require('../models');

exports.getUserNodeSummary = async (req, res) => {
    try {
      const activityId = req.body.activityId;
      const query = `
        SELECT 
            "author",
            "groupId",
            SUM(CASE WHEN "tags" = 'idea' THEN 1 ELSE 0 END) AS "idea",
            SUM(CASE WHEN "tags" = 'question' THEN 1 ELSE 0 END) AS "question",
            SUM(CASE WHEN "tags" = 'reply' THEN 1 ELSE 0 END) AS "reply",
            SUM(CASE WHEN "tags" = 'experiment' THEN 1 ELSE 0 END) AS "experiment",
            SUM(CASE WHEN "tags" = 'information' THEN 1 ELSE 0 END) AS "information",
            SUM(CASE WHEN "tags" = 'record' THEN 1 ELSE 0 END) AS "record"
        FROM "Nodes" 
        inner join "ActivityGroups" on "Nodes"."groupId" = "ActivityGroups"."GroupId"
        WHERE "ActivityGroups"."ActivityId" = `+ activityId +` 
        GROUP BY "author", "groupId";`
  
      const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      res.send(data);
    } catch (error) {
      res.status(500).json(error);
    }
  };
