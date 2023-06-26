import { Component, OnInit, Input, PLATFORM_ID } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { Settings, AppSettings } from '../../app.settings';
import { countries ,counteqars} from './../../app.models';
import { AppService } from 'src/app/app.service';
import { HostListener } from "@angular/core";
import { Platform } from '@angular/cdk/platform';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit {
  @Input('backgroundImage') backgroundImage;
  @Input('bgImageAnimate') bgImageAnimate;
  @Input('contentOffsetToTop') contentOffsetToTop;
  @Input('contentMinHeight') contentMinHeight;
  @Input('title') title;
  @Input('desc') desc;
  @Input('isHomePage') isHomePage:boolean = false;
  @Input('fullscreen') fullscreen: boolean = false; 
  public bgImage;
  public settings: Settings;
  public countriy:countries;
  Language: any;
  english: any;
  arabic: any;
  turkish: any;
  french: any;
  scrHeight:any;
  isServer = false;
scrWidth:any;
  public counteqars:any;
  @HostListener('window:resize', ['$event'])
getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      // console.log(this.scrHeight, this.scrWidth);
      // if(this.scrWidth < 500 ){

      //   document.location.href = 'https://play.google.com/store/apps/details?id=qa.aqarco.app';
      // }
      

}
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public appSettings:AppSettings, private sanitizer:DomSanitizer ,   public appService:AppService,Platform:Platform ) {
    this.isServer = isPlatformServer(platformId);
      this.settings = this.appSettings.settings;
    setTimeout(() => {
      this.settings.headerBgImage = true;
    }); 
    /*
    this.appService.countries().subscribe(data => {
      this.countriy = this.getcountry(data,this.settings.countrykind); 
    console.log("city is " + this.countriy);
     })
     */
      //test //////////////////////
      if(!this.isServer){
  this.appService.selectcountry().subscribe(data => {
    var  res : any = data;
    if (res.success) 
      {
      this.countriy = res.rows;
        }
    var numberValuelanglang = Number(this.settings.countrykind);
    this.Language = this.getcountry(this.countriy,numberValuelanglang); 


    })
 
    this.appService.counteqars().subscribe(data => {
      var  res : any = data;
      if (res.success) 
        {
        this.counteqars = res.rows;
          }
          console.log('counteqars = ' + this.counteqars.eqars)

      })
    }
//test end //////////////////////
  }
   //PropertyType
   public getcountry(data,countrykind){
    data = data.find(countriy => countriy.id === countrykind)
   return data;
   }
   //end

  ngOnInit() {
    if(this.contentOffsetToTop){
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      }); 
    } 
    if(this.backgroundImage){
      this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url('+this.backgroundImage +')'); 
    }
  }

  ngOnDestroy(){    
    setTimeout(() => {
      this.settings.headerBgImage = false; 
      this.settings.contentOffsetToTop = false;
    });  
  }

}
