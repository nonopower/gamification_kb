const db = require('../models');
const Pet = db.Pet;

/* 更改pet進度 */
exports.updCurrentPet = async (req, res) => {
    try {
      const groupId = req.body.groupId;
      const activityId = req.body.activityId;
      const process = req.body.process;
      const query = `select * from "Pets" where "groupId" = `+ groupId +` and "activityId" = ` + activityId;
      const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      if (data)
      {
        const upd = `update "Pets" set "process" = "process" +` + process + ` where "groupId" = `+ groupId +` and "activityId" = ` + activityId;
        await db.sequelize.query(upd, { type: db.sequelize.QueryTypes.UPDATE });
      }
      else
      {
        const ins = `INSERT INTO "Pets" ("groupId", "activityId", "petNumber", "process", "createdAt", "updatedAt") 
          values( ` + groupId + `, ` + activityId + `, 'pet01.gif', ` + 0 + `, current_timestamp AT TIME ZONE 'Asia/Taipei', current_timestamp AT TIME ZONE 'Asia/Taipei');`;
        
        await db.sequelize.query(ins, { type: db.sequelize.QueryTypes.INSERT });
      }
      
      const upddata = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      if (upddata[0])
      {
        if (Number(upddata[0].process) >= 100)
        {
          const numStr = upddata[0].petNumber.substring(3, 5);
          const num = parseInt(numStr, 10) + 1;
          const newNumStr = 'pet'+ num.toString().padStart(2, '0') + '.gif';
          const updPet = `update "Pets" set "process" = 0, "petNumber" = '`+ newNumStr + `' where "groupId" = `+ groupId + ` and "activityId" = ` + activityId;
          await db.sequelize.query(updPet, { type: db.sequelize.QueryTypes.UPDATE });
          
          const insBackPacks = `insert into "BackPacks" 
          ("groupId", "activityId", "petNumber", "conquerTime", "createdAt", "updatedAt") 
            values( ` + groupId + `, ` + activityId + `, '` + newNumStr +`', current_timestamp AT TIME ZONE 'Asia/Taipei', current_timestamp AT TIME ZONE 'Asia/Taipei', current_timestamp AT TIME ZONE 'Asia/Taipei');`;
          await db.sequelize.query(insBackPacks, { type: db.sequelize.QueryTypes.INSERT });

          const current = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
          res.send(current[0]);
        }
        else
        {
          res.send(upddata[0]);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

/* 更改pet圖片 */
exports.updPet = async (req, res) => {
  try {
    const groupId = req.body.groupId;
    const activityId = req.body.activityId;
    const petNumber = req.body.petNumber;
    const query = `select * from "Pets" where "groupId" = `+ groupId +` and "activityId" = ` + activityId;
    const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    if (data)
    {
      const upd = `update "Pets" set "petNumber" = '`+ petNumber + `' where "groupId" = `+ groupId + ` and "activityId" = ` + activityId;
      await db.sequelize.query(upd, { type: db.sequelize.QueryTypes.UPDATE });

      const upddata = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      res.send(upddata[0]);
    }

    res.send("does not exist pet");
  } catch (error) {
    res.status(500).json(error);
  }
};

/* 新增pet */
exports.insertPet = async (req, res) => {
  try {
    const groupId = req.body.groupId;
    const activityId = req.body.activityId;
    const query = `select * from "Pets" where "groupId" = `+ groupId +` and "activityId" = ` + activityId;
    const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    if (data[0])
    {
      res.send("already exists");
    }
    else
    {
      const ins = `INSERT INTO "Pets" ("groupId", "activityId", "petNumber", "process", "createdAt", "updatedAt") 
        values( ` + groupId + `, ` + activityId + `, 'pet1.gif',` + 0 + `, current_timestamp AT TIME ZONE 'Asia/Taipei', current_timestamp AT TIME ZONE 'Asia/Taipei');`;
      
      await db.sequelize.query(ins, { type: db.sequelize.QueryTypes.INSERT });

      const insdata = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      res.send(insdata[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/* 取得現在pet的資料 */
exports.getPet = async (req, res) => {
  try {
    const groupId = req.body.groupId;
    const activityId = req.body.activityId;
    const query = `select * from "Pets" where "groupId" = `+ groupId +` and "activityId" = ` + activityId;
    const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    res.send(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};