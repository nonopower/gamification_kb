module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define("Pet", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT
        },
        groupId: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER,
        petNumber: DataTypes.STRING,
        process: DataTypes.INTEGER
    }, {timestamps: true}, );

    return Pet;
};