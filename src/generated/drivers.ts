/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: drivers
// ====================================================

export interface drivers_drivers_location {
  __typename: "Location";
  address: string;
}

export interface drivers_drivers {
  __typename: "Driver";
  id: string;
  name: string;
  email: string;
  location: drivers_drivers_location | null;
}

export interface drivers {
  drivers: drivers_drivers[];
}
