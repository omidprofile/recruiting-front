import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  
  data = signal<any>({})
  constructor() { }
  
  set(data:any){
    this.data.set(data)
  }
}
