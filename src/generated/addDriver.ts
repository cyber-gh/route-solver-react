/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addDriver
// ====================================================

export interface addDriver_addDriver_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface addDriver_addDriver {
  __typename: "Driver";
  id: string;
  name: string;
  email: string;
  location: addDriver_addDriver_location | null;
}

export interface addDriver {
  addDriver: addDriver_addDriver;
}

export interface addDriverVariables {
  name: string;
  email: string;
  address: string;
}
