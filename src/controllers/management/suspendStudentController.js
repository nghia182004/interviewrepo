import suspendStudentService from "#services/suspendStudentService"

export const suspendStudent = async (req, res, next) => {
    try {
        const { student } = req.validatedBody
        const result = await suspendStudentService.suspend(student)
        return res.sendStatus(204);
    }
    catch (err) {
        next(err)
    }
}