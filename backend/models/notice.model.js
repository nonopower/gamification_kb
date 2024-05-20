module.exports = (sequelize, DataTypes) => {
    const Notice = sequelize.define('Notice', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
          },
          groupId: DataTypes.INTEGER,
          nodeId: DataTypes.INTEGER,
          userId: DataTypes.INTEGER,
          isRead: DataTypes.BOOLEAN
      }, {timestamps: true}, );

    
    return Notice;
};  