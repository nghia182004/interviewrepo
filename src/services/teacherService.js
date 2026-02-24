import { findTeacherByEmail, createTeacher } from '#repositories/teacherRepository'
class TeacherService {
    async create(email) {
        const existingTeacher = await findTeacherByEmail(email)
        if (existingTeacher) {
            throw new Error(`Teacher with email ${email} already exists`)
        }

        const teacherId = await createTeacher(email)
        return { id: teacherId, email }
    }

    async findByEmail(email) {
        return await findTeacherByEmail(email)
    }


}

export default new TeacherService()