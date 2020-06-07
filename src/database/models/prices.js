const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * "id": "4d40de8f-68f8-4160-a83a-665dbc92d154",
		"name": "Default",
		"pricing": [
			{
				"price": 3,
				"name": "10 minutes",
				"value": 10
			}
		]

 */


const Prices = new Schema({
	id: String,
	name: String,
	pricing: [
		{
			price: Number,
			name: String,
			value: Number
		}
	]
});

module.exports = mongoose.model('prices', Prices);
