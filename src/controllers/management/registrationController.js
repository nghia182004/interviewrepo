import registrationService from "#services/registrationService"

export const registerForTeacher = async (req, res, next) => {
    try {
        const { teacher, students } = req.validatedBody
        const result = await registrationService.register(teacher, students)
        res.status(204)
    }
    catch (err) {
        next(err)
    }
}