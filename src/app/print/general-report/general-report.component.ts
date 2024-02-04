import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PrintService } from "../../services/print.service";
import { DateService } from "../../services/date.service";

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss']
})
export class GeneralReportComponent implements AfterViewInit{
  displayedColumns: string[] = ['No', 'name', 'personal_code', 'day_work', 'all_time', 'extra_time', 'delay_time', 'absent'];
  dataSource:any;
  printing = true;
  constructor(private print:PrintService, private date:DateService, private router:Router) {
    this.dataSource = print.data();
    console.log(this.dataSource)
    if (!Object.keys(this.dataSource).length)
      router.navigate(['/panel'])
      
  }

  ngAfterViewInit() {
  
  }
  
  createHour(hour: any) {
    if (!hour)
      return ' 0 '
    let result = Math.floor(hour) + ":"
    let min = hour - Math.floor(hour);
    min = min * 60;
    result = result + (min == 0 ? "00:" : Math.floor(min) + ":")
    let sec = min - Math.floor(min)
    sec = sec * 60;
    result = result + (sec == 0 ? "00" : Math.floor(sec))
    return result
  }
  

  protected readonly window = window;
}
