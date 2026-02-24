import { findStudentByEmail } from "#repositories/studentRepository";
import { suspendStudent } from "#repositories/suspendStudentRepository";

class SuspendStudent {
    async suspend(email) {
        const existingStudent = await findStudentByEmail(email)
        if (!existingStudent) {
            throw new Error(`Student with email ${email} doesn't exists`)
        }

        const result = await suspendStudent(email)

        return


    }
}

export default new SuspendStudent()