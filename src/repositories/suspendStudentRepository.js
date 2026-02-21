import DBconnection from "../config/db.js";

export const suspendStudent = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE students s 
            SET s.is_suspended = 
                CASE 
                    WHEN s.is_suspended = 0 THEN 1
                    ELSE 1
                END 
            WHERE s.email = ?`

        DBconnection.query(sqlQuery, [email], (err, result) => {
            if (err) return reject(err)
            resolve(null)
        })
    })
}