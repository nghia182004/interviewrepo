import DBconnection from "../config/db.js";

export const registerForTeacher = (teacher, students) => {
    return new Promise((resolve, reject) => {
        const value = students.map(student => [teacher, student])
        const sqlQuery = 'INSERT IGNORE INTO registrations (teacher_id, student_id) VALUES ?'

        DBconnection.query(sqlQuery, [value], (err, results) => {
            if (err) return reject(err)

            resolve(null)
        })
    })
}
