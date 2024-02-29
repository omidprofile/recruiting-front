import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  
  data = signal<any>(null)
  constructor() { }
  
  set(data:any){
    this.data.set(data)
  }
}
