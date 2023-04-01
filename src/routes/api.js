import express from 'express'
import * as trainController from "../controller/trainController.js"
import * as testDataController from '../controller/testDataController.js'
const router = express.Router();

router
    .route('/createTestData')
    .post(testDataController.createTestData)

router
    .route('/getData')
    .get(trainController.getTrainData)

router
    .route('/getPopular')
    .get(trainController.getPopular)

router
    .route('/getStations')
    .get(trainController.getStations)    

router
    .route('/searchTrain')
    .get(trainController.searchTrain)

export default router;