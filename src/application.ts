export class MyCalculator {
	private document: Document | undefined;

	public initialize(document: Document) {
		this.document = document;
		this.getElement("calculate").addEventListener("click", () => {
			this.calculate();
		});
		this.getInputElement("field1").addEventListener("input", () => {
			this.calculate();
		});
		this.getInputElement("field2").addEventListener("input", () => {
			this.calculate();
		});
		this.getSelectElement("operation").addEventListener("input", () => {
			this.calculate();
		});
		this.getElement("result").innerHTML = "Result!";
	}

	private calculate() {
		const val1 = parseInt(
			(this.getElement("field1") as HTMLInputElement).value,
			10
		);
		const val2 = parseInt(
			(this.getElement("field2") as HTMLInputElement).value,
			10
		);
		const opElem = this.getSelectElement("operation") as HTMLSelectElement;
		const op = opElem.options[opElem.selectedIndex].text;

		let res: number = 0;
		switch (op) {
			case "+":
				res = val1 + val2;
				break;
			case "-":
				res = val1 - val2;
				break;
			case "*":
				res = val1 * val2;
				break;
			case "/":
				res = val1 / val2;
				break;
		}
		this.getElement("result").innerHTML = res.toString();
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

export let myCalculator: MyCalculator = new MyCalculator();
