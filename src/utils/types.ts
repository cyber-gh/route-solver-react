interface Unique {
    id: string
}

interface Driver extends Unique {
    name: string,
    email: string,
    location: string,
    weight?: string,
    volume?: string,
    schedule_begin?: string,
    schedule_end?: string,
}

interface Client extends Unique {
    name: string,
    email: string,
    address: string,
    time_begin?: string,
    time_end?: string,
    weight: string
}

export type {Client, Driver, Unique};