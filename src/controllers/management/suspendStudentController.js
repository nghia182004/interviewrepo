import suspendStudentService from "#services/suspendStudentService"

export const suspendStudent = async (req, res, next) => {
    try {
        const { student } = req.validatedBody
        const result = await suspendStudentService.suspend(student)
        res.status(204)
    }
    catch (err) {
        next(err)
    }
}