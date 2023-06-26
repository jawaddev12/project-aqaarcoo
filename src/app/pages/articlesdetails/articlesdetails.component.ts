

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList, Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Articles } from 'src/app/app.models';

import { PropertyTypes } from 'src/app/app.models';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings, Settings } from 'src/app/app.settings';

import { EmbedVideoService } from 'ngx-embed-video'; 

@Component({
  selector: 'app-articlesdetails',
  templateUrl: './articlesdetails.component.html',
  styleUrls: ['./articlesdetails.component.scss']
})
export class ArticlesdetailsComponent implements OnInit {
  
  public artical:Articles;

  public PropertyType:PropertyTypes;
  public settings: Settings;  
  public embedVideo: any;
  public getproperty:[];
public id:any;
public newURL:string;

  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private activatedRoute: ActivatedRoute, 
              private embedService: EmbedVideoService,private route:ActivatedRoute,
              public fb: UntypedFormBuilder,private http:HttpClient,private router:Router) {
    this.settings = this.appSettings.settings; 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id');   
    })



  }


  public getProperties(id){   
    this.appService.Articlesdetails().subscribe((data) => { 
      var  res : any = data;
      if (res.success) 
        {
        this.getproperty = res.rows;

          }
          this.artical = this.filterDatashow(this.getproperty ,Number(this.id)); 
          console.log(this.getproperty);
     
    })
  }
  public filterDatashow(data,id){
    data = data.find(Property => Property.id === id)
  
  
    return data;
    
   }

  ngOnInit() {
    this.newURL = window.location.protocol + "//" + window.location.host ;
    this.getProperties(Number(this.id));
  } 

  ngOnDestroy() {
   // this.sub.unsubscribe();
  }  

  

  





  


}