import DBconnection from "../config/db.js";

export const findAllStudents = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT id, email, is_suspended, created_at FROM students'

        DBconnection.query(sqlQuery, (err, results) => {
            if (err) return reject(err)
            if (results.length > 0) {
                return resolve(results[0].id)
            }
            resolve(null)
        })
    })
}
export const findStudentByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT id, email, is_suspended, created_at FROM students WHERE email = ?'

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)
            if (results.length > 0) {
                return resolve(results[0].id)
            }
            resolve(null)
        })
    })
}

export const createStudent = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO students (email) VALUES (?)'

        DBconnection.query(sqlQuery, [email], (err, results) => {
            if (err) return reject(err)

            resolve(results.insertId)

        })
    })
}

