import suspendStudentService from "../../services/suspendStudentService.js"

export const suspendStudent = async (req, res, next) => {
    try {
        const { student } = req.validatedBody
        const result = await suspendStudentService.suspend(student)
        res.status(204).json({
            message: result.message,
        })
    }
    catch (err) {
        next(err)
    }
}