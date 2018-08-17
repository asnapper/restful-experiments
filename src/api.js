import { Router } from 'express'
import bodyParser from 'body-parser'
import hal from 'hal'
import * as repository from './repository'

const router = new Router()

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

function paging(req, res, next) {
    // paging defaults
    req.query.page  = req.query.page ? parseInt(req.query.page, 10) : 0
    req.query.limit = req.query.limit ? parseInt(req.query.limit, 10) : 5
    next()
}

function resource(req, res, next) {
    res.resource = new hal.Resource({}, req.path)
    next()
}

function sendResource(req, res) {
    res.send(res.resource)
}

router

.use(bodyParser.json())

.use(paging)

.use(resource)

.get('/', asyncMiddleware(async (req, res, next) => {
    const page = await repository.getEntityCollection().then(repository.paginate(req.query.page, req.query.limit))

    if (page.more) {
        res.resource.link("next", `${req.path}?page=${req.query.page + 1}&limit=${req.query.limit}`)
    }

    if (page.prev) {
        res.resource.link("prev", `${req.path}?page=${req.query.page - 1}&limit=${req.query.limit}`)
    }

    res.resource.embed("items", page.result.map(item => new hal.Resource(item, `${req.path}${item.id}`)))

    next()
}), sendResource)

.post('/', asyncMiddleware(async (req, res, next) => {
    res.send(await repository.createEntity(req.body))

    next()
}), sendResource)

.get('/:id', asyncMiddleware(async (req, res) => {
    res.send(await repository.getEntity(req.params.id))

    next()
}), sendResource)

.put('/:id', asyncMiddleware(async (req, res) => {
    res.send(await repository.replaceEntity(req.params.id, req.body))
}))

.patch('/:id', asyncMiddleware(async (req, res) => {
    res.send(await repository.updateEntity(req.params.id, req.body))
}))

.delete('/:id', asyncMiddleware(async (req, res) => {
    res.send(await repository.deleteEntity(req.params.id))
}))

export default router