import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppService } from 'src/app/app.service';
import { countries } from './app.models';
import { language } from './app.models';
import { HostListener } from "@angular/core";
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  Settingcountrykind : any;
  public countries = [];
  public settings:Settings;
  public languageto:any; 
  public countrykind:any; 
  public cities = [];
  public ContryName = countries;
 // public countryget :string='';
  public langName:string = '';
  public arabic:number ;
  public english:number ;
  public turkish:number ;
  public french:number ;
  public languges =[];
  public languagefirst='';
  public lang ='';
  public userip='';
public Language:language; 
  results: any[]; 
  public ip:boolean;
  public countriesName = [];
  scrHeight:any;
scrWidth:any;
isServer = false;
public firsttimetodetails:any;
@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      // console.log(this.scrHeight, this.scrWidth);
      // if(this.scrWidth < 500 ){

      //   document.location.href = 'https://play.google.com/store/apps/details?id=qa.aqarco.app';
      // }
      

}
  async inittt(){

    this.settings =await this.appSettings.settings;
    this.id = 0
  await  this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id');   
    })
//console.log(this.router.url.toLowerCase(), "/properties/".toLowerCase() ,String(this.router.url.toLowerCase()).includes("/properties/".toLowerCase()))
if (String(this.router.url.toLowerCase()).includes("/properties/".toLowerCase())  || String(this.router.url.toLowerCase()).includes("/eqarco".toLowerCase())   )    {
this.Settingcountrykind=false;


} 
else {
  if (this.settings.countrykind== null) {
    this.Settingcountrykind= true;  } else {
   
    this.Settingcountrykind=false;
  }


}
    
this.translate.addLangs(['en','ar','fr','en','tr']);
this.translate.setDefaultLang('ar'); 
this.translate.use('ar');




//////////////////////////////////////////////////
     // اختبار الدولة 
     const value:any=this.cookieService.get('country');
     
       if(value){
        var numberValue = Number(value);
        if(!this.isServer){
 
        this.appService.selectcountry().subscribe((data)=>{

          var  res : any = data;
          if (res.success) 
            {
            this.countries = res.rows;
            this.countries= this.selectinnercountry(this.countries);
              }
          this.ContryName = this.getContryName(this.countries,numberValue);  
        });
      }
        this.cookieService.set('country',value,7)
        this.countrykind = value;// QA
        
          this.settings.countrykind = value; // QA
       
      }else{
        if(!this.isServer){
        this.appService.selectcountry().subscribe((data)=>{
          var  res : any= data
          if (res.success) 
      {
      this.countries = res.rows;
      this.countries= this.selectinnercountry(this.countries);
        }
          this.ContryName = this.getContryName(data,this.settings.countrykind); 
          
          
        });
      }
        
       // this.cookieService.set('country',this.settings.countrykind,7)
        this.countrykind = this.settings.countrykind;
          this.settings.countrykind = this.settings.countrykind;
          
          

      }



  }
  constructor(
              public appSettings:AppSettings, 
              public router:Router,  private route:ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object,
              public translate: TranslateService,public appService:AppService,public cookieService:SsrCookieService,
              @Inject(DOCUMENT) private document:Document,Platform:Platform){
                this.isServer = isPlatformServer(platformId);
                this.inittt()
   
              // اختبار الدولة  نهاية
    ///////////////////////////////////////////
  }
  // public aqarcoapp(){
  //   document.location.href = 'https://appaqarcoo.page.link/zXbp';
  // }
  public selectinnercountry(data){
    data = data.filter(countries => countries.isactive === 1)
   return data;
   }
  ngOnInit(): void {
    console.log(this.appSettings.settings, 'settings-object');
     this.countrykind = this.appSettings.settings.countrykind; 


  }
  public changeCountry(country:any,defaultregion:any){ 
    this.cookieService.set('country',country,7)
    this.countrykind = country;
      this.settings.countrykind = country;
      if(this.isServer) this.cookieService.set('Ip', this.settings.countrykind);
      else window.localStorage.setItem('Ip',this.settings.countrykind);
 
      // window.localStorage.setItem('sitydefultnumber',defaultregion);
     // this.userip=window.localStorage.getItem('Ip');
      this.ip=true;
      window.location.pathname="";
  }
  public getContryName(data,country:any){
    data = data.find(countries => countries.id === country)
    return data;
  }

  /////////////////////////////////////////////////////////
  public filterlanguage(data,countryid:any){
    data = data.filter(Language => Language.id === countryid)
    return data;
  }
  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {   
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }); 
      }            
    });    
  }

}
