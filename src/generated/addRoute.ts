/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RouteState } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addRoute
// ====================================================

export interface addRoute_addRoute {
  __typename: "Route";
  id: string;
  name: string;
  state: RouteState;
  roundTrip: boolean;
  startTime: any;
}

export interface addRoute {
  addRoute: addRoute_addRoute;
}

export interface addRouteVariables {
  name: string;
  startAddress: string;
  roundTrip: boolean;
}
