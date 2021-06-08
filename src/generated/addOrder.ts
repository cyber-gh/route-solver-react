/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addOrder
// ====================================================

export interface addOrder_addOrder_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface addOrder_addOrder {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
  location: addOrder_addOrder_location;
}

export interface addOrder {
  addOrder: addOrder_addOrder;
}

export interface addOrderVariables {
  routeId: string;
  address: string;
  name: string;
}
