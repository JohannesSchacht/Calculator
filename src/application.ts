export class MyCalculator {
	private document: Document | undefined;

	public initialize(document: Document) {
		this.document = document;
		this.getElement("calculate").addEventListener("click", () => {
			this.getElement("result").innerHTML = "Hello World";
		});
		this.getElement("result").innerHTML = "Result!";
	}

	/* 	public static init() {

	} */

	public getElement(id: string): HTMLElement {
		const elem = document.getElementById(id);
		if (elem === null) throw new Error(`Not found: ${id}`);
		return elem;
	}
}

export let myCalculator: MyCalculator = new MyCalculator();
