/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RouteState } from "./globalTypes";

// ====================================================
// GraphQL query operation: routesWithOrders
// ====================================================

export interface routesWithOrders_routes_orders_location {
  __typename: "Location";
  address: string;
  latitude: number;
  longitude: number;
}

export interface routesWithOrders_routes_orders {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
  location: routesWithOrders_routes_orders_location;
}

export interface routesWithOrders_routes {
  __typename: "Route";
  id: string;
  name: string;
  state: RouteState;
  startTime: any;
  orders: routesWithOrders_routes_orders[];
}

export interface routesWithOrders {
  routes: routesWithOrders_routes[];
}
