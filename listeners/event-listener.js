const User = require('../models/user');
// const Application = require('../models/application')
const ConnectedApp = require('../models/connected-app');
// const ApplicationSetting = require('../models/application-setting')
const constants = require('../utility/constants');
const { welcomeMessage } = require('../views/app-home-view');
const Application = require('../models/application');

exports.onAppHomeOpened = async ({ event, payload, client, context }) => {
	if (event.tab !== 'home') {
		return;
	}
	const existingUser = await User.findOne({
		where: { slackUserId: payload.user }
	});
	if (!existingUser) {
		const user = await User.create({
			email: 'test@test.com',
			slackUserId: payload.user,
			slackWorkspaceId: context.teamId,
			role: 'user'
		});
		await user.save();
	}

	const connectedApps = await ConnectedApp.findAll();
	const homeTabMessage = welcomeMessage(connectedApps || []);
	await client.views.publish({
		user_id: payload.user,
		view: homeTabMessage
	});
};

const createConnectedApp = async (eventPayload) => {
	const values = eventPayload.payload.state.values;
	const obj = {};
	for (const [key, value] of Object.entries(values)) {
		const type = value[key].type;
		obj[key] = type.includes('select')
			? value[key].selected_option.value
			: value[key].value;
	}
	const user = await User.findOne({
		where: { slackUserId: eventPayload.body.user.id }
	});
	const app = await Application.findOne({ where: { name: 'Salesforce' } });
	const connectedApp = await ConnectedApp.create({
		name: obj.name,
		credentials: {},
		environment: obj.env,
		userId: user.id,
		applicationId: app.id
	});
	await connectedApp.save();
};

exports.onViewSubmission = async (eventPayload) => {
	eventPayload.ack();
	const callbackId = eventPayload.payload.callback_id;
	if (callbackId === constants.createConnectedAppCallback) {
		createConnectedApp(eventPayload);
	} else {
		console.log('To be implemented.', callbackId);
	}
};
