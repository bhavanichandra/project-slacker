const {
	HomeTab,
	Actions,
	Elements,
	Header,
	Divider,
	Section,
	Modal,
	Option,
	Input,
	Context
} = require('slack-block-builder');
const constants = require('../utility/constants');

const welcomeMessage = (connectedApps) => {
	const homeTab = HomeTab({
		callbackId: 'slacker-app',
		privateMetaData: 'Initial'
	}).blocks(
		Actions({ blockId: 'connected-app-creation-actions' }).elements(
			Elements.Button({ text: 'Create a Connected App' })
				.value(constants.createConnectedAppView)
				.actionId(constants.createConnectedAppView)
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

	const dynamicBlocks = [];
	for (let app of connectedApps) {
		let section;
		let context;
		if (!app.isConnected) {
			section = Section({ text: `Login to ${app.name}` })
				.accessory(
					Elements.Button({
						actionId: 'AppLoginAction',
						text: 'Login',
						value: app.name
					}).primary(true)
				)
				.blockId(`${app.name}-app-login-action`);
			context = Context().elements(':red_circle: Not Connected');
		} else {
			section = Section({ text: `${app.name} is configured.` });
			context = Context().elements(':large_green_circle: Connected');
		}
		dynamicBlocks.push(section);
		dynamicBlocks.push(context);
		dynamicBlocks.push(Divider());
	}

	homeTab.blocks(
		Header({ text: 'Connected Apps configured:' }),
		Divider(),
		...dynamicBlocks
	);
	return homeTab.buildToJSON();
};

const connectedAppModal = () => {
	const modal = Modal({
		title: 'Create Connected App',
		type: 'modal',
		submit: 'Create',
		callbackId: constants.createConnectedAppCallback
	}).blocks(
		Input({ label: 'App Name', blockId: 'name' }).element(
			Elements.TextInput({ placeholder: 'Enter App Name' }).actionId('name')
		),
		Input({ label: 'App Environment', blockId: 'env' }).element(
			Elements.TextInput({ placeholder: 'Enter App Environment' }).actionId(
				'env'
			)
		),
		Input({ label: 'Credential Type', blockId: 'credType' }).element(
			Elements.StaticSelect({
				placeholder: 'Select Credential types'
			})
				.options(
					Option({
						text: 'OAuth2',
						value: 'oauth',
						description: 'OAuth2 Username-Password Authentication'
					}),
					Option({
						text: 'Basic',
						value: 'basic',
						description: 'Basic Authentication'
					})
				)
				.actionId('credType')
		)
	);
	return modal.buildToJSON();
};

const connectedAppLoginModal =  (appData) => {
	console.log(appData);

	const modal = Modal({
		title: 'Create Connected App',
		type: 'modal',
		submit: 'Create',
		callbackId: constants.createConnectedAppCallback
	}).blocks(
		Input({ label: 'App Name', blockId: 'name' }).element(
			Elements.TextInput({ placeholder: 'Enter App Name' }).actionId('name')
		),
		Input({ label: 'App Environment', blockId: 'env' }).element(
			Elements.TextInput({ placeholder: 'Enter App Environment' }).actionId(
				'env'
			)
		),
		Input({ label: 'Credential Type', blockId: 'credType' }).element(
			Elements.StaticSelect({
				placeholder: 'Select Credential types'
			})
				.options(
					Option({
						text: 'OAuth2',
						value: 'oauth',
						description: 'OAuth2 Username-Password Authentication'
					}),
					Option({
						text: 'Basic',
						value: 'basic',
						description: 'Basic Authentication'
					})
				)
				.actionId('credType')
		)
	);
	return modal.buildToJSON();
};

module.exports = {
	welcomeMessage: welcomeMessage,
	connectedAppModal: connectedAppModal,
	connectedAppLoginModal: connectedAppLoginModal
};
