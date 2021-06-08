/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: clients
// ====================================================

export interface clients_clients_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface clients_clients {
  __typename: "DeliveryClient";
  id: string;
  name: string;
  email: string;
  location: clients_clients_location;
}

export interface clients {
  clients: clients_clients[];
}
