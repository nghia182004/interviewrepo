import express from 'express'
import { createTeacher, getTeacherByEmail } from '../controllers/teacherController.js'
import { emailSchema } from '../validators/ValidationSchema.js'
import Validate from '../middlewares/validation.js'

const router = express.Router()

router.post('/', Validate(emailSchema, 'body'), createTeacher)


router.get('/:email', Validate(emailSchema, 'params'), getTeacherByEmail)

export default router