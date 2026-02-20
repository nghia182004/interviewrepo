import { findCommonStudents, findCommonStudentsOfMany } from "../repositories/commonStudentRepository.js"
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
        if (!teacherIds || teacherIds.length === 0) {
            return []
        }

        const uniqueTeacherIds = [...new Set(teacherIds)]

        if (uniqueTeacherIds.length === 1) {
            const result = await findCommonStudents(uniqueTeacherIds)
            return result
        }
        else {
            const result = await findCommonStudentsOfMany(uniqueTeacherIds)
            return result
        }

    }
}

export default new GetCommonStudentsService()