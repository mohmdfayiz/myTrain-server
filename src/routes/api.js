import express from 'express'
import * as trainController from "../controller/trainController.js"
import * as testDataController from '../controller/testDataController.js'
const router = express.Router();

// CREATE TEST DATA
router
    .route('/createTestData')
    .post(testDataController.createTestData)

// GET WHOLE DATA
router
    .route('/getData')
    .get(trainController.getTrainData)

// GET POPULAR SERVICES
router
    .route('/getPopular')
    .get(trainController.getPopular)

// GET ALL STATION NAMES    
router
    .route('/getStations')
    .get(trainController.getStations)    

// SEARCH TRAINS FROM SOURCE TO DESTINATION
router
    .route('/searchTrain')
    .get(trainController.searchTrain)

export default router;