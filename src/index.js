const config = require('./config');

const mongoDb = require('./database');
mongoDb.connect().
	then(() => {
		console.log('Connection Successful');

		const app = require('./app');
		app.listen(config.SERVER_PORT, () =>
			console.log(`Server listening on port ${(config.SERVER_PORT)}`)
		);
	})
	.catch(err => {
		console.error('Database Connection Not Successful. Server will not start');
		console.error(err);
	});

