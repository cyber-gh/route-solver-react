/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RouteState, VRPAlg } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRouteWithSolutions
// ====================================================

export interface findRouteWithSolutions_findRoute_solutions_orders_details_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface findRouteWithSolutions_findRoute_solutions_orders_details {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  location: findRouteWithSolutions_findRoute_solutions_orders_details_location;
}

export interface findRouteWithSolutions_findRoute_solutions_orders {
  __typename: "DeliveryOrderSolution";
  id: string;
  order: number;
  estimatedArrivalTime: any;
  estimatedDepartureTime: any;
  details: findRouteWithSolutions_findRoute_solutions_orders_details | null;
}

export interface findRouteWithSolutions_findRoute_solutions_directions {
  __typename: "RouteDirections";
  id: string;
  geometry: string;
  distance: number;
  duration: number;
}

export interface findRouteWithSolutions_findRoute_solutions {
  __typename: "RouteSolution";
  id: string;
  algorithm: VRPAlg;
  nrOrders: number;
  distance: number;
  time: number;
  totalWeight: number | null;
  totalVolume: number | null;
  orders: findRouteWithSolutions_findRoute_solutions_orders[];
  directions: findRouteWithSolutions_findRoute_solutions_directions | null;
}

export interface findRouteWithSolutions_findRoute_startLocation {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface findRouteWithSolutions_findRoute {
  __typename: "Route";
  id: string;
  name: string;
  state: RouteState;
  startTime: any;
  solutions: findRouteWithSolutions_findRoute_solutions[];
  startLocation: findRouteWithSolutions_findRoute_startLocation;
}

export interface findRouteWithSolutions {
  findRoute: findRouteWithSolutions_findRoute | null;
}

export interface findRouteWithSolutionsVariables {
  id: string;
}
