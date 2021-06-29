/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RouteState } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRoute
// ====================================================

export interface findRoute_findRoute_selectedDriver_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface findRoute_findRoute_selectedDriver {
  __typename: "Driver";
  id: string;
  name: string;
  location: findRoute_findRoute_selectedDriver_location | null;
}

export interface findRoute_findRoute_selectedSolution {
  __typename: "RouteSolution";
  id: string;
}

export interface findRoute_findRoute_orders_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface findRoute_findRoute_orders {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
  location: findRoute_findRoute_orders_location;
}

export interface findRoute_findRoute_startLocation {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface findRoute_findRoute {
  __typename: "Route";
  id: string;
  name: string;
  state: RouteState;
  roundTrip: boolean;
  selectedDriverId: string | null;
  selectedDriver: findRoute_findRoute_selectedDriver | null;
  selectedSolution: findRoute_findRoute_selectedSolution | null;
  orders: findRoute_findRoute_orders[];
  startLocation: findRoute_findRoute_startLocation;
  startTime: any;
}

export interface findRoute {
  findRoute: findRoute_findRoute | null;
}

export interface findRouteVariables {
  id: string;
}
