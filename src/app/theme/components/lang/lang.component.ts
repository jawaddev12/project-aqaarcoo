import { filter } from 'rxjs/operators';
import { language } from './../../../app.models';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import {Settings, AppSettings } from './../../../app.settings';
import { Component, OnInit ,Inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit { 
  public langName = '';
  public settings: Settings;
  public languageto:any; 
public languges =[];
public Language:language; 
  constructor(public translateService: TranslateService,public appSettings:AppSettings,public translate: TranslateService,
    public cookieService:SsrCookieService,@Inject(DOCUMENT) private document:Document,public appService:AppService,) { 
    this.settings = this.appSettings.settings; 
    
    const value:string=cookieService.get('language');
   // translate.addLangs(['en','ar']);
  
    if(value){
      translate.setDefaultLang(value);
      translate.use(value);
      this.changeLang(value);
    }else{
      translate.setDefaultLang('ar');
      translate.use('ar');
      this.changeLang('ar');
    }
    
  }
  ngOnInit() {  

    this.languageto = this.settings.languageto; 
    this.appService.getlanguge().subscribe(data => { 
      
     //   this.languges = this.filterlanguage(data,this.settings.countrykind); 
    //    console.log("the countryname is " + this.languges)
    
     })

   } 

///////////////////////////////////////////
   public filterlanguage(data,countryid:string){
    data = data.filter(Language => Language.countryid === countryid)
    return data;
    
   }

/////////////////////////////////////////////////
  public changeLang(lang:string){ 
    //console.log("the language is" + lang);
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



}
