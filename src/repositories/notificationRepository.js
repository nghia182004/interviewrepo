import DBconnection from "../config/db.js"

export const findAllUnsuspendedStudentsByTeacher = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT s.email
            FROM students s
            LEFT JOIN registrations r ON s.id = r.student_id
            LEFT JOIN teachers t ON r.teacher_id = t.id
            WHERE t.email = ? AND s.is_suspended = 0`

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)

            resolve(results)
        })
    })
}


export const findMentionedStudents = (emails) => {
    return new Promise((resolve, reject) => {
        const placeholders = emails.map(() => '?').join(',')
        const sqlQuery = `SELECT s.email
            FROM students s
            WHERE s.is_suspended = 0 AND s.email IN (${placeholders})
            `

        DBconnection.query(sqlQuery, [...emails, emails.length], (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}
