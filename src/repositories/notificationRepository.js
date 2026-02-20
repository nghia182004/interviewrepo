import DBconnection from "../config/db.js"

export const findAllUnsuspendedStudentsByTeacher = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `select s.email
from students s
left join registrations r on s.id=r.student_id
left join teachers t on r.teacher_id=t.id
where t.email=? and s.is_suspended=0`

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)

            resolve(results)
        })
    })
}


export const findMentionedStudents = (emails) => {
    return new Promise((resolve, reject) => {
        const placeholders = emails.map(() => '?').join(',')
        const sqlQuery = `
             
                select s.email
                    from students s
                where s.is_suspended=0 and s.email in (${placeholders})
            `

        DBconnection.query(sqlQuery, [...emails, emails.length], (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}
