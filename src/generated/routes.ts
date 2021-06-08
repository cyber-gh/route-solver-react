/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RouteState } from "./globalTypes";

// ====================================================
// GraphQL query operation: routes
// ====================================================

export interface routes_routes {
  __typename: "Route";
  id: string;
  name: string;
  state: RouteState;
  startTime: any;
}

export interface routes {
  routes: routes_routes[];
}
