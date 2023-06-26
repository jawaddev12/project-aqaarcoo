import { Component, OnInit } from '@angular/core';
import { filter, map,find } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MediaChange, MediaObserver } from '@angular/flex-layout'; 
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 
import { Property,Pagination, Location } from 'src/app/app.models';

import { Settings ,AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, ParamMap, Routes } from '@angular/router';




@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  watcher: Subscription;
  activeMediaQuery = ''; 

  public slides = [];
  public properties: Property;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 8;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string;
  public pagination:Pagination = new Pagination(1, 8, null, 2, 0, 0); 
  public message:string;
  public featuredProperties: Property[];
  public locations: Location[]; 

  public settings: Settings;
public cat:string='1';
public id:string;
  constructor(public appSettings:AppSettings, public appService:AppService,private activatedRoute:ActivatedRoute) {
    this.settings = this.appSettings.settings;
 
   


    this.appService.getProperties().subscribe(data => { 
      activatedRoute.params.subscribe((params)=>{
        //this.cat=params.id;
        this.properties = this.filterDatashow(data,params.id); 
        console.log(this.properties);
      })
  

     })

  }
  public filterDatashow(data,title:string){
    data = data.find(Property => Property.title === title)
    //console.log(data);
    return data;
    
   }
  ngOnInit() {  
 
  
  }

}
