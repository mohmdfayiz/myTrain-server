import { Schema, model } from "mongoose";

const trainSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    route: [{
        stationName: {
            type: String,
            required: true
        },
        stationNumber:{
            type:Number,
            required:true
        },
        distanceFromPrevious: {
            type: Number,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        }
    }]
});

export default model('Train', trainSchema);