const { DataTypes } = require('sequelize');
const sequelize = require('../utility/sequelize');

const Application = sequelize.define('application', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	}
});

module.exports = Application;
