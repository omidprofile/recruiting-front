import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlStateService {

  constructor() { }
  
  url_tree:any[]=[]
  
  url_push(route:Router, title:string){
    console.log(this.url_tree)
    let url = route.url
    
    let index = this.url_tree.findIndex(e=>e.url == url)
    if (index>-1){
      this.url_tree.splice(index+1,this.url_tree.length)
    }
    else {
      this.url_tree.push({
        url:url,
        title:title
      })
    }
    if (this.url_tree.length<=1){
      this.url_tree = this.get_last_url(route)
    }
  }
  
  get_last_url(route:Router){
    let url = route.url
    let url_tree_split = url.split('/')
    let child:any[] = route.config
    console.log(child)
    let url_temp = ""
    let newUrl = [];
    for(let [index,url] of url_tree_split.entries()){
      if (url != '' && !+url ){
        let temp = child.find(e=>e.path == url)
        newUrl.push({
          url:url_temp=url_temp+"/"+temp.path,
          title:temp.data.title
        })
        if (  +url_tree_split[index+1] ){
          url_tree_split[index+1] =url+'/:id'
        }else {
          child = temp._loadedRoutes
        }
        
      }
    }
    return this.url_tree = newUrl
  }
  
  get_url(){
    return this.url_tree;
  }
}
