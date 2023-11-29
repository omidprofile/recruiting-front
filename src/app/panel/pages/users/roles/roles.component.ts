import { Component } from '@angular/core';
import {log10} from "chart.js/helpers";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {


  section=['تولید','اداری']
  sector=[{parent:'تولید',sector:'انبارداری'},{parent:'تولید',sector:'باسکول'},{parent:'اداری',sector:'برنامه نویسی'},{parent:'اداری',sector:'حسابداری'}]
  rank=[{parent:'انبارداری',rank:'کارمند'},{parent:'برنامه نویسی',rank:'سرپرست'},{parent:'برنامه نویسی',rank:'کارمند'},{parent:'حسابداری',rank:'مشاور'}]
  title=[{parent:'انبارداری',rank:'کارمند',title:'لیبل زن'},{parent:'برنامه نویسی',rank:'سرپرست',title:'بکند'},{parent:'برنامه نویسی',rank:'کارمند',title:'فرانت اند'},{parent:'حسابداری',rank:'مشاور',title:'حقوق'},{parent:'حسابداری',rank:'مشاور',title:'تولید'}]

  section_value:any;
  sector_value:any;
  rank_value:any;
  title_value:any;

  section_show:any;
  sector_show:any;
  rank_show:any;
  title_show:any;



test(){
  console.log('hi there')
  console.log(this.rank_value)
}
getSector(){
  this.sector_value = null
  this.rank_value = null
  this.title_value = null
  this.sector_show = this.sector.filter(e=> this.section_value.includes(e.parent ));
}
getRank(){
  this.title_value = null
  this.rank_show = this.rank.filter(e=>this.sector_value.includes(e.parent));
}

getTitle(){
  this.title_show = this.title.filter(e=>this.rank_value.includes(e.rank) && this.sector_value.includes(e.parent));

}

  protected readonly console = console;
}
