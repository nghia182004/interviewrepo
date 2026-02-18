import DBconnection from "../config/db.js";

export const findCommonStudents = (teacherIds) => {
    return new Promise((resolve, reject) => {
        if (!teacherIds || teacherIds.length === 0) {
            return resolve([])
        }


        if (teacherIds.length === 1) {
            const sql = `
                SELECT DISTINCT s.id, s.email, s.is_suspended
                FROM students s
                INNER JOIN registrations r ON s.id = r.student_id
                WHERE r.teacher_id = ?
                ORDER BY s.email
            `

            DBconnection.query(sql, [teacherIds[0]], (err, results) => {
                if (err) return reject(err)
                resolve(results)
            })
        } else {

            const placeholders = teacherIds.map(() => '?').join(',')
            const sql = `
                SELECT s.id, s.email, s.is_suspended
                FROM students s
                INNER JOIN registrations r ON s.id = r.student_id
                WHERE r.teacher_id IN (${placeholders})
                GROUP BY s.id, s.email, s.is_suspended
                HAVING COUNT(DISTINCT r.teacher_id) = ?
                ORDER BY s.email
            `

            DBconnection.query(sql, [...teacherIds, teacherIds.length], (err, results) => {
                if (err) return reject(err)
                resolve(results)
            })
        }
    })
}