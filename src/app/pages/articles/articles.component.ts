import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs'; 
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'; 
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Articles, Pagination } from '../../app.models'; 
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  

  public viewType: string = 'grid';
  public viewCol: number = 33.3;
  public count: number = 12;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string;
  public pagination:Pagination = new Pagination(1, this.count, null, 2, 0, 0); 
  public message:string;
  public watcher: Subscription;
  public getproperty:[];
  public propertytype:string;
  public settings: Settings
  public propertycase:number = 0;
  public type:string = 'SALE';
  public lang3:string;
  public artical:Articles;
  public articalsar:[];
  public articalsen:[];
  public articalstr:[];
  public articalsfr:[];
  public language1:string;
  public language2:string;


  constructor(public appService:AppService,public appSettings:AppSettings,) {
    this.settings = this.appSettings.settings; 
   }

   public getProperties(){   
    this.appService.Articles().subscribe((data) => { 
      var  res : any = data;
      if (res.success) 
        {
        this.getproperty = res.rows;
          }
        
          this.lang3= window.localStorage.getItem('langdefult');
         //  this.articals= this.getproperty;
         this.articalsar = this.filterDatashowar(this.getproperty ,this.lang3); 
         this.articalsen = this.filterDatashowen(this.getproperty ,this.lang3); 
         this.articalstr = this.filterDatashowtr(this.getproperty ,this.lang3); 
         this.articalsfr = this.filterDatashowfr(this.getproperty ,this.lang3); 
          console.log('this.articals =' + this.lang3);
      
    })
  }
  public filterDatashowfr(data,language1){
    data = data.filter(artical => artical.language ==='FRENCH')
    return data;
   }
  public filterDatashowtr(data,language1){
    data = data.filter(artical => artical.language ==='TURKISH')
    return data;
   }
  public filterDatashowen(data,language1){
    data = data.filter(artical => artical.language ==='ENGLISH')
    return data;
   }
  public filterDatashowar(data,language1){
    /*
   if(language1 === 'ar') this.language2='ARABIC';
   if(language1 === 'en') this.language2='ENGLISH';
   if(language1 === 'tr') this.language2='TURKISH';
   if(language1 === 'fr') this.language2='FRENCH';
   */
    data = data.filter(artical => artical.language ==='ARABIC')
    return data;
   }

/////////////////////// language end //////////////////////////////////

  ngOnInit(): void {
    this.getProperties();
  }
  

}
