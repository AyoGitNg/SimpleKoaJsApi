'use strict';

const Machines = require('../database/models/machines');
const Prices = require('../database/models/prices');

exports.setIndividualMachinePricingModel = async ctx => {
	const machineId = ctx.params.machineId;
	const pmId = ctx.params.pmId;
	const currentMachineModel = await Machines.findOne({id: machineId});
	const passedPriceModel = await Prices.findOne({id: pmId});

	if (!passedPriceModel) {
		ctx.body = 'Price Id Not Found';
	} else if (!currentMachineModel) {
		ctx.body = 'Machine Id Not Found';
	} else {
		currentMachineModel.pricing_id = pmId;
		await currentMachineModel.save();
		ctx.body = currentMachineModel;
	}
};

exports.deletePricingModelFromMachine = async ctx => {
	const machineId = ctx.params.machineId;
	const pmId = ctx.params.pmId;
	const passedPriceModel = await Prices.findOne({id: pmId});
	const currentMachineModel = await Machines.findOne({id: machineId});

	if (!passedPriceModel) {
		ctx.body = 'Price Id Not Found';
	} else if (!currentMachineModel) {
		ctx.body = 'Machine Id Not Found';
	} else {
		currentMachineModel.pricing_id = '';
		await currentMachineModel.save();
		ctx.body = currentMachineModel;
	}
};

exports.getPriceModelAndConfigurationForMachine = async ctx => {
	const machineId = ctx.params.machineId;
	const currentMachineModel = await Machines.findOne({id: machineId});

	if (!currentMachineModel) {
		ctx.body = 'Machine Id Not Found';
	} else {
		const currentPriceModel = await Prices.findOne({id: currentMachineModel.pricing_id});
		if (currentPriceModel) {
			ctx.body = currentPriceModel.pricing;
		} else {
			ctx.body = await Prices.findOne({name: 'default_pricing'}, {pricing: 1});
		}

	}
};
