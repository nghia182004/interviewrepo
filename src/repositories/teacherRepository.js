import DBconnection from "../config/db.js";

export const findAllTeachers = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT id, email, created_at FROM teachers'

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)
            if (results.length > 0) {
                return resolve(results[0].id)
            }
            resolve(null)
        })
    })
}
export const findTeacherByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT id, email, created_at FROM teachers WHERE email = ?'

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)
            if (results.length > 0) {
                return resolve(results[0].id)
            }
            resolve(null)
        })
    })
}

export const createTeacher = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'insert into teachers (email) values (?)'

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)

            resolve(results.insertId)

        })
    })
}