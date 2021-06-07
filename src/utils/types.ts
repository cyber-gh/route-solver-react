interface Unique {
    id: string
}

interface Location {
    address: string,
    latitude?: number,
    longitude?: number
}

interface Driver extends Unique {
    name: string,
    email: string,
    location: Location,
    weight?: string,
    volume?: string,
    schedule_begin?: string,
    schedule_end?: string,
}

interface Client extends Unique {
    name: string,
    email: string,
    location: Location,
    startTime?: string,
    endTime?: string,
    weight?: number
    volume?: number
}

export type {Client, Driver, Unique};
