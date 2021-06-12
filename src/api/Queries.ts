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
const ROUTES_AND_ORDERS_QUERY = gql`
    query routesWithOrders {
    routes {
        id
        name
        state
        startTime
        orders {
            id
            name
            startTime
            endTime
            weight
            volume
            location {
                address
                latitude
                longitude
            }
        }
    }
}
`

const ROUTE_WITH_ORDERS = gql`

query findRoute ($id: String!) {
    findRoute (id: $id) {
        id
        name
        state
        roundTrip
        orders {
            id
            name
            startTime
            endTime
            weight
            volume
            location {
                address
                latitude
                longitude
            }
        }
        
        startLocation {
            address
            latitude
            longitude
        }
        
        startTime
    }
}
`

const ROUTE_SOLUTIONS = gql`
query findRouteWithSolutions ($id: String!) {
    findRoute (id: $id) {
        id
        name
        state
        startTime
        
        solutions {
            id
            algorithm
            nrOrders
            distance
            time
            totalWeight
            totalVolume
            orders {
                id
                order
                estimatedArrivalTime
                estimatedDepartureTime
                details {
                    id
                    name
                    location {
                        address
                        latitude
                        longitude
                    }
                }
            }
            directions {
                id
                geometry
                distance
                duration
            }
        }
        startLocation {
            address
            latitude
            longitude
        }
        
        
    }
}
`

export {DRIVERS_QUERY, CLIENTS_QUERY, ROUTES_QUERY, ROUTES_AND_ORDERS_QUERY, ROUTE_WITH_ORDERS, ROUTE_SOLUTIONS}
