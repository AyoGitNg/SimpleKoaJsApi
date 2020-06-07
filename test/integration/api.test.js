'use strict';

const supertest = require('supertest');
const app = require('../../src/app');
const mongoDb = require('../../src/database');

const server = app.listen();

beforeAll(async () => {
	await mongoDb.connect();
});

afterAll(async () => {
	await mongoDb.disconnect();
	await server.close();
});

describe('Api Test Suite', () => {

	const request = supertest(server);

	describe('GetAllPriceModels', () => {
		it('should return 200 with all Price Models', async () => {
			const res = await request
				.get('/pricing-models')
				.expect('Content-Type', /json/)
				.expect(200);

			expect(Array.isArray(res.body)).toBe(true);

		});
	});

	describe('CreateNewPriceModel', () => {
		const testCase = ['/pricing-models', {
			'name': 'First Play',
			'pricing': [
				{
					'price': 15,
					'name': '60 minutes',
					'value': 60
				}
			]}];
		const [path, body] = testCase;

		it('should return 200 when create new models', async () => {
			const res = await request
				.post(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /text/)
				.expect(200);
		});
	});

	describe('GetIndividualPriceModel', () => {
		it('should return 200 with Individual Price Models', async () => {

			const res = await request
				.get('/pricing-models/69334b58-62cb-4d53-aa5c-37f871ca0255')
				.expect('Content-Type', /json/)
				.expect(200);

			expect(typeof res.body).toBe('object');

		});
	});

	describe('UpdateIndividualPriceModel', () => {
		const testCase = ['/pricing-models/69334b58-62cb-4d53-aa5c-37f871ca0255', {
			'name': 'Another Many Play',
			'pricing': [
				{
					'price': 15,
					'name': '60 minutes',
					'value': 60
				}
			]}];
		const [path, body] = testCase;

		it('should return 200 when updating new models', async () => {
			const res = await request
				.put(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('AddNewPriceConfiguration', () => {
		const testCase = ['/pricing-models/8ff9ceaf-0d68-467d-b773-c097b6287ba0/prices', {
			'name': 'Dofkse Play',
			'pricing': [
				{
					'price': 84,
					'name': '304 minutes',
					'value': 84
				}
			]}];
		const [path, body] = testCase;

		it('should return 200 when adding new price configuration', async () => {
			const res = await request
				.post(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /text/)
				.expect(200);
		});
	});

	describe('GetSpecificPriceModel', () => {
		it('should return 200 when getting specific price models', async () => {
			const res = await request
				.get('/pricing-models/69334b58-62cb-4d53-aa5c-37f871ca0255/prices')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('DeletePriceConfiguration', () => {
		const testCase = ['/pricing-models/69334b58-62cb-4d53-aa5c-37f871ca0255/prices/29', {
			'price': 29,
			'name': '29 minutes',
			'value': 29
		}];
		const [path, body] = testCase;

		it('should return 200 when deleting price configuration', async () => {
			const res = await request
				.delete(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /text/)
				.expect(200);
		});
	});


	describe('SetIndividualMachinePricingModel', () => {
		const testCase = ['/localhost:1337/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e',
			{
				'price': 29,
				'name': '29 minutes',
				'value': 29
			}
		];
		const [path, body] = testCase;

		it('should return 200 when setting individual machine pricing model', async () => {
			const res = await request
				.put(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /text/)
				.expect(404);
		});
	});

	describe('DeletePricingModelFromMachine', () => {
		const testCase = ['/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e',
			{
				'price': 29,
				'name': '29 minutes',
				'value': 29
			}];
		const [path, body] = testCase;

		it('should return 200 when deleting price model from machine', async () => {
			const res = await request
				.delete(path)
				.set('Content-Type', 'application/json')
				.send(body)
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});


	describe('GetPriceModelAndConfigurationForMachine', () => {
		it('should return 200 when getting price model configuration for machine', async () => {
			await request
				.get('/machines/4111947a-6c58-4977-90fa-2caaaef88648/prices')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});


});
