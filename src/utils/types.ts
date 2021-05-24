interface Driver {
    name: string,
    address: string,
    shift: string;
}

interface DriverForm {
    name: string,
    email: string,
    location: string,
    weight?: string,
    volume?: string,
    schedule?: string
}

export type {Driver, DriverForm};