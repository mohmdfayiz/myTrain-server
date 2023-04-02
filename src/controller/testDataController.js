import trainModel from '../models/trainModel.js'
// import { faker } from '@faker-js/faker'

// GENERATE TEST DATA USING FAKER
export const createTestData = (req, res) => {

    let trains = []
    let stations = []
    let routes = []
    let start = 0
    let count = 1000

    for (let i = 0; i < 100; i++) {
        let stationName = faker.address.cityName()
        let trainName = `${faker.vehicle.model()} Express`
        stations.push(stationName)
        trains.push(trainName)
    }

    for (start; start < count; start++) {

        for (let i = 0; i <= 3; i++) {
            let route = {
                stationName: stations[Math.floor(Math.random() * 100)],
                stationNumber:i+1,
                distanceFromPrevious: i === 0 ? 0 : faker.random.numeric(2),
                departureTime: faker.date.recent(10),
            }
            routes.push(route)
        }

        const newTrains = new trainModel({
            name: trains[Math.floor(Math.random() * 100)],
            route: routes
        })

        newTrains.save().then((err, doc) => {
            if (err) console.log(err)
        })

        routes = []
    }

    start === count && res.sendStatus(200)
}