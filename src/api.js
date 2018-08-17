import { Router } from 'express'
import bodyParser from 'body-parser'
import * as repository from './repository'
import { toPagedResourceCollection } from './resource'

const router = new Router()

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

function paging(req, res, next) {
    // paging defaults
    req.query.page  = req.query.page ? parseInt(req.query.page, 10) : 0
    req.query.limit = req.query.limit ? parseInt(req.query.limit, 10) : 5
    next()
}

router

.use(bodyParser.json())

.use(paging)

.get('/', asyncMiddleware(async (req, res, next) => {
    return res.send(
        await repository.getEntityCollection()
            .then(repository.paginate(req.query.page, req.query.limit))
            .then(toPagedResourceCollection('item', req.path.replace(/\/$/, '')))
    )
}))

.post('/', asyncMiddleware(async (req, res, next) => {
    res.send(await repository.createEntity(req.body))
}))

.get('/:id', asyncMiddleware(async (req, res) => {
    res.send(await repository.getEntity(req.params.id))
}))

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