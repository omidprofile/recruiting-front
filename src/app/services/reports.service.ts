import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  report = signal<any>({})
  constructor() { }
  
  set(report:any){
    this.report.set(report)
  }
}
