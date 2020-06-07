'use strict';

import bodyParser from 'koa-bodyparser';

const Router = require('koa-router');

const priceController = require('./controllers/prices');
const machineController = require('./controllers/machines');

const router = new Router();
router.use(bodyParser());


router.get('/pricing-models', priceController.getAllPriceModels);
router.post('/pricing-models', priceController.createNewPriceModel);
router.get('/pricing-models/:pm', priceController.getIndividualPriceModel);
router.put('/pricing-models/:pm', priceController.updateIndividualPriceModel);
router.get('/pricing-models/:pm/prices', priceController.getSpecificPriceModelPrices);
router.post('/pricing-models/:pm/prices', priceController.addNewPriceConfiguration);
router.delete('/pricing-models/:pm/prices/:price', priceController.deleteIndividualPricesFromPriceModel);

router.get('/machines/:machineId/prices', machineController.getPriceModelAndConfigurationForMachine);
router.delete('/machines/:machineId/prices/:pmId', machineController.deletePricingModelFromMachine);
router.put('/machines/:machineId/prices/:pmId', machineController.setIndividualMachinePricingModel);

module.exports = router;
