import DBconnection from "../config/db.js";

export const findCommonStudents = (teacherIds) => {
    return new Promise((resolve, reject) => {

        const sqlQuery = `
                SELECT DISTINCT s.id, s.email, s.is_suspended
                FROM students s
                INNER JOIN registrations r ON s.id = r.student_id
                WHERE r.teacher_id = ?
                ORDER BY s.email
            `

        DBconnection.query(sqlQuery, [teacherIds[0]], (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })

    })
}


export const findCommonStudentsOfMany = (teacherIds) => {
    return new Promise((resolve, reject) => {
        const placeholders = teacherIds.map(() => '?').join(',')
        const sqlQuery = `
                SELECT s.id, s.email, s.is_suspended
                FROM students s
                INNER JOIN registrations r ON s.id = r.student_id
                WHERE r.teacher_id IN (${placeholders})
                GROUP BY s.id, s.email, s.is_suspended
                HAVING COUNT(DISTINCT r.teacher_id) = ?
                ORDER BY s.email
            `

        DBconnection.query(sqlQuery, [...teacherIds, teacherIds.length], (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}


