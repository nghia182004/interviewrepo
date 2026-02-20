import Joi from 'joi'


export const emailSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty'
        })
})

export const registrationForTeacherSchema = Joi.object({
    teacher: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty'
        }),

    students: Joi.array().items(Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty'
    }))
})

export const commonStudentsSchema = Joi.object({
    teacher: Joi.alternatives()
        .try(
            Joi.string().email(),
            Joi.array().items(Joi.string().email()).min(1)
        )
        .required()
        .messages({
            'alternatives.match': 'Teacher must be a valid email or array of emails',
            'any.required': 'Teacher parameter is required',
            'string.email': 'Invalid teacher email format'
        })
})

export const suspendedStudentSchema = Joi.object({
    student: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty'
    })
})

export const notificationSchema = Joi.object({
    teacher: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty'
    }),
    notification: Joi.string().required().messages({
        'string': 'Invalid format',
        'any.required': 'Notification is required',
        'string.empty': 'Notification cannot be empty'
    })
})