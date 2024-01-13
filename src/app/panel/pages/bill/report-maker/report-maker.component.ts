import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ReportMakerService } from "../../../../HttpServices/report-maker.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-report-maker',
  templateUrl: './report-maker.component.html',
  styleUrls: ['./report-maker.component.scss']
})
export class ReportMakerComponent {
  report_type:any;
  cols_show:any=[];
  cols:any=[];
  report_name:string='';
  reportMaker:FormGroup;
  cols_name:any = {

  }
  cols_general_name:any = {
    No:'َشماره',
    personal_code:'کد پرسنلی',
    name:'نام',
    last_name:'نام خانوادگی',
    course_name:'نام دوره',
    all_day:'کل روزها',
    holidays:'روز های تعطیل',
    total_day:'تعداد حضور',
    absent_day:'تعداد غیبت',
    holiday_work:'تعطیل کاری',
    total_normal:'موظف کاری',
    total_extra:'اضافه کار',
    total_delay:'کسر کار',
    total_work:'کارکرد کل',
    conflict:'وضعیت',
    action:'امکانات'}
  
  cols_details_name:any = {
    day:'روز',
    date:'تاریخ',
    day_status:'وضعیت روز',
    traffic1:'تردد1',
    traffic2:'تردد2',
    traffic3:'تردد3',
    traffic4:'تردد4',
    traffic5:'تردد5',
    traffic6:'تردد6',
    traffic7:'تردد7',
    traffic8:'تردد8',
    user_status:'وضعیت کاربر',
    conflict:'اعتبار',
    time:'کارکرد',
  }
  
  constructor(private http:ReportMakerService, private _snackBar: MatSnackBar,) {
    this.reportMaker = new FormGroup<any>({
      title:new FormControl(null,[]),
      type:new FormControl(null,[])
    })
  }
  
  onSubmit(){
    // !this.cols?.includes('No')?this.cols?.unshift('No'):''
    // !this.cols?.includes('action')?this.cols?.push('action'):''
    
    let report :any={}
    report.title = this.reportMaker.value.title;
    report.type = this.reportMaker.value.type;
    report.cols = this.cols;
    this.http.create(report).subscribe({
      next: async (data) => {
        this.reportMaker.reset();
        this.cols = [];
        this.cols_show = [];
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `گزارش با موفقیت ایجاد شد`,
          duration: 1500
        })
      },
      error: (err) => {
        this.reportMaker.get('title')?.setErrors([{duplicate:true}])
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `خطا در ایجاد گزارش لطفا مقادیر مجددا بررسی شود`,
          duration: 1500
        })
      }
      
    })
    
  }
  
  rmCol(col:string){
    this.cols = this.cols.filter((e:any)=> e != col)
    this.cols_show = this.cols_show.filter((e:any)=> e != col)
  }
  
  setCols(col:any)
  {
    !this.cols?.includes(col)?this.cols?.push(col):'';
    for(let item of this.cols){
      if (!this.cols_show.includes(item)){
        this.cols = this.cols.filter((e:any)=> e != item)
      }
    }
  }
  
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.cols, event.previousIndex, event.currentIndex);
  }
  
  setTypeCols(){
    this.reportMaker.value.type == 'general'?
        this.cols_name = this.cols_general_name:
        this.cols_name = this.cols_details_name
  }
  
  protected readonly Object = Object;
}
