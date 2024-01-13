import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { UrlStateService } from "../../services/url-state-service.service";

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BreadcrumbComponent implements AfterViewInit{
  @Input() route:any;
  @Input() title:any;
  
  constructor(public url:UrlStateService) {
  }
  ngAfterViewInit() {
    setTimeout(()=>{
      this.url.url_push(this.route, this.title);
    })
  }
}
