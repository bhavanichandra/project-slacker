// const Application = require('../models/application');
const { connectedAppModal } = require('../views/app-home-view');

const createConnectedAppAction = async ({
	ack,
	action,
	client,
	context,
	payload,
	body
}) => {
	console.log(action, context, payload);
	await ack();
	await client.views.open({
		trigger_id: body.trigger_id,
		view: connectedAppModal()
	});
};

const appLoginAction = async ({
	// ack,
	action,
	// client,
	context,
	payload,
	body
}) => {
	console.log(action, context, payload, body);
	// await ack();
    // const application = await Application.findOne({ where: { name: appName } });
    // console.log(application);
	// await client.views.open({
	// 	trigger_id: body.trigger_id,
	// 	view: connectedAppModal()
	// });
};



module.exports = {
	createConnectedAppAction: createConnectedAppAction,
    appLoginAction: appLoginAction
};
