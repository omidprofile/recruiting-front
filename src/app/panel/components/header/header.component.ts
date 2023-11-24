import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { ToggleSidenavService } from "../../../services/toggle-sidenav.service";
import { MatMenuTrigger } from "@angular/material/menu";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public innerWidth: any;
  auto_change_sm=false;
  auto_change_lg=false;
  exit_invoice = true
  back_to_invoice_btn = false

  // @ts-ignore
  @ViewChild('invoice') invoice: MatMenuTrigger;
  constructor(private toggle:ToggleSidenavService) {
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if(!this.auto_change_lg && this.innerWidth >= 992){
      this.auto_change_lg = true;
      this.auto_change_sm = false;
      this.toggle.setFirst('lg');
    }
    if(!this.auto_change_sm && this.innerWidth < 992){
      this.auto_change_lg = false;
      this.auto_change_sm = true;
      this.toggle.setFirst('sm');
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.onResize();
  }
  toggle_sidenav (){
    this.toggle.toggle_sidenav(this.innerWidth);
  }

  show_invoice(){
    this.back_to_invoice_btn = true;
    if(this.exit_invoice) {
      this.invoice.openMenu();
    }
  }

  hide_invoice(){
  setTimeout(()=>{
    if (this.exit_invoice || this.back_to_invoice_btn ){
      this.invoice.closeMenu();
      this.back_to_invoice_btn = false
      this.exit_invoice = true;
    }
  },50)
  }

  come_to_invoice(){
    this.exit_invoice = false
    this.back_to_invoice_btn = false
  }
  exit_to_invoice(){
    setTimeout(()=>{
      if (!this.back_to_invoice_btn){
        this.exit_invoice = true
        this.invoice.closeMenu();
      }
    },50)

  }

}


