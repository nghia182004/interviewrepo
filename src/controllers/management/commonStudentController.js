import GetCommonStudentsService from "#services/commonStudentService";
export const GetCommonStudents = async (req, res, next) => {
    try {
        const { teacher } = req.validatedBody
        const teacherEmails = Array.isArray(teacher) ? teacher : [teacher]

        const students = await GetCommonStudentsService.get(teacherEmails)
        res.status(200).json({
            students: students.map(s => s.email)
        })
    }
    catch (err) {
        next(err)
    }
}