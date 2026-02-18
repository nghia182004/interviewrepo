import { findStudentByEmail, createStudent } from '../repositories/studentRepository.js'
class StudentService {
    async create(email) {
        const existingStudent = await findStudentByEmail(email)

        if (existingStudent) {
            throw new Error(`Student with email ${email} already exists`)
        }

        const studentId = await createStudent(email)

        return { id: studentId, email }
    }

    async findByEmail(email) {
        return await findStudentByEmail(email)
    }
}

export default new StudentService()