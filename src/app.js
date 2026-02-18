import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'

import teacherRoutes from './routes/teacherRoute.js'
import studentRoutes from './routes/studentRoute.js'
import managementRoutes from './routes/managementRoute.js'

const app = express()

app.use(express.json())

app.use('/teacher', teacherRoutes)
app.use('/student', studentRoutes)
app.use('/api', managementRoutes)

app.use(errorHandler)

export default app