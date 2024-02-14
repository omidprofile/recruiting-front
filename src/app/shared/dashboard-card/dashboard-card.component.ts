import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Icons } from "./icons";
import { log10 } from "chart.js/helpers";

@Component({
	selector: 'app-dashboard-card',
	templateUrl: './dashboard-card.component.html',
	styleUrls: ['./dashboard-card.component.scss'],
	providers: [Icons]
})
export class DashboardCardComponent {
	// @ts-ignore
	@Input({required: true}) items: any[];
	permission: any = localStorage.getItem('permission');
	
	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private icon: Icons) {
		iconRegistry.addSvgIconLiteral('users', sanitizer.bypassSecurityTrustHtml(icon.users));
		iconRegistry.addSvgIconLiteral('fingerprint', sanitizer.bypassSecurityTrustHtml(icon.fingerprint));
		iconRegistry.addSvgIconLiteral('bill', sanitizer.bypassSecurityTrustHtml(icon.bill));
		iconRegistry.addSvgIconLiteral('adduser', sanitizer.bypassSecurityTrustHtml(icon.adduser));
		iconRegistry.addSvgIconLiteral('usersList', sanitizer.bypassSecurityTrustHtml(icon.usersList));
		iconRegistry.addSvgIconLiteral('chart', sanitizer.bypassSecurityTrustHtml(icon.chart));
		iconRegistry.addSvgIconLiteral('daily', sanitizer.bypassSecurityTrustHtml(icon.daily));
		iconRegistry.addSvgIconLiteral('conflict', sanitizer.bypassSecurityTrustHtml(icon.conflict));
		iconRegistry.addSvgIconLiteral('pending', sanitizer.bypassSecurityTrustHtml(icon.pending));
		iconRegistry.addSvgIconLiteral('devices', sanitizer.bypassSecurityTrustHtml(icon.devices));
		iconRegistry.addSvgIconLiteral('accepted', sanitizer.bypassSecurityTrustHtml(icon.accepted));
		iconRegistry.addSvgIconLiteral('workReport', sanitizer.bypassSecurityTrustHtml(icon.workReport));
		iconRegistry.addSvgIconLiteral('rights', sanitizer.bypassSecurityTrustHtml(icon.rights));
		iconRegistry.addSvgIconLiteral('receipt', sanitizer.bypassSecurityTrustHtml(icon.receipt));
		iconRegistry.addSvgIconLiteral('baseInfo', sanitizer.bypassSecurityTrustHtml(icon.baseInfo));
		iconRegistry.addSvgIconLiteral('manual', sanitizer.bypassSecurityTrustHtml(icon.manual));
		iconRegistry.addSvgIconLiteral('employee', sanitizer.bypassSecurityTrustHtml(icon.employee));
		iconRegistry.addSvgIconLiteral('report_maker', sanitizer.bypassSecurityTrustHtml(icon.report_maker));
		iconRegistry.addSvgIconLiteral('reports', sanitizer.bypassSecurityTrustHtml(icon.reports));
		iconRegistry.addSvgIconLiteral('calendar', sanitizer.bypassSecurityTrustHtml(icon.calendar));
		iconRegistry.addSvgIconLiteral('IncDec', sanitizer.bypassSecurityTrustHtml(icon.IncDec));
		iconRegistry.addSvgIconLiteral('loan', sanitizer.bypassSecurityTrustHtml(icon.loan));
		iconRegistry.addSvgIconLiteral('last_days', sanitizer.bypassSecurityTrustHtml(icon.last_days));
	}
	
	// ngOnInit() {
	// 	for (let item of this.items) {
	// 		if (item.permission){
	// 			for (let permit of item.permission){
	// 				if (this.permission.includes(permit)){
	// 					item.permission = true
	// 				}
	// 			}
	// 		}else {
	// 			item.permission = true
	// 		}
	// 	}
	// }
	
	checkPermit(item: any) {
		if (!item.permission)
			return true
		for (let permit of item.permission) {
			if (this.permission.includes(permit)) {
				return true
			}
		}
		return false;
	}
	
}
