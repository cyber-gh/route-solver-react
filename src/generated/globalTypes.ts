/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum RouteState {
  Delivered = "Delivered",
  Idle = "Idle",
  InDelivery = "InDelivery",
  Optimized = "Optimized",
}

export enum VRPAlg {
  Christofides = "Christofides",
  backtrack = "backtrack",
  greedySchrimp = "greedySchrimp",
  nearestNeighbour = "nearestNeighbour",
  unknown = "unknown",
}

export interface DeliveryClientInputForm {
  name: string;
  email: string;
  address: string;
  startTime?: string | null;
  endTime?: string | null;
  weight?: number | null;
  volume?: number | null;
}

export interface DeliveryOrderInputForm {
  routeId: string;
  name: string;
  address: string;
  clientId?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  weight?: number | null;
  volume?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
