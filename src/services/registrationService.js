import { registerForTeacher } from "#repositories/registrationRepository";
import { findStudentByEmail } from "#repositories/studentRepository";
import { findTeacherByEmail } from "#repositories/teacherRepository";

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
                    const err = new Error(`Student with email ${email} doesn't exist`);
                    err.status = 404;
                    throw err;
                }
                return studentId
            })
        )

        await registerForTeacher(teacherId, studentIds)

        return


    }
}

export default new RegistrationService()