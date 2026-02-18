import express from 'express'
import Validate from '../middlewares/Validation.js'
import { commonStudentsSchema, registrationForTeacherSchema } from '../validators/emailValidation.js'
import { registerForTeacher } from '../controllers/api/registrationController.js'
import { GetCommonStudents } from '../controllers/api/commonStudentController.js'

const router = express.Router()

router.post('/register', Validate(registrationForTeacherSchema, 'body'), registerForTeacher)
router.get('/commonstudents', Validate(commonStudentsSchema, 'query'), GetCommonStudents)
export default router