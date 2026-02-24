import studentService from "#services/studentService";

export const createStudent = async (req, res, next) => {
    try {
        const { email } = req.validatedBody
        const student = await studentService.create(email)

        res.status(201).json({
            message: "Student created successfully",
            data: student
        })

    }
    catch (err) {

        next(err)
    }
}

export const getStudentByEmail = async (req, res, next) => {
    try {
        const { email } = req.params
        const student = await studentService.findByEmail(email)
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        res.status(200).json({
            data: student
        })

    }
    catch (err) {

        next(err)
    }
}