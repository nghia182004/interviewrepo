import teacherService from "#services/teacherService";

export const createTeacher = async (req, res, next) => {
    try {
        const { email } = req.validatedBody
        const teacher = await teacherService.create(email)

        res.status(201).json({
            message: "Teacher created successfully",
            data: teacher
        })

    }
    catch (err) {

        next(err)
    }
}

export const getTeacherByEmail = async (req, res, next) => {
    try {
        const { email } = req.params
        const teacher = await teacherService.findByEmail(email)
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            })
        }

        res.status(200).json({
            data: teacher
        })

    }
    catch (err) {

        next(err)
    }
}


