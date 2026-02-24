import { findMentionedStudents, findAllUnsuspendedStudentsByTeacher } from "../repositories/notificationRepository.js"
import { findTeacherByEmail } from "#repositories/teacherRepository";
import { Regex } from "#utils/regex";

class NotificationService {
    async getRecipients(teacher, notification) {
        const teacherId = await findTeacherByEmail(teacher)
        if (!teacherId) {
            throw new Error(`Teachers with email ${teacher} doesn't exists`)
        }
        const unsuspendedStudents = await findAllUnsuspendedStudentsByTeacher(teacher)
        const mentions = this.extractMentions(notification);

        let allRecipients = [...unsuspendedStudents];
        if (mentions.length > 0) {
            const mentionedStudents = await findMentionedStudents(mentions);
            allRecipients = [...unsuspendedStudents, ...mentionedStudents];
        }
        const uniqueRecipients = [...new Set(allRecipients)];

        return { recipients: uniqueRecipients };



    }
    extractMentions(text) {

        const mentionRegex = Regex
        const mentions = [];
        let match;

        while ((match = mentionRegex.exec(text)) !== null) {
            mentions.push(match[1]);
        }

        return mentions;
    }
}

export default new NotificationService()