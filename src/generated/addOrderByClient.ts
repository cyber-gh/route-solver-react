/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addOrderByClient
// ====================================================

export interface addOrderByClient_addOrderByClient_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface addOrderByClient_addOrderByClient {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
  location: addOrderByClient_addOrderByClient_location;
}

export interface addOrderByClient {
  addOrderByClient: addOrderByClient_addOrderByClient[];
}

export interface addOrderByClientVariables {
  routeId: string;
  clientIds: string[];
}
