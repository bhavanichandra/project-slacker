const { config } = require('dotenv');

const env_config = config();

if (env_config.error) {
	throw new Error('Error loading .env file');
} else {
	const { App } = require('@slack/bolt');
	const sequelize = require('./utility/sequelize');
	const Application = require('./models/application');
	const ConnectedApp = require('./models/connected-app');
	const ApplicationSetting = require('./models/application-setting');
	const User = require('./models/user');
	const app = new App({
		appToken: process.env.SLACK_APP_TOKEN,
		token: process.env.SLACK_BOT_TOKEN,
		signingSecret: process.env.SLACK_SIGNING_SECRET,
		port: process.env.PORT || 8080,
		socketMode: true
	});

	User.hasMany(ConnectedApp, { foreignKey: 'userId' });
	Application.hasMany(ConnectedApp, { foreignKey: 'applicationId' });
	Application.hasMany(ApplicationSetting, { foreignKey: 'applicationId' });
	// sequelize.sync();
	sequelize
		.authenticate()
		.then(() => {
			console.log('Database connected.');
			app.start();
		})
		.catch((err) => {
			console.log('Error connecting to database: ', err.message);
		});
}
