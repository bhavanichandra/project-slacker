const {
	HomeTab,
	Actions,
	Elements,
	Header,
	Divider,
	Section
} = require('slack-block-builder');

const pluralize = require('pluralize');

const welcomeMessage = (connectedApps) => {
	const homeTab = HomeTab({
		callbackId: 'slacker-app',
		privateMetaData: 'Initial'
	}).blocks(
		Actions({ blockId: 'connected-app-creation-actions' }).elements(
			Elements.Button({ text: 'Open Connected Apps' })
				.value('app-home-nav-open')
				.actionId('app-home-nav-open'),
			Elements.Button({ text: 'Create a Connected App' })
				.value('app-home-nav-create-a-connectedApp')
				.actionId('app-home-nav-create-a-connectedApp')
		)
	);

	if (connectedApps.length === 0) {
		homeTab.blocks(
			Header({ text: 'Please create connected apps to start the integration' }),
			Divider(),
			Section({ text: "You haven't configured any connected app." })
		);
		return homeTab.buildToJSON();
	}

	homeTab.blocks(
		Header({
			text: `You have ${connectedApps.length} recently completed ${pluralize(
				'task',
				connectedApps.length
			)}`
		})
	);

	return homeTab.buildToJSON();
};

module.exports = {
	welcomeMessage: welcomeMessage
};
