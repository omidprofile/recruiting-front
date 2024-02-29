import { Component } from '@angular/core';
import { PrintService } from "../../services/print.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-to-bank-print',
  templateUrl: './to-bank-print.component.html',
  styleUrls: ['./to-bank-print.component.scss']
})
export class ToBankPrintComponent {
  data:any;
  constructor(private print: PrintService, private router:Router) {
  }
  
  ngOnInit() {
    if (!this.print.data() || !Object.keys(this.print.data()).length)
      this.router.navigate(['/panel/report/toBank'])
    this.data = this.print.data();
  }
  
  protected readonly window = window;
}
