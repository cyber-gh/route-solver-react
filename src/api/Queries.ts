import {gql} from "@apollo/client";

const DRIVERS_QUERY = gql`
  query drivers {
    drivers {
        id
        name
        email
        location {
            address
        }
    }
}  
`

const CLIENTS_QUERY = gql`
    query clients {
    clients {
        id
        name
        email
        location {
            address
            latitude
            longitude
        }
    }
}
`

export {DRIVERS_QUERY, CLIENTS_QUERY}
