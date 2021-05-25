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

export type { Driver, Unique};