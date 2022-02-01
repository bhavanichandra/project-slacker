const { DataTypes } = require('sequelize');
const sequelize = require('../utility/sequelize');

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false
	},
	slackUserId: {
		type: DataTypes.STRING
	},
	slackWorkspaceId: {
		type: DataTypes.STRING
	}
});

module.exports = User;
