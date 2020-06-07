'use strict';
const uuid = require('uuid');
const Prices = require('../database/models/prices');

exports.getAllPriceModels = async ctx => {
	ctx.body = await Prices.find({});
};

exports.createNewPriceModel = async ctx => {
	const {name, pricing} = ctx.request.body;
	if (name !== undefined || name !== '') {
		let priceModelName = await Prices.findOne({name: name});
		if (priceModelName) {
			ctx.body = 'Name already exist';
		} else {
			let newPrice = new Prices({
				id: uuid.v4(),
				name: name,
				pricing: pricing
			});
			await newPrice.save();
			ctx.body = newPrice;
		}
	} else {
		ctx.body = 'Name cannot be undefined or empty';
	}


};

exports.getIndividualPriceModel = async ctx => {
	let currentPriceModel = await Prices.findOne({id: ctx.params.pm});
	if (currentPriceModel) {
		ctx.body = currentPriceModel;
	} else {
		ctx.body = 'Not Found';
	}
};

exports.updateIndividualPriceModel = async ctx => {
	const { name } = ctx.request.body;
	const currentPriceModel = await Prices.findOne({id: ctx.params.pm});
	if (currentPriceModel) {
		currentPriceModel.name = name;
		await currentPriceModel.save();
		ctx.body = currentPriceModel;
	} else {
		ctx.body = 'Not Found';
	}
};

exports.getSpecificPriceModelPrices = async ctx => {
	let currentPriceModel = await Prices.findOne({id: ctx.params.pm}, {pricing: 1});
	if (currentPriceModel) {
		ctx.body = currentPriceModel;
	} else {
		ctx.body = 'Not Found';
	}
};

exports.addNewPriceConfiguration = async ctx => {
	const {price, name, value} = ctx.request.body;
	const currentPriceModel = await Prices.findOne({id: ctx.params.pm});
	if (currentPriceModel) {
		if (name !== undefined && price !== undefined && value !== undefined) {
			let filterResult = currentPriceModel.pricing.filter(e => e.name === name
				&& e.price === price && e.value === value);
			if (filterResult.length === 0) {
				let newPriceConfig = {name: name, price: price, value: value};

				currentPriceModel.pricing.push(newPriceConfig);
				await currentPriceModel.save();
				ctx.body = currentPriceModel;
			} else {
				ctx.body = 'Price Configuration Already Exist';
			}

		} else {
			ctx.body = 'Name, Price or Value cannot be undefined';
		}

	} else {
		ctx.body = 'Not Found';
	}
};

exports.deleteIndividualPricesFromPriceModel = async ctx => {
	let priceId = ctx.params.price;
	let pricingID = ctx.params.pm;
	const currentPriceModel = await Prices.findOne({id: pricingID});
	if (currentPriceModel) {

		let filterResult = currentPriceModel.pricing.filter(e => e.price === Number(priceId));
		if (filterResult.length > 0) {
			await currentPriceModel.remove({ pricing: filterResult[0] });
			ctx.body = currentPriceModel;
		} else {
			ctx.body = 'Price ID Not Found';
		}

	} else {
		ctx.body = 'Pricing ID Not Found';
	}
};
