const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 		"id": "99ade105-dee1-49eb-8ac4-e4d272f89fba",
		"name": "Machine 1",
		"pricing_id": "3ba92095-3203-4888-a464-3c7d5d9acd7e"
 */

const Machines = new Schema({
	id: String,
	pricing_id: String,
	name: String
});

Machines.index({id: 1}, {name: 'machine_id_index', unique: true});

module.exports = mongoose.model('machines', Machines);
