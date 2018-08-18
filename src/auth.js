
export const jwtSecret = process.env.JWT_SECRET || 'devsecret'

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader.split('BEARER ')[1]
    const [ payload, signature ] = token.split('.')
}