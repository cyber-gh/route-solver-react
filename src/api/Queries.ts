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

const ROUTES_QUERY = gql`
    query routes {
    routes {
        id
        name
        state
        startTime
    }
}
`

export {DRIVERS_QUERY, CLIENTS_QUERY, ROUTES_QUERY}
