import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import teacherRoutes from './routes/teacherRoute.js'
import studentRoutes from './routes/studentRoute.js'
import managementRoutes from './routes/managementRoute.js'

import cors from 'cors'
const app = express()
const allowedOrigins = [
    //placeholders
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json())

app.use('/teacher', teacherRoutes)
app.use('/student', studentRoutes)
app.use('/api', managementRoutes)

app.use(errorHandler)

export default app