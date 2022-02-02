const { DataTypes } = require('sequelize');
const sequelize = require('../utility/sequelize');

const ConnectedApp = sequelize.define('connected_app', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	credentials: {
		type: DataTypes.JSON
	},
	environment: {
		type: DataTypes.STRING
	},
	applicationId: {
		type: DataTypes.INTEGER
	},
	userId: {
		type: DataTypes.INTEGER
	},
	isConnected: {
		type: DataTypes.BOOLEAN
	}
});

module.exports = ConnectedApp;
