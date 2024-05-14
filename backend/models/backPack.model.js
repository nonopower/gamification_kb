module.exports = (sequelize, DataTypes) => {
    const BackPack = sequelize.define("BackPack", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT
        },
        groupId: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER,
        petNumber: DataTypes.STRING,
        conquerTime: DataTypes.DATE
    }, {timestamps: true}, );

    return BackPack;
};