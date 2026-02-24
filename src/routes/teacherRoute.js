import express from 'express'
import { createTeacher, getTeacherByEmail } from '#controllers/teacherController'
import { emailSchema } from '#validators/ValidationSchema'
import Validate from '#middlewares/validation'

const router = express.Router()

router.post('/', Validate(emailSchema, 'body'), createTeacher)


router.get('/:email', Validate(emailSchema, 'params'), getTeacherByEmail)

export default router