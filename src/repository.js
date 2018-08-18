export const createArrayRepository = (entitiesArray) => {
    const getEntity = async (id) => {
        return entitiesArray.find(entity => entity.id === id)
    }
    
    const getEntityCollection = async () => {
        return entitiesArray.filter(entity => !!entity)
    }
    
    const createEntity = async (entity) => {
        const id = entitiesArray.length + 1
        entity = { ...entity, id }
        entitiesArray.push(entity)
        return entity
    }
    
    const replaceEntity = async (id, entity) => {
        for(let i=0; i < entitiesArray.length; i++) {
            if (entitiesArray[i].id === id) {
                entitiesArray[i] = { ...entity, id }
                return entitiesArray[i]
            }
        }
        throw Error('Entity not found')
    }
    
    const updateEntity = async (id, entity) => {
        for(let i=0; i < entitiesArray.length; i++) {
            if (entitiesArray[i] && entitiesArray[i].id === id) {
                entitiesArray[i] = { ...entitiesArray[i], ...entity, id }
                return entitiesArray[i]
            }
        }
        throw Error('Entity not found')
    }
    
    const deleteEntity = async (id) => {
        for(let i=0; i < entitiesArray.length; i++) {
            if (entitiesArray[i] && entitiesArray[i].id === id) {
                entitiesArray[i] = null
                return entitiesArray[i]
            }
        }
        throw Error('Entity not found')
    }
    
    function paginate(page, limit) {
        return (collection) => {
            const start = page * limit
            const end = start + limit
            const data = collection.slice(start, end)
            return {
                data,
                page,
                limit,
                more: collection.length > end,
                prev: page > 0
            }
        }
    }

    return {
        getEntity,
        getEntityCollection,
        createEntity,
        replaceEntity,
        updateEntity,
        deleteEntity,
        paginate
    }
}

