import hal from 'hal'

export const toPagedResourceCollection = (name, prefix) => {
    return (pageInfo) => {
        const resourceCollection = new hal.Resource({
            count: pageInfo.data.length
        }, `${prefix}?page=${pageInfo.page}&limit=${pageInfo.limit}`)

        if (pageInfo.more) {
            resourceCollection.link("next", `${prefix}?page=${pageInfo.page + 1}&limit=${pageInfo.limit}`)
        }
    
        if (pageInfo.prev) {
            resourceCollection.link("prev", `${prefix}?page=${pageInfo.page - 1}&limit=${pageInfo.limit}`)
        }

        resourceCollection.embed(name, pageInfo.data.map(entity => new hal.Resource(entity, `${prefix}/${entity.id}`)))

        return resourceCollection
    }
}