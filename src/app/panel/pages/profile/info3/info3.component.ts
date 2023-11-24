import { Component } from '@angular/core';

@Component({
  selector: 'app-info3',
  templateUrl: './info3.component.html',
  styleUrls: ['./info3.component.scss']
})
export class Info3Component {
acrList:number[] = [];


  select_style(id:number){
    this.acrList.includes(id)?
      this.removeId(id)
      :this.acrList.push(id)
  }

  removeId(id:number){
    const index = this.acrList.indexOf(id, 0);
    if (index > -1) {
      this.acrList.splice(index, 1);
    }
  }

}
