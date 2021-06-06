import {gql} from "@apollo/client";

const DRIVERS_QUERY = gql`
  query drivers {
    drivers {
        id
        name
        email
        vehicleId
    }
}  
`

export {DRIVERS_QUERY}
