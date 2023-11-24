import {Component, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ToggleSidenavService } from "../services/toggle-sidenav.service";
import {Sidenav_model} from "./sidenav_model";

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnChanges{
  items = this.model.items;
	constructor( public toggle:ToggleSidenavService, private model:Sidenav_model) {
	}

  ngOnChanges() {
    console.log("change")
  }

}
