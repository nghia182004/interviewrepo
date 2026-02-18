import { findCommonStudents } from "../repositories/commonStudentRepository.js"
import { findTeacherByEmail } from "../repositories/teacherRepository.js"

class GetCommonStudentsService {
    async get(teachers) {
        const teacherIds = await Promise.all(
            teachers.map(async (email) => {
                const teacherId = await findTeacherByEmail(email)
                if (!teacherId) {
                    throw new Error(`Teacher with email ${email} doesn't exists`)
                }
                return teacherId
            })
        )
        const result = await findCommonStudents(teacherIds)

        return result

    }
}

export default new GetCommonStudentsService()