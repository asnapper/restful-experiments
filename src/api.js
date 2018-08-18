import { Router } from 'express'
import * as itemRepository from './repository'
import { createEndpoint } from './crud'

const router = new Router()

router.use('/items', createEndpoint(itemRepository, 'item'))

export default router