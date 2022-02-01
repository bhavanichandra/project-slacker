const jsforce = require('jsforce');

module.exports = {
	connect: async (
		username,
		password,
		securityToken,
		clientId,
		clientSecret
	) => {
		const conn = new jsforce.Connection({
			clientId: clientId,
			clientSecret: clientSecret
		});
		const userInfo = await conn.login(username, password + securityToken);
		return {
			conn,
			userInfo
		};
	}
};
