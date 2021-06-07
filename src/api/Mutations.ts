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

export {ADD_CLIENT, DELETE_CLIENT, ADD_DRIVER, DELETE_ROUTE, ADD_ROUTE}
