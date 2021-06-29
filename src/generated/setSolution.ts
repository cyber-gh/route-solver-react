/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setSolution
// ====================================================

export interface setSolution_setSolution {
  __typename: "RouteSolution";
  id: string;
}

export interface setSolution {
  setSolution: setSolution_setSolution | null;
}

export interface setSolutionVariables {
  routeId: string;
  solutionId?: string | null;
}
