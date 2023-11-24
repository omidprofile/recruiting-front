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
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('users', sanitizer.bypassSecurityTrustHtml(icon.users));
    iconRegistry.addSvgIconLiteral('fingerprint', sanitizer.bypassSecurityTrustHtml(icon.fingerprint));
    iconRegistry.addSvgIconLiteral('bill', sanitizer.bypassSecurityTrustHtml(icon.bill));
    iconRegistry.addSvgIconLiteral('adduser', sanitizer.bypassSecurityTrustHtml(icon.adduser));
    iconRegistry.addSvgIconLiteral('usersList', sanitizer.bypassSecurityTrustHtml(icon.usersList));
    iconRegistry.addSvgIconLiteral('chart', sanitizer.bypassSecurityTrustHtml(icon.chart));
  }

}
