export interface Entity {
    id: string
}

export interface EntityOwnership {
    owner: string
}

export interface EntityTenancy {
    tenant: string
}

export interface EntityVisibility {
    public: boolean
}

export interface Item extends Entity, EntityOwnership, EntityTenancy, EntityVisibility {
    name: string
    id: string
}

export const items: Item[] = [
    { id: '1', name: 'bla1', owner: '1', tenant: '1', public: true  },
    { id: '2', name: 'bla2', owner: '1', tenant: '1', public: false },
    { id: '3', name: 'bla3', owner: '2', tenant: '1', public: true  },
    { id: '4', name: 'bla4', owner: '2', tenant: '2', public: false },
    { id: '5', name: 'bla5', owner: '3', tenant: '2', public: true  },
    { id: '6', name: 'bla6', owner: '3', tenant: '2', public: false }
]

export interface User extends Entity, EntityTenancy {
    name: string
    password: string
    roles: string[]
}

export const users: User[] = [
    { id: '1', name: 'someuser1', tenant: '1', password: 'dev', roles: [ 'admin' ] },
    { id: '2', name: 'someuser2', tenant: '1', password: 'dev', roles: [ 'user'  ] },
    { id: '3', name: 'someuser3', tenant: '1', password: 'dev', roles: [ 'guest' ] },
    { id: '4', name: 'someuser4', tenant: '2', password: 'dev', roles: [ 'admin' ] },
    { id: '5', name: 'someuser5', tenant: '2', password: 'dev', roles: [ 'user'  ] },
    { id: '6', name: 'someuser6', tenant: '2', password: 'dev', roles: [ 'guest' ] },
    { id: '7', name: 'someuser7', tenant: '0', password: 'dev', roles: [ 'root'  ] }
]

export interface Tenant extends Entity {
    name: string
}

export const tenants: Tenant[] = [
    { id: '1', name: 'sometenant1' },
    { id: '2', name: 'sometenant2' },
    { id: '3', name: 'sometenant3' },
    { id: '4', name: 'sometenant4' },
    { id: '5', name: 'sometenant5' },
    { id: '6', name: 'sometenant6' }
]