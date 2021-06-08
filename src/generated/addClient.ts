/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeliveryClientInputForm } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addClient
// ====================================================

export interface addClient_addClient_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface addClient_addClient {
  __typename: "DeliveryClient";
  id: string;
  name: string;
  email: string;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
  location: addClient_addClient_location;
}

export interface addClient {
  addClient: addClient_addClient;
}

export interface addClientVariables {
  client: DeliveryClientInputForm;
}
