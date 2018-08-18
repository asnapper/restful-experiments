import { Router } from 'express'
import { jsonParser, paging, handleAsync } from './middleware'
import { toPagedResourceCollection } from './resource'

export const createEndpoint = (repository, name) => {
    return new Router()

    .use(jsonParser)

    .use(paging)

    .get('/', handleAsync(async (req, res, next) => {
        return res.send(
            await repository.getEntityCollection()
                .then(repository.paginate(req.query.page, req.query.limit))
                .then(toPagedResourceCollection(name, req.baseUrl.replace(/\/$/, '')))
        )
    }))

    .post('/', handleAsync(async (req, res, next) => {
        res.send(await repository.createEntity(req.body))
    }))

    .get('/:id', handleAsync(async (req, res) => {
        res.send(await repository.getEntity(req.params.id))
    }))

    .put('/:id', handleAsync(async (req, res) => {
        res.send(await repository.replaceEntity(req.params.id, req.body))
    }))

    .patch('/:id', handleAsync(async (req, res) => {
        res.send(await repository.updateEntity(req.params.id, req.body))
    }))

    .delete('/:id', handleAsync(async (req, res) => {
        res.send(await repository.deleteEntity(req.params.id))
    }))
}
