import { HttpClient } from '@angular/common/http';
import { Data } from './../../../property.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { countries } from './../../../app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings, AppSettings } from 'src/app/app.settings';
import { Component, OnInit, Input, Output, EventEmitter,Inject, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
///////


import { language } from './../../../app.models';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { response } from 'express';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  [x: string]: any;
  public countries = [];
  public countries1 = [];
  public countriesName = [];
  public countriesactive = [];
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
  public defult:number;
  public resultdefult:boolean;
  public lang3:string;
  public lang2:string;
public valuelang:string;
private isServer = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translateService: TranslateService,public appService:AppService,public appSettings:AppSettings,public cookieService:SsrCookieService,private router:Router,
    public translate: TranslateService,@Inject(DOCUMENT) private document:Document,) 
  { 
      this.isServer = isPlatformServer(platformId);
       this.settings = this.appSettings.settings;
// اظهار الدول بشكل عام
      //  this.appService.selectcountry().subscribe((data) => {
      //   var  res = data.json()
      //   if (res.success) 
      //   {
      //   this.countries= res.rows;   
      //     }
            
      
      //   })

      // اظهار الدول بشكل عام نهاية
      // اختبار اللغة 
      
       this.valuelang=cookieService.get('language');

       
        if(this.valuelang == 'en' || this.valuelang == 'ar' || this.valuelang == 'tr' || this.valuelang == 'fr' ){
          translate.setDefaultLang(this.valuelang);
          translate.use(this.valuelang);
         this.changeLang(this.valuelang);
        }else{
          translate.setDefaultLang('ar');
          translate.use('ar');
         this.changeLang('ar');
        }
        // if(this.settings.countrykind > 0)
        // {
        //   translate.setDefaultLang('ar');
        //   translate.use('ar');
        //  this.changeLang('ar');
        //     console.log('this.settings.countrykind != null' + this.settings.countrykind);
        // }
     
        // else console.log('this.settings.countrykind == null' + this.settings.countrykind);
     // اختبار اللغة  نهاية

//////////////////////////////////////////////////
     // اختبار الدولة 
  
      const value:any=cookieService.get('country');

       if(value){
     
        var numberValue = Number(value);
        if(!this.isServer){
        this.appService.selectcountry().subscribe((data)=>{
          var  res : any= data;
          if (res.success) 
            {
            this.countriesName = res.rows;
            
              }
          this.ContryName = this.getContryName(this.countriesName,numberValue);  
     
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


            }
            this.conutry=1;
          this.ContryName = this.getContryName(this.countries,1); 
          this.cookieService.set('country',this.conutry,7)
          this.countrykind = this.conutry;
          this.settings.countrykind = this.conutry;

          if(this.isServer)
          {
            this.cookieService.set('Ip', this.settings.countrykind);

          }
          else
          {

            window.localStorage.setItem('Ip',this.settings.countrykind);
          }
        });
      }
        this.countrykind = this.settings.countrykind;
        
          
        console.log('this.settings.languageto ' + this.settings.languageto);

      }
          // اختبار الدولة  نهاية
///////////////////////////////////////////
  }
  public selectinnercountry(data){
    data = data.filter(countries => countries.isactive === 1)
   return data;
   }
  ngOnInit(): void {
    
    this.languageto = this.settings.languageto;

    if(this.settings.countrykind != null)
    this.countrykind = this.settings.countrykind; 
    else this.countrykind = 1; 

   ///// languages get ///// //////////////////// //////////////////
   if(!this.isServer){
    this.appService.selectcountry().subscribe
    (
      (data) => 
      {  
        var  res : any= data;
        if (res.success) 
        {
        this.countriesactive = res.rows;
        this.countries= this.selectinnercountry(this.countriesactive);
        }
        if(this.settings.countrykind != null)
        var numberValuelang = Number(this.settings.countrykind);
        else
        var numberValuelang = 1;

        this.languges = this.filterlanguage(this.countriesactive,numberValuelang); 
       
      }
   )
    }
  }
    /////////////////////////////////////////////////////////
  public changeCountry(country:any,defaultregion:any){ 
 
    this.appService.selectcountry().subscribe
    (
      (data) => 
      {  
        var  res : any= data;
        if (res.success) 
        {
        this.countries = res.rows;
        
        }

      }
   )
   if(this.isServer){
    this.cookieService.get('langdefult');
   }
   else{

     this.lang2= window.localStorage.getItem('langdefult');
   }
   if(this.lang2 == 'tr' ||  this.lang2 == 'fr' )
   {
   
    this.lang2='ar';
   }
  
   else{
    if(this.isServer){
      this.cookieService.get('langdefult');
     }
     else{
  
       this.lang2= window.localStorage.getItem('langdefult');
     }
   }
  var lang=this.lang2;
   this.translateService.use(lang); 
    this.langName =lang;  
    let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
    this.settings.rtl = lang === "ar" ? (true):(false);
   
   // HtmlTag.dir = lang === "ar" ? "rtl":"ltr";
    HtmlTag.lang = lang === "ar" ? "ar" :"en";
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.cookieService.set('language',lang,7)
    this.languageto = lang;
    this.settings.languageto = lang;
    /////////////

      this.cookieService.set('country',country,7)
      this.countrykind = country;
      this.settings.countrykind = country;
      if(this.isServer)
      {
        this.cookieService.set('Ip', this.settings.countrykind);
      }
      else
      {
        window.localStorage.setItem('Ip',this.settings.countrykind);

      }

      // window.localStorage.setItem('sitydefultnumber',defaultregion);
      window.location.pathname="";
  }

  
  public getContryName(data,country:any){
    data = data.find(countries => countries.id === country)
    return data;
  }
  public countrycitydefult(data,country:any){
    data = data.find(countries => countries.id === country)
    return data;
  }



  public changeLang(lang:string){ 

    if(this.isServer)
    {
      this.cookieService.set('langdefult', lang);
    }
    else{

      window.localStorage.setItem('langdefult',lang);
    }
    this.translateService.use(lang); 
    this.langName =lang;  
    let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
    this.settings.rtl = lang === "ar" ? (true):(false);
   
   // HtmlTag.dir = lang === "ar" ? "rtl":"ltr";
    HtmlTag.lang = lang === "ar" ? "ar" :"en";
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.cookieService.set('language',lang,7)
    this.languageto = lang;
    this.settings.languageto = lang;
  
 
  } 

public filterlanguage(data,countryid:any){
  data = data.filter(Language => Language.id === countryid)
  return data;
}

/////////////////////// language end //////////////////////////////////
}
function getJSON(arg0: string): any {
  throw new Error('Function not implemented.');
}

