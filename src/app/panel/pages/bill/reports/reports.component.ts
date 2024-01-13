import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../../../services/reports.service";
import { ReportMakerService } from "../../../../HttpServices/report-maker.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
reports:any;

ngOnInit() {
  this.getReports()
}
  
  constructor(private Report:ReportsService, private http:ReportMakerService, private router:Router) {
  }
  
  getReports(){
    this.http.get().subscribe((data:any)=>{
      this.reports = data.reports
    })
  }
  
  async setReport(report:any){
    this.Report.set(report)
    report.type == 'general'?
        await this.router.navigate(['panel/report/workReport'])
        :await this.router.navigate(['panel/report/workInfo'])
  }
}
