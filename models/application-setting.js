const { DataTypes } = require('sequelize');
const sequelize = require('../utility/sequelize');

const ApplicationSetting = sequelize.define('application-setting', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	type: {
		type: DataTypes.STRING
	},
	config: {
		type: DataTypes.JSON
	},
	applicationId: {
		type: DataTypes.INTEGER
	}
});

module.exports = ApplicationSetting;
