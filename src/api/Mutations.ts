import {gql} from "@apollo/client";

const ADD_CLIENT = gql`
    mutation addClient ($client: DeliveryClientInputForm!) {
    addClient (client: $client) {
        id
        name
        email
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
 `

const ADD_DRIVER = gql`
    mutation addDriver ($name: String!, $email: String!, $address: String!) {
    addDriver (name: $name, email: $email, address: $address) {
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

const DELETE_CLIENT = gql`
   mutation removeClient ($id: String!) {
      removeClient (id: $id)
  }
`

const ADD_ROUTE = gql`
mutation addRoute ($name: String!, $startAddress: String!, $roundTrip: Boolean!) {
    addRoute (name: $name, startAddress: $startAddress, roundTrip: $roundTrip) {
        id
        name
        state
        roundTrip
        startTime
    }
}
`

const DELETE_ROUTE = gql`
    mutation deleteRoute ($routeId: String!) {
    deleteRoute (routeId: $routeId)
}
`

const OPTIMIZER_ROUTE = gql`
 mutation solveRoute ($routeId: String!, $algorithm: VRPAlg!) {
    solveRoute (routeId: $routeId, algorithm: $algorithm) {
        id
        algorithm
        nrOrders
        distance
        time
        totalWeight
        totalVolume
        
    }
}
`

const DELETE_SOLUTION = gql`
 mutation deleteSolution ($id: String!) {
    deleteSolution (id: $id)
}
`

const ADD_ORDER = gql`
mutation addOrder ($routeId: String!, $address: String!, $name: String!) {
    addOrder (routeId: $routeId, address: $address, name: $name) {
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
`

const DELETE_ORDER = gql`
 mutation deleteOrder ($orderId: String!) {
    deleteOrder (orderId: $orderId)
}
`

const ADD_DETAILED_ORDER = gql`
mutation addDetailedOrder ($order: DeliveryOrderInputForm!) {
    addDetailedOrder (order: $order) {
        id
        name
        startTime
        endTime
        weight
        volume
    }
}
`

const ADD_ORDER_FROM_CLIENT = gql`
    mutation addOrderByClient ($routeId: String!, $clientIds: [String!]!) {
        addOrderByClient (routeId: $routeId, clientIds: $clientIds) {
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
`;

export {ADD_CLIENT, DELETE_CLIENT, ADD_DRIVER, DELETE_ROUTE, ADD_ROUTE, OPTIMIZER_ROUTE, DELETE_SOLUTION, ADD_ORDER, DELETE_ORDER, ADD_DETAILED_ORDER, ADD_ORDER_FROM_CLIENT}
