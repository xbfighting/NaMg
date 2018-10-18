module.exports = function(sequelize, DataTypes) {
	return sequelize.define('BuySell', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ''
    },
    signal: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ''
    },
    hint: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    }
  }, {
		tableName: 'BuySell',
		timestamps: false,
		underscored: false
	})
}
