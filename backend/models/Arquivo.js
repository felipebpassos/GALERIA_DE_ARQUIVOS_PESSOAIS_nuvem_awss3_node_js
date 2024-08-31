const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Arquivo = sequelize.define('Arquivo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('foto', 'video'),
    allowNull: false,
  },
  data_upload: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'arquivos',
  timestamps: false,
});

User.hasMany(Arquivo, { foreignKey: 'user_id' });
Arquivo.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Arquivo;
