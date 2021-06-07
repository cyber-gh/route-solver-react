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

export {ADD_CLIENT, DELETE_CLIENT, ADD_DRIVER}
