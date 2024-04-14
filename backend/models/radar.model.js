module.exports = (sequelize, DataTypes) => {
    const Radar = sequelize.define("Radar", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT
        },
        idea: {
          type: DataTypes.STRING,
          allowNull: false
        },
        reply: {
          type: DataTypes.STRING,
          allowNull: false
        },
        ask: {
          type: DataTypes.STRING,
          allowNull: false
        },
        record: {
          type: DataTypes.STRING,
          allowNull: false
        },
        experiment: {
          type: DataTypes.STRING,
          allowNull: true
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {timestamps: true}, );

    return Radar;
};