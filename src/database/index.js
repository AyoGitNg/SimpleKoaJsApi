const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('debug', config.DB_LOGGING);

const {DB_HOST, DB_NAME, DB_PORT} = config;

const mongoDbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

exports.connect = async () => {
	return await mongoose
		.connect(mongoDbUrl);
};

exports.disconnect = async () => {
	return await mongoose.disconnect();
};
