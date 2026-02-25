import { findStudentByEmail } from "#repositories/studentRepository";
import { suspendStudent } from "#repositories/suspendStudentRepository";

class SuspendStudent {
    async suspend(email) {
        const existingStudent = await findStudentByEmail(email)
        if (!existingStudent) {
            const err = new Error(`Student with email ${email} doesn't exists`)
            err.status = 404;
            throw err;
        }

        await suspendStudent(email)

        return


    }
}

export default new SuspendStudent()