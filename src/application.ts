import { fromEvent } from "rxjs";
import { tap } from "rxjs/operators";

export class MyCalculator {
	private document: Document | undefined;
	private state: State | undefined;
	private op1: HTMLInputElement | undefined;
	private op2: HTMLInputElement | undefined;
	private operation: HTMLSelectElement | undefined;
	private result: HTMLElement | undefined;

	public initialize(document: Document) {
		this.document = document;
		this.state = new State(document);

		this.op1 = this.getInputElement("field1");
		this.op2 = this.getInputElement("field2");
		this.operation = this.getSelectElement("operation");
		this.result = this.getElement("result");

		fromEvent(this.op1, "input").subscribe(
			() => (this.state!.op1 = parseInt(this.op1!.value, 10))
		);
		fromEvent(this.op2, "input").subscribe(
			() => (this.state!.op2 = parseInt(this.op2!.value, 10))
		);
		fromEvent(this.operation, "input").subscribe(() => {
			this.state!.operation = this.operation!.options[
				this.operation!.selectedIndex
			].text as Operation;
		});
		fromEvent(this.getElement("calculate"), "click").subscribe(() =>
			this.state!.calculate()
		);

		this.result.innerHTML = "Result";

		this.op1.value = "0";
		this.op2.value = "0";
		this.operation.value = "plus";

		const event = new Event("input", {
			bubbles: true,
			cancelable: true,
		});
		this.op1.dispatchEvent(event);
		this.op2.dispatchEvent(event);
		this.operation.dispatchEvent(event);

		this.state.calculate();
	}

	public getElement(id: string): HTMLElement {
		const elem = document.getElementById(id);
		if (elem === null) throw new Error(`Not found: ${id}`);
		return elem;
	}

	public getInputElement(id: string): HTMLInputElement {
		const elem = document.querySelector(`input[id="${id}"]`);
		if (elem instanceof HTMLInputElement) {
			return elem as HTMLInputElement;
		}
		throw new Error(`Not found: ${id}`);
	}

	public getSelectElement(id: string): HTMLSelectElement {
		const elem = document.querySelector(`select[id="${id}"]`);
		if (elem instanceof HTMLSelectElement) {
			return elem as HTMLSelectElement;
		}
		throw new Error(`Not found: ${id}`);
	}
}

type Operation = "+" | "-" | "*" | "/";

class State {
	private document: Document | undefined;
	private _op1: number = 0;
	private _op2: number = 0;
	private _operation: Operation = "+";
	private _result: number = 0;

	private op1Elem: HTMLElement | undefined;
	private op2Elem: HTMLElement | undefined;
	private operationElem: HTMLElement | undefined;
	private resultElem: HTMLElement | undefined;

	constructor(document: Document) {
		this.document = document;
		this.op1Elem = this.getElement("op1");
		this.op2Elem = this.getElement("op2");
		this.operationElem = this.getElement("operation1");
		this.resultElem = this.getElement("result1");
	}

	public get op1() {
		return this._op1;
	}
	public set op1(val: number) {
		this._op1 = val;
		this.op1Elem!.innerHTML = val.toString();
	}

	public get op2() {
		return this._op2;
	}
	public set op2(val: number) {
		this._op2 = val;
		this.op2Elem!.innerHTML = val.toString();
	}

	public get operation() {
		return this._operation;
	}
	public set operation(val: Operation) {
		this._operation = val;
		this.operationElem!.innerHTML = val;
	}

	public get result() {
		return this._result;
	}
	public set result(val: number) {
		this._result = val;
		this.resultElem!.innerHTML = val.toString();
	}

	public calculate() {
		let res: number = 0;
		switch (this.operation) {
			case "+":
				res = this._op1 + this._op2;
				break;
			case "-":
				res = this._op1 - this._op2;
				break;
			case "*":
				res = this._op1 * this._op2;
				break;
			case "/":
				res = this._op1 / this._op2;
				break;
		}
		this.resultElem!.innerHTML = res.toString();
	}

	private getElement(id: string): HTMLElement {
		const elem = document.getElementById(id);
		if (elem === null) throw new Error(`Not found: ${id}`);
		return elem;
	}
}

export let myCalculator: MyCalculator = new MyCalculator();
