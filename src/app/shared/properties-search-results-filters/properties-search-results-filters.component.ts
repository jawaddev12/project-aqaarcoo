import { find } from 'rxjs/operators';
import { Settings, AppSettings } from 'src/app/app.settings';
import { Component, OnInit, Input, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { Cityclass, } from './../../app.models';
import { AppService } from '../../app.service'; 
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-properties-search-results-filters',
  templateUrl: './properties-search-results-filters.component.html',
  styleUrls: ['./properties-search-results-filters.component.scss']
})
export class PropertiesSearchResultsFiltersComponent implements OnInit {
  
  public citydefultnumber:any;
  public settings:Settings;
  public languageto:any; 
  public cities:Cityclass;
  private isServer = false;
  @Input() searchFields: any;
  @Output() onRemoveSearchField: EventEmitter<any> = new EventEmitter<any>();
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public appService:AppService,public appSettings:AppSettings) { this.settings = this.appSettings.settings;
    this.isServer = isPlatformServer(platformId)
    if(!this.isServer){

      this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
    

    this.appService.getCities().subscribe((data)=>
    {
      var  res : any = data
      if (res.success) 
      {
      this.cities = res.rows;

        }
        if(!this.isServer){
          
          this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
        }
      this.cities = this.filtercityesbycountry(this.cities,this.citydefultnumber);
//console.log('this.cities' + this.cities);
     

     
    })
  }
}
  public filtercityesbycountry(data,cityid){
    data = data.find(cities => cities.id === cityid)
    return data;
  }
  ngOnInit() {  
    this.languageto = this.settings.languageto;}
   
  public remove(field){

    this.onRemoveSearchField.emit(field);
    
    propertyType: null;
    
  }

}