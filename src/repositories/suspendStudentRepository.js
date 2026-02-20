import DBconnection from "../config/db.js";

export const suspendStudent = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `update students s set s.is_suspended =
                            case when s.is_suspended=0 then  1
                            else  1
                            end 
                        where s.email=?`

        DBconnection.query(sqlQuery, [email], (err, result) => {
            if (err) return reject(err)
            resolve(null)
        })
    })
}