const User = require('../models/user');
const { welcomeMessage } = require('../views/app-home-view');

exports.eventAppHomeOpened = async ({ payload, say, context }) => {
	const user = await User.create({
		email: 'test@test.com',
		slackUserId: payload.user,
		slackWorkspaceId: context.teamId,
		role: 'user'
	});
	await user.save();
	const homeTabMessage = welcomeMessage([]);
	await say(homeTabMessage);
};
