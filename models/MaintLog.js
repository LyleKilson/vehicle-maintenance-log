

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class MaintLog extends Model{}

MaintLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        last_oil_change: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        last_tire_rotation: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        last_spark_plugs: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
    last_air_filter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: {
          type: DataTypes.STRING,
          allowNull: true 
      },
      vehicle_id:{
          type: DataTypes.INTEGER,
          references: {
              model: 'vehicle',
              key: 'id'
          }
          
      }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'maintlog'
        
    }
)

module.exports = MaintLog;