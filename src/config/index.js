'use strict';

const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
	base: {
		env,
		name: process.env.APP_NAME || 'challenge-rest-api',
		host: process.env.APP_HOST || '0.0.0.0',
		port: 1337,
		DB_NAME: process.env.DB_NAME || '27017',
		DB_PORT: process.env.DB_PORT || 'challenge',
		DB_HOST: process.env.DB_HOST || 'localhost',
		SERVER_PORT: process.env.SERVER_PORT || 1337,
		DB_LOGGING: process.env.DB_LOGGING || false,
		LOG_LEVEL: process.env.LOG_LEVEL || 'info'
	},
	production: {
		SERVER_PORT: 1338
	},
	development: {
	},
	test: {
		SERVER_PORT: 1339,
		DB_LOGGING: false
	}
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
