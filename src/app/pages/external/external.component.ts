import { HttpClient } from '@angular/common/http';
import { Data } from './../../property.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { countries } from './../../app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings, AppSettings } from 'src/app/app.settings';
import { Component, OnInit, Input, Output, EventEmitter,Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
///////


import { language } from './../../app.models';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { response } from 'express';
@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {

  [x: string]: any;
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
  public defult:number;
  public resultdefult:boolean;
  public lang3:string;
  public lang2:string;


  constructor(public translateService: TranslateService,public appService:AppService,public appSettings:AppSettings,public cookieService:SsrCookieService,private router:Router,public translate: TranslateService,@Inject(DOCUMENT) private document:Document,) 
  { 
  
       this.settings = this.appSettings.settings;



  }
  public selectinnercountry(data){
    data = data.filter(countries => countries.isactive === 2)
   return data;
   }
  ngOnInit(): void {
    
    this.languageto = this.settings.languageto;

    this.countrykind = this.settings.countrykind; 
  
   ///// languages get ///// //////////////////// //////////////////
    this.appService.selectcountry().subscribe
    (
      (data) => 
      {  
        var  res : any = data;
        if (res.success) 
        {
        this.countries = res.rows;
        this.countries= this.selectinnercountry(this.countries);
        }
        var numberValuelang = Number(this.settings.countrykind);
        this.languges = this.filterlanguage(this.countries,numberValuelang); 
       
      }
   )

  }
    /////////////////////////////////////////////////////////
  public changeCountry(country:any,defaultregion:any){ 
 
    this.appService.selectcountry().subscribe
    (
      (data) => 
      {  
        var  res : any = data;
        if (res.success) 
        {
        this.countries = res.rows;
        }
        /*
         this.lang3= window.localStorage.getItem('langdefult');
        
        if(this.lang3 == 'ar')       this.defult=1;
        else if(this.lang3 == 'en')  this.defult=2;
        else if(this.lang3 == 'tr')  this.defult=3;
        else if(this.lang3 == 'fr') this.defult=4;
       
        var numberValuelang = Number(country);
        this.resultdefult = this.defultlanguage(this.countries,numberValuelang,this.defult); 
       */
      }
   )
   this.lang2= window.localStorage.getItem('langdefult');
   if(this.lang2 == 'tr' ||  this.lang2 == 'fr' )
   {
   
    this.lang2='ar';
   }
  
   else{
    this.lang2= window.localStorage.getItem('langdefult');
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
      window.localStorage.setItem('Ip',this.settings.countrykind);
      window.localStorage.setItem('sitydefultnumber',defaultregion);
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

    window.localStorage.setItem('langdefult',lang);
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
  /////////////////////////////////////////////////////////
   /////////////////////// language //////////////////////////////////
   // first
   /*
   public filterlanguagefirst(data,countryid:any,arabic,english,turkish,french){

    if(arabic === 1)
    data = data.find(Language => Language.arabic === 1 )
    else if(english === 1)
    data = data.find(Language => Language.english === 1 )
    else if(turkish === 1)
    data = data.find(Language => Language.turkish === 1 )
    else if(french === 1)
    data = data.find(Language => Language.french === 1 )
    else data = data.find(Language => Language.english === 1 )
    return data;
  }

  public show(data,countryid:any){
    data = data.find(country => country.id === countryid )
    return data;
  }
  

  public filterlanguage(data,countryid:string){
    data = data.filter(Language => Language.countryid === countryid)
    return data;
  }
*/
public filterlanguage(data,countryid:any){
  data = data.filter(Language => Language.id === countryid)
  return data;
}
/*
public defultlanguage(data,countryid:any,defult){
  if(defult == 3)
  {
    data = data.find(Language => Language.id === countryid &&  Language.turkish === 1   )
    if(data) return true;
    else return false;
  
  } 
  else if(defult == 1)
  {
    data = data.find(Language => Language.id === countryid &&  Language.arabic === 1   )
    if(data) return true;
    else return false;
  
  }
  else if(defult == 2)
  {
    data = data.find(Language => Language.id === countryid &&  Language.english === 1   )
    if(data) return true;
    else return false;
  
  }
  else if(defult == 4)
  {
    data = data.find(Language => Language.id === countryid &&  Language.french === 1   )
    if(data) return true;
    else return false;
  
  }
  
  
  
 // return data;
}
*/
/////////////////////// language end //////////////////////////////////
}
function getJSON(arg0: string): any {
  throw new Error('Function not implemented.');
}
