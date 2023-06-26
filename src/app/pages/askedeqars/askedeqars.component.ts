import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination, Location } from '../../app.models';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout'; 
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 
import { Input } from '@angular/core';

@Component({
  selector: 'app-askedeqars',
  templateUrl: './askedeqars.component.html',
  styleUrls: ['./askedeqars.component.scss']
})
export class AskedeqarsComponent implements OnInit {
  @Input() step: number = 1;
  watcher: Subscription;
  activeMediaQuery = ''; 

  public slides = [];
  public properties: Property[];
  public propertiesbegin: Property[];
  public propertiesstart: Property[];
  public getproperty:[];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 20;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string;
  public pagination:Pagination = new Pagination(1, 8, null, 2, 0, 0); 
  public message:string;
  public featuredProperties: Property[];
  public locations: Location[]; 
  public pagenumber:number=1;
public pergage:number;
  public settings: Settings;
  public searchresult:any;
  public typeresult:any;
  public cityresult:any;
  public catrgoryresult:any;
  public neighborhoodresult:any;
  public nbrBedRoomsresult:any;
  public Typenit1result:any;
  public result:any;
  constructor(public appSettings:AppSettings, public appService:AppService, public mediaObserver: MediaObserver) {

    this.settings = this.appSettings.settings;
  
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {

      if(change.mqAlias == 'xs') {
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 33.3;
      }
      else{
        this.viewCol = 25;
      }
    });

  }

  ngOnInit() {  
    this.pagenumber=1;
    this.result=1;
    this.settings.loadMore.step = this.step;
    // if(this.settings.loadMore.load){     
     
    //   this.settings.loadMore.start = true; 
     
    // }else{
    //   this.settings.loadMore.start = false;
    // }
  // this.getInfo();

   // this.getInfo();
    this.getSlides();
    this.getLocations();
  this.getProperties();  

  }

  ngDoCheck(){
    // this.pagenumber=1;
    if(this.settings.loadMore.load){     
      this.settings.loadMore.load = false;   
       
      this.getProperties();  
    }
  }

  ngOnDestroy(){
    this.resetLoadMore();
    // this.pagenumber=1;
    this.watcher.unsubscribe();
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe(res=>{
      this.slides = res;
    })
  }

  public getLocations(){
    this.appService.getLocations().subscribe(res =>{
      this.locations = res;
    })
  }


  public startLoad(){
    // this.pagenumber++;
   this.getProperties(); 
    this.settings.loadMore.start = true;
   this.settings.loadMore.load = true;
  }

  public getProperties(){  

    if(this.searchFields?.search)
    {this.searchresult=this.searchFields?.search;}else this.searchresult=this.removedSearchField
    
  if(this.searchFields?.propertyType1)
  {  this.typeresult=this.searchFields?.propertyType1.nameen;}else this.typeresult=this.removedSearchField;
 
   if(this.searchFields?.propertyType)
   { this.catrgoryresult=this.searchFields?.propertyType.id;}else this.catrgoryresult=this.removedSearchField;

   if(this.searchFields?.neighborhood)
   { this.neighborhoodresult=this.searchFields?.neighborhood.id;}else 
   {this.neighborhoodresult=this.removedSearchField;}

   if(this.searchFields?.bedrooms)
   { this.nbrBedRoomsresult=this.searchFields?.bedrooms.from;}else this.nbrBedRoomsresult=this.removedSearchField;

    if(this.searchFields?.city)
    {this.cityresult=this.searchFields?.city.id;}else this.cityresult=this.removedSearchField;

      // else{
      //   this.cityresult=Number(window.localStorage.getItem('sitydefultnumber'));
      // }
      
    

    this.appService.getProperties('ASK',this.cityresult,this.catrgoryresult,this.neighborhoodresult,this.nbrBedRoomsresult,this.searchresult,this.Typenit1result,this.pagenumber).subscribe((data) => {    
      var  res : any = data;
      if (res.success) 
        {
        this.getproperty = res.rows;
        const str = 'one two three';
        const result = str.replace(/ /g,"_");
          }
         
          if(this.properties && this.properties.length > 0){  
           
            this.settings.loadMore.page++;
            this.pagination.page = this.settings.loadMore.page; 
          }
      
          let result = this.filterData(this.getproperty);
          console.log('result.data.length  ' + result.data.length );
          if(result.data.length == 0){
            console.log('result.data.length  ' + result.data.length );
            // this.properties.length = 0;
            this.pagination = new Pagination(1, this.count, null, 2, 0, 0);  
          
            this.message = 'No Results Found';
            return false;
          }   
          if(this.properties && this.properties.length > 0){   
            this.properties = this.properties.concat(result.data);          
          }
          else{
            this.properties = result.data;  
            
          } 
          this.pagination = result.pagination;
          this.message = null;
    
          if(this.properties.length == this.pagination.total){
            this.settings.loadMore.complete = true;
            this.settings.loadMore.result = this.properties.length;
          }
          else{
            this.settings.loadMore.complete = false;
          }
    
          if(this.settings.header == 'map'){
            this.locations.length = 0;
            this.properties.forEach(p => {
              let loc = new Location(p.id, p.location.lat, p.location.lng);
              this.locations.push(loc);
            });
            this.locations = [...this.locations];
          } 
         
        })
  
  }
  public resetLoadMore(){
    this.settings.loadMore.complete = false;
    this.settings.loadMore.start = false;
    this.settings.loadMore.page = 1;
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
   
  }
  

  
  public filterData(data){

     return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page,25);
   }

  public searchClicked(){ 
 
    this.properties.length = 0;
   
  this.getProperties(); 
  }
  public searchChanged(event){    

    event.valueChanges.subscribe(() => {
      this.resetLoadMore();
      this.searchFields = event.value;
      setTimeout(() => {      
        this.removedSearchField = null;
      });
     
      if(!this.settings.searchOnBtnClick){     
        this.properties.length = 0;  
      }            
    }); 
    event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => { 
      
      if(!this.settings.searchOnBtnClick){  
        this.result=1;   
        this.pagenumber=1;
       this.getProperties(); 
      }
    });       
  } 
  public removeSearchField(field){ 
    this.pagenumber=1;
    this.result=1;
    this.message = null;   
   this.removedSearchField = field; 

   
  } 
 


  public changeCount(count){
    this.count = count;
    this.resetLoadMore();   
    this.properties.length = 0;
   
    // this.getProperties();

  }
  public changeSorting(sort){    
    this.sort = sort;
    this.resetLoadMore(); 
    this.properties.length = 0;
 
  //  this.getProperties();
  }
  public changeViewType(obj){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  }


}
