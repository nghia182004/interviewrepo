import notificationService from "../../services/notificationService.js"

export const getRecipients = async (req, res, next) => {
    try {
        const { teacher, notification } = req.validatedBody
        const result = await notificationService.getRecipients(teacher, notification)
        res.status(200).json({
            recipients: result.recipients.map((item) => item.email)
        })
    }
    catch (err) {
        next(err)
    }
}