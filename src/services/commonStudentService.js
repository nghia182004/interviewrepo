import {
    findCommonStudents,
    findCommonStudentsOfMany,
} from "#repositories/commonStudentRepository";
import { findTeacherByEmail } from "#repositories/teacherRepository";

class GetCommonStudentsService {
    async get(teachers) {

        if (!Array.isArray(teachers) || teachers.length === 0) return [];

        const teacherIds = await Promise.all(
            teachers.map(async (email) => {
                const teacherId = await findTeacherByEmail(email);
                if (!teacherId) {
                    throw new Error(`Teacher with email ${email} doesn't exists`);
                }
                return teacherId;
            })
        );


        const uniqueTeacherIds = [...new Set(teacherIds)];

        if (uniqueTeacherIds.length === 1) {
            return await findCommonStudents(uniqueTeacherIds);
        }

        return await findCommonStudentsOfMany(uniqueTeacherIds);
    }
}

export default new GetCommonStudentsService();