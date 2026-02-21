import registrationService from "../../services/registrationService.js"

export const registerForTeacher = async (req, res, next) => {
    try {
        const { teacher, students } = req.validatedBody
        const result = await registrationService.register(teacher, students)
        res.status(204).json({
            message: result.message,
        })
    }
    catch (err) {
        next(err)
    }
}