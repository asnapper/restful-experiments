import { items as entities } from './mocks'

export const getEntity = async (id) => {
    return entities.find(entity => entity.id === id)
}

export const getEntityCollection = async () => {
    return entities.filter(entity => !!entity)
}

export const createEntity = async (entity) => {
    const id = entities.length + 1
    entity = { ...entity, id }
    entities.push(entity)
    return entity
}

export const replaceEntity = async (id, entity) => {
    for(let i=0; i < entities.length; i++) {
        if (entities[i].id === id) {
            entities[i] = { ...entity, id }
            return entities[i]
        }
    }
    throw Error('Entity not found')
}

export const updateEntity = async (id, entity) => {
    for(let i=0; i < entities.length; i++) {
        if (entities[i] && entities[i].id === id) {
            entities[i] = { ...entities[i], ...entity, id }
            return entities[i]
        }
    }
    throw Error('Entity not found')
}

export const deleteEntity = async (id) => {
    for(let i=0; i < entities.length; i++) {
        if (entities[i] && entities[i].id === id) {
            entities[i] = null
            return entities[i]
        }
    }
    throw Error('Entity not found')
}

export function paginate(page, size) {
    return (collection) => {
        const start = page * size
        const end = start + size
        const result = collection.slice(start, end)
        return {
            result,
            more: collection.length > end,
            prev: page > 0
        }
    }
}