import express from 'express'
import Validate from '../middlewares/Validation.js'
import { commonStudentsSchema, notificationSchema, registrationForTeacherSchema, suspendedStudentSchema } from '../validators/ValidationSchema.js'
import { registerForTeacher } from '../controllers/api/registrationController.js'
import { GetCommonStudents } from '../controllers/api/commonStudentController.js'
import { suspendStudent } from '../controllers/api/suspendStudentController.js'
import { getRecipients } from '../controllers/api/notificationController.js'


const router = express.Router()

router.post('/register', Validate(registrationForTeacherSchema, 'body'), registerForTeacher)
router.get('/commonstudents', Validate(commonStudentsSchema, 'query'), GetCommonStudents)
router.post('/suspend', Validate(suspendedStudentSchema, 'body'), suspendStudent)
router.post('/retrievefornotifications', Validate(notificationSchema, 'body'), getRecipients)
export default router