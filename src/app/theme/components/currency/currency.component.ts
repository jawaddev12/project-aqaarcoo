import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../../app.settings';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  public currencies = ['USD', 'QAR'];
  public currency:any; 
  public settings: Settings;
  constructor(public appSettings:AppSettings,public cookieService:SsrCookieService) {
    this.settings = this.appSettings.settings;
    const value:string=cookieService.get('currency');
    if(value){

      this.changeCurrency(value);
    }else{

      this.changeCurrency('USD');
    }
  }

  ngOnInit() {
    this.currency = this.settings.currency;
  }
  
  public changeCurrency(currency){
    this.currency = currency;
    this.settings.currency = currency;
    this.cookieService.set('currency',currency,7)
  } 

}
