import { Component, OnInit } from '@angular/core';
import { PrintService } from "../../services/print.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-bill-print',
	templateUrl: './bill-print.component.html',
	styleUrls: ['./bill-print.component.scss']
})
export class BillPrintComponent implements OnInit{
  data:any;
	constructor(private print: PrintService, private router:Router) {
	}
    
    ngOnInit() {
		if (!Object.keys(this.print.data()).length)
			this.router.navigate(['/panel/report/reports'])
      this.data = this.print.data();
    }
	
	protected readonly Object = Object;
	protected readonly window = window;
}
