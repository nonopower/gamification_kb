module.exports = (sequelize, DataTypes) => {
    const Boss = sequelize.define("Boss", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hp: {
          type: DataTypes.STRING,
          allowNull: false
        }
    }, {timestamps: true}, );

    return Boss;
};