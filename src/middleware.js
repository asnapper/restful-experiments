import bodyParser from 'body-parser'

export const handleAsync = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const paging = (req, res, next) => {
    // paging defaults
    req.query.page  = req.query.page ? parseInt(req.query.page, 10) : 0
    req.query.limit = req.query.limit ? parseInt(req.query.limit, 10) : 5
    next()
}

export const jsonParser = bodyParser.json()