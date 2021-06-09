/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeliveryOrderInputForm } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addDetailedOrder
// ====================================================

export interface addDetailedOrder_addDetailedOrder {
  __typename: "DeliveryOrderModel";
  id: string;
  name: string;
  clientId: string | null;
  startTime: string | null;
  endTime: string | null;
  weight: number | null;
  volume: number | null;
}

export interface addDetailedOrder {
  addDetailedOrder: addDetailedOrder_addDetailedOrder;
}

export interface addDetailedOrderVariables {
  order: DeliveryOrderInputForm;
}
