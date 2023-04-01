import trainModel from "../models/trainModel.js"
import createHttpError from "http-errors";

// GET ALL TRAIN DITAILS
export const getTrainData = async (req, res, next) => {
    try {
        const allTrains = await trainModel.find({})
        if (!allTrains.length) next(createHttpError(404, 'Data could not find'))
        res.status(200).json({ allTrains })
    } catch (error) {
        return next(createHttpError(500, 'Internal server error!'))
    }
}

// GET ALL STATIONS
export const getStations = async (req, res, next) => {
    try {
        const stations = await trainModel.distinct('route.stationName', {}, { sort: { 'route.stationName': 1 } })
        res.status(200).json({ stations })
    } catch (error) {
        return next(createHttpError(500, 'Internal server error!'))
    }
}

//GET POPULAR
export const getPopular = async (req, res, next) => {
    try {
        const popular = await trainModel.aggregate([{ $sample: { size: 4 } }]);
        res.status(200).json({ popular })
    } catch (error) {
        return next(createHttpError(500, 'Internal server error!'))
    }
}

//SEARCH TRAIN IN A ROUTE
export const searchTrain = async (req, res, next) => {
    try {
        const { source, destination } = req.query;
        const searchResult = await trainModel.aggregate([
            {
                $match: {
                    $and: [
                        { 'route.stationName': source },
                        { 'route.stationName': destination },
                    ]
                }
            },
            {
                $project: {
                    isSourceBeforeDestination: {
                        $cond: [
                            { $lt: [{ $indexOfArray: ['$route.stationName', source] }, { $indexOfArray: ['$route.stationName', destination] }] },
                            true,
                            false
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    trainIds: { $push: '$_id' }
                }
            },
            {
                $project: {
                    _id: 0,
                    trainIds: 1
                }
            }
        ])

        if (searchResult.length) {
            const result = await trainModel.find({ _id: { $in: searchResult[0].trainIds } })
            return res.status(200).json(result)
        }

        res.sendStatus(404)

    } catch (error) {
        console.log(error);
        return next(createHttpError(500, 'Internal server error!'))
    }
}