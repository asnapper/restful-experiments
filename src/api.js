import { Router } from 'express'
import { createArrayRepository } from './repository'
import { createEndpoint } from './crud'
import { items, users, tenants } from './mocks'

const router = new Router()

router.use('/items',   createEndpoint(createArrayRepository(items),   'item'   ))
router.use('/users',   createEndpoint(createArrayRepository(users),   'user'   ))
router.use('/tenants', createEndpoint(createArrayRepository(tenants), 'tenants'))

export default router