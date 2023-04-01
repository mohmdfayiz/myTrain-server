import "dotenv/config";
import express from "express";
import dbConnection from "./config/connection.js";
import api from "./routes/api.js"
import createHttpError from "http-errors";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from 'cors'
import morgan from "morgan";

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*', methods: ["GET"] }))
app.use(morgan('dev'))

// Health check
app.get('/', (req, res) => res.status(200).json({ message: "OK" }))

// API Routes
app.use('/api', api)

app.use(() => { throw createHttpError(404, 'Route not found') });
app.use(errorHandler);

try {
    dbConnection()
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    })
} catch (error) {
    console.log(error);
}
