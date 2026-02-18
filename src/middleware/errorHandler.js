export const errorHandler = (req, res, err, next) => {
    console.log(err.stack)

    res.status(err.statusCode).send(err.message)
}