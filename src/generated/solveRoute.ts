/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VRPAlg } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: solveRoute
// ====================================================

export interface solveRoute_solveRoute {
  __typename: "RouteSolution";
  id: string;
  algorithm: VRPAlg;
  nrOrders: number;
  distance: number;
  time: number;
  totalWeight: number | null;
  totalVolume: number | null;
}

export interface solveRoute {
  solveRoute: solveRoute_solveRoute;
}

export interface solveRouteVariables {
  routeId: string;
  algorithm: VRPAlg;
}
