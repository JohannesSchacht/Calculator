import { createStore, Action } from "redux";
import * as actions from "./actions";
import { Operation } from "../application";

const defaultStore = { op1: 0, op2: 0, operation: "+", result: 0 };

// tslint:disable-next-line: no-shadowed-variable
function reducer(state = defaultStore, action: { type: string; payload: any }) {
	switch (action.type) {
		case actions.SET_OP1:
			return {
				...state,
				op1: action.payload as number,
			};
		case actions.SET_OP2:
			return {
				...state,
				op2: action.payload as number,
			};
		case actions.SET_OPERATION:
			return {
				...state,
				operation: action.payload as Operation,
			};
		case actions.CALCULATE:
			return {
				...state,
				result: calculate(
					state.op1,
					state.op2,
					state.operation as Operation
				),
			};
		default:
			return state;
	}
}

function calculate(op1: number, op2: number, operation: Operation): number {
	switch (operation) {
		case "+":
			return op1 + op2;
		case "-":
			return op1 - op2;
		case "*":
			return op1 * op2;
		case "/":
			return op1 / op2;
	}
}

export const state = createStore(reducer);
