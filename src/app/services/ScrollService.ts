import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class ScrollService {
	constructor(private router: Router) {}
	scrollToElementById(id: string) {
		const element = this.__getElementById(id);
		this.scrollToElement(element);
	}
	
	private __getElementById(id: string): HTMLElement {
		console.log("element id : ", id);
		// const element = <HTMLElement>document.querySelector(`#${id}`);
		// @ts-ignore
		return document.getElementById(id);
	}
	
	scrollToElement(element: HTMLElement) {
		element.scrollIntoView({ behavior: "auto" });
	}
}
