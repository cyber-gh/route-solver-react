/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyClient
// ====================================================

export interface MyClient_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface MyClient {
  __typename: "DeliveryClient";
  id: string;
  name: string;
  email: string;
  location: MyClient_location;
}
