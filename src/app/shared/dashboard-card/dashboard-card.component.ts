import {Component, Input} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Icons } from "./icons";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  providers:[Icons]
})
export class DashboardCardComponent {
  // @ts-ignore
  @Input({required:true})items:any[] ;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private icon:Icons) {

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
  }

}
