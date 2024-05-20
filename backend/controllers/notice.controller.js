const db = require('../models');

//張貼便利貼，新增除了自己以外同群組的紀錄
exports.InsertGroupNotice = async (req, res) => {
    try {
        const userid = req.body.userid;//目前使用者
        const groupid = req.body.groupid;//目前群組
        const nodeid = req.body.nodeid;//新增貼文id

        const query = `
          INSERT INTO "Notices" ("groupId", "nodeId", "userId", "isRead", "createdAt", "updatedAt")
          select A."id", ` + nodeid + `, B.userId, '0', now(), now()
          from "Groups" A
          INNER JOIN (SELECT "id", unnest("userId") AS userId
          FROM "Groups") B ON A."id" = B."id"
          WHERE A."id" = `+ groupid + ` AND B.userId <> ` + userid + ``

        await db.sequelize.query(query, { type: db.sequelize.QueryTypes.INSERT });
        
        res.send('notice was insert successfully.');
      } catch (error) {
        res.status(500).json(error);
      }
};

//取得User未讀取的通知
exports.GetUserNotice = async (req, res) => {
  try {
      const userid = req.body.userid;//目前使用者
      const query = `SELECT * FROM "Notices" WHERE "userId" = `+userid+` AND "isRead" = '0'`
      const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      res.send(data);
    } catch (error) {
      res.status(500).json(error);
    }
};

//更新User未讀取的通知
exports.UpdateUserNotice = async (req, res) => {
  try {
      const userid = req.body.userid;//目前使用者
      const nodeid = req.body.nodeid;//貼文id
      const query = `UPDATE "Notices" SET "isRead" = '1' WHERE "userId" = `+ userid +` AND "nodeId" = ` + nodeid + ` AND "isRead" = '0'`

      await db.sequelize.query(query, { type: db.sequelize.QueryTypes.UPDATE });
      res.send('notice was update successfully.');
    } catch (error) {
      res.status(500).json(error);
    }
};