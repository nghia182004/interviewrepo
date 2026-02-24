import express from 'express'
import { createStudent, getStudentByEmail } from '#controllers/studentController'
import Validate from '#middlewares/validation'
import { emailSchema } from '#validators/ValidationSchema'

const router = express.Router()

router.post('/', Validate(emailSchema, 'body'), createStudent)


router.get('/:email', Validate(emailSchema, 'params'), getStudentByEmail)


export default router