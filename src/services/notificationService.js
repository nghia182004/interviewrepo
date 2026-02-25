import { findMentionedStudents, findAllUnsuspendedStudentsByTeacherId } from "../repositories/notificationRepository.js"
import { findTeacherByEmail } from "#repositories/teacherRepository";
import { Regex } from "#utils/regex";

class NotificationService {
    async getRecipients(teacher, notification) {
        const teacherId = await findTeacherByEmail(teacher);
        if (!teacherId) {
            const err = new Error(`Teacher with email ${teacher} doesn't exist`);
            err.status = 404;
            throw err;
        }

        const unsuspendedStudents = await findAllUnsuspendedStudentsByTeacherId(teacherId);

        const mentions = [...new Set(
            this.extractMentions(notification)
                .map(e => String(e).trim().toLowerCase())
                .filter(Boolean)
        )];

        const mentionedStudents = mentions.length
            ? await findMentionedStudents(mentions)
            : [];


        const emailSet = new Set();
        const recipients = [];
        for (const s of [...unsuspendedStudents, ...mentionedStudents]) {
            if (!emailSet.has(s.email)) {
                emailSet.add(s.email);
                recipients.push(s);
            }
        }

        return { recipients };
    }

    extractMentions(text) {
        if (!text) return [];

        const mentionRegex = new RegExp(Regex.source, Regex.flags);
        mentionRegex.lastIndex = 0;

        const mentions = [];
        let match;
        while ((match = mentionRegex.exec(text)) !== null) {
            mentions.push(match[1]);
        }
        return mentions;
    }
}

export default new NotificationService();