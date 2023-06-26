import { CookieService } from 'ngx-cookie-service';
import { countries } from './../../../app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings, AppSettings } from 'src/app/app.settings';
import { Component, OnInit, Input, Output, EventEmitter,Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
///////

import { language } from './../../../app.models';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
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
public Language:language; 
  results: any[];


  constructor(public translateService: TranslateService,public appService:AppService,public appSettings:AppSettings,public cookieService:CookieService,private router:Router,public translate: TranslateService,@Inject(DOCUMENT) private document:Document,) 
  { 
  
       this.settings = this.appSettings.settings;
       ///////////////// for change language when change conuntry
     
       const valuelang:string=cookieService.get('language');
       // translate.addLangs(['en','ar']);
      
        if(valuelang){
          translate.setDefaultLang(valuelang);
          translate.use(valuelang);
         this.changeLang(valuelang);
        }else{
          translate.setDefaultLang('en');
          translate.use('en');
         this.changeLang('en');
        }

        //////////////////////////////
//////////////////////////////////////////////////
const value:any=cookieService.get('country');
       if(value){
        var numberValue = Number(value);
        this.appService.countries().subscribe((data)=>{
          this.ContryName = this.getContryName(data,numberValue); 
          console.log("value type  =  " +  value);
          console.log("this.ContryName =  " +  this.ContryName);
   
          
        });
        
        this.cookieService.set('country',value,7)
        this.countrykind = value;// QA
        
          this.settings.countrykind = value; // QA
       
       // this.changeCountry(value);
      }else{
        this.appService.countries().subscribe((data)=>{
          this.ContryName = this.getContryName(data,this.settings.countrykind); 
          
          
        });
        
       // this.cookieService.set('country',this.settings.countrykind,7)
        this.countrykind = this.settings.countrykind;
          this.settings.countrykind = this.settings.countrykind;
          
          
       // this.changeCountry('Qatar');
      }
     
///////////////////////////////////////////
  }


  ngOnInit(): void {
  

    this.languageto = this.settings.languageto;
    this.countrykind = this.settings.countrykind; 

  this.appService.countries().subscribe(

    (Response)=>{this.countries=Response}
    
    );
    
  
   ///// language /////
    this.appService.countries().subscribe(data => {  
      var numberValuelang = Number(this.settings.countrykind);
    this.languges = this.filterlanguage(data,numberValuelang); 
   

  })
  //test //////////////////////
  this.appService.countries().subscribe(data => {
    var numberValuelanglang = Number(this.settings.countrykind);
    this.Language = this.show(data,numberValuelanglang); 
  this.arabic=this.Language.arabic;
  this.english=this.Language.english;
  this.turkish=this.Language.turkish;
  this.french=this.Language.french;

    })
//test end //////////////////////
/////////////////////////
   this.appService.getlanguge().subscribe(data => {  
    var numberValuelanglang = Number(this.settings.countrykind);
  this.Language = this.filterlanguagefirst(data,numberValuelanglang,this.arabic,this.english,this.turkish,this.french); 
  this.langName=this.Language.short;

  this.translateService.use(this.langName); 
//////////////////////
 
   let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
   this.settings.rtl = this.langName === "ar" ? (true):(false);
   HtmlTag.lang = this.langName === "ar" ? "ar" :"en";
  // this.translate.setDefaultLang(this.langName);
   //this.translate.use(this.langName);
   //this.cookieService.set('language',this.langName,7)
   //this.languageto = this.langName;
   this.settings.languageto = this.langName;
 
  })

 ///// language end /////


 // this.ContryName = this.getContryName('Qatar');  
  }
    /////////////////////////////////////////////////////////
  public changeCountry(country:any){ 

    //// country /// 
    this.appService.countries().subscribe((data)=>{
      this.ContryName = this.getContryName(data,country); 
    });
    /////////////
    ///// language /////
    // all
    this.appService.countries().subscribe(data => { 
     this.languges = this.filterlanguage(data,country); 
    
   })
   // first
   this.appService.countries().subscribe(data => { 
   this.Language = this.filterlanguagefirst(data,country,this.arabic,this.english,this.turkish,this.french); 
   this.langName=this.Language.short;
   this.translateService.use(this.langName); 
 
    let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
    this.settings.rtl = this.langName === "ar" ? (true):(false);
    HtmlTag.lang = this.langName === "ar" ? "ar" :"en";
   // this.translate.setDefaultLang(this.langName);
   // this.translate.use(this.langName);
  //  this.cookieService.set('language',this.langName,7)
   // this.languageto = this.langName;
   // this.settings.languageto = this.langName;

   })
   
   
   
 ///// language end /////
    this.cookieService.set('country',country,7)
    this.countrykind = country;
      this.settings.countrykind = country;
      window.location.pathname="";
  }
  public getContryName(data,country:any){
    data = data.find(countries => countries.id === country)
    return data;
  }
  public changeLang(lang:string){ 

  
    this.translateService.use(lang); 
    this.langName =lang;  
    let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
    this.settings.rtl = lang === "ar" ? (true):(false);
   
   // HtmlTag.dir = lang === "ar" ? "rtl":"ltr";
    HtmlTag.lang = lang === "ar" ? "ar" :"en";
   // this.translate.setDefaultLang(lang);
   // this.translate.use(lang);
    this.cookieService.set('language',lang,7)
    this.languageto = lang;
    this.settings.languageto = lang;
 
  } 
  /////////////////////////////////////////////////////////
   /////////////////////// language //////////////////////////////////
   // first
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
  // all
  /*
  public filterlanguage(data,countryid:string){
    data = data.filter(Language => Language.countryid === countryid)
    return data;
  }
*/
public filterlanguage(data,countryid:any){
  data = data.filter(Language => Language.id === countryid)
  return data;
}
/////////////////////// language end //////////////////////////////////
}
