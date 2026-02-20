import { findStudentByEmail } from "../repositories/studentRepository.js";
import { suspendStudent } from "../repositories/suspendStudentRepository.js";

class SuspendStudent {
    async suspend(email) {
        const existingStudent = await findStudentByEmail(email)
        if (!existingStudent) {
            throw new Error(`Student with email ${email} doesn't exists`)
        }

        const result = await suspendStudent(email)

        return { message: `Student with email: ${email} has been suspended` }


    }
}

export default new SuspendStudent()