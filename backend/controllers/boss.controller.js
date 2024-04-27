const db = require('../models');
const Boss = db.Boss;

//取得當前boss 狀態
exports.getCurrentBoss = async (req, res) => {
  try {
    const data = await Boss.findOne();
      if (data)
      {
        res.status(200).json(data);
      }
    } catch (error) {
        res.status(500).json({error});
    }
};

//更新boss HP
//正數表示回寫，反之負數扣血
exports.updateBossHP = async (req, res) => {
    try {
        const hp = parseInt(req.body.hp); 
        const data = await Boss.findOne();
        if (data) {
          data.hp = parseInt(data.hp) + hp;
          await data.save();
          res.status(200).json({ message: 'HP updated successfully' });
        } else {
          res.status(404).json({ message: 'No data found within the current time range' });
        }
      } catch (error) {
        res.status(500).json(error);
      }
}

//更新boss level
exports.updateBossLevel = async (req, res) => {
  try {
      const level = req.body.level;
      const data = await Boss.findOne();
      if (data) {
        data.level = level;
        await data.save();
        res.status(200).json({ message: 'level updated successfully' });
      } else {
        res.status(404).json({ message: 'No data found within the current time range' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

//更新boss mode 0:開心 1:哭哭
exports.updateBossMode = async (req, res) => {
  try {
      const mode = req.body.mode;
      const data = await Boss.findOne();
      if (data) {
        data.mode = mode;
        await data.save();
        res.status(200).json({ message: 'mode updated successfully' });
      } else {
        res.status(404).json({ message: 'No data found within the current time range' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

//建立boss
exports.createBoss = async (req, res) => {
  try {
    const bossData = req.body; // 從請求中取得boss數據陣列
    
    // 將每個boss資料插入數據庫
    const insertResults = await Promise.all(
      bossData.map(async (boss) => {
        const { mode, level, hp } = boss;
        const insertedBoss = await Boss.create({ mode, level, hp });
        return insertedBoss;
      })
    );

    const allInserted = insertResults.every((result) => result !== null);

    if (allInserted) {
      res.status(200).json({ message: 'All bosses inserted successfully' });
    } else {
      res.status(500).json({ message: 'Some bosses failed to insert' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};