import { registerForTeacher } from "../repositories/registrationRepository.js";
import { findStudentByEmail } from "../repositories/studentRepository.js";
import { findTeacherByEmail } from "../repositories/teacherRepository.js";

class RegistrationService {
    async register(teacher, students) {
        const teacherId = await findTeacherByEmail(teacher)
        if (!teacherId) {
            throw new Error(`Teachers with email ${teacher} doesn't exists`)
        }
        const studentIds = await Promise.all(
            students.map(async (email) => {
                const studentId = await findStudentByEmail(email)
                if (!studentId) {
                    throw new Error(`Student with email ${email} doesn't exists`)
                }
                return studentId
            })
        )

        const result = await registerForTeacher(teacherId, studentIds)

        return { message: "Resgister successfully" }


    }
}

export default new RegistrationService()