import express from 'express'
import { createStudent, getStudentByEmail } from '../controllers/studentController.js'
import Validate from '../middlewares/Validation.js'
import { emailSchema } from '../validators/emailValidation.js'

const router = express.Router()

router.post('/', Validate(emailSchema, 'body'), createStudent)


router.get('/:email', Validate(emailSchema, 'params'), getStudentByEmail)


export default router