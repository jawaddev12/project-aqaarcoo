import { Inject, PLATFORM_ID } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location, Cityclass, regionclass, PropertyTypes,PropertyStatuess, countries,language } from './app.models';
import { AppSettings } from './app.settings';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from './shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { TranslateService } from '@ngx-translate/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/operators';
import { Http, Headers } from '@angular/http';



export class Data {
  constructor(public properties: Property[],
              public compareList: Property[],
              public favorites: Property[],
              public locations: Location[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  [x: string]: any;
  public Data = new Data(
    [], // properties
    [], // compareList
    [], // favorites
    []  // locations
  )
 // baseUrl:string="https://jsonplaceholder.typicode.com/users";


 readonly rootUrl = 'https://thingproxy.freeboard.io/fetch/http://aqarco.ap-southeast-1.elasticbeanstalk.com/';
 _url: string = 'https://bg.aqarqo.com/';


 baseUrl2:string="https://bg.aqarqo.com/";

 baseUrl:string="https://jsonplaceholder.typicode.com/";
  public url = environment.url + '/assets/data/'; 
  public apiKey = 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I';
  public country1:any;
  public credentials:any;
  constructor(public http:HttpClient, 
              private bottomSheet: MatBottomSheet, 
              private snackBar: MatSnackBar,
              public appSettings:AppSettings,
              public dialog: MatDialog,
              public translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

           public getdata(){
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let credentials = {};
            return this.http.post(this.baseUrl2 + 'api/selectregions', JSON.stringify(credentials), {  });
  }
  counteqars(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
  
    return this.http.post(this._url + 'api/counteqars', JSON.stringify(credentials), { headers: headers }); 
  }
  Articles(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
  
    return this.http.post(this._url + 'api/selectarticles', JSON.stringify(credentials), { headers: headers }); 
  }
  Articlesdetails(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
  
    return this.http.post(this._url + 'api/selectarticles', JSON.stringify(credentials), { headers: headers }); 
  }
  gettest() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
  
    return this.http.post(this._url + 'api/area', JSON.stringify(credentials), { headers: headers });
  }
  getphotos(aqar) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = { aqar };
  
    return this.http.post(this._url + 'api/selectphotosByaqar', JSON.stringify(credentials), { headers: headers });
  }
  selecttype() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };

    return this.http.post(this._url + 'api/categories', JSON.stringify(credentials), { headers: headers });
  }
  selectcategoriesregion() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };

    return this.http.post(this._url + 'api/selectcategoriesregion', JSON.stringify(credentials), { headers: headers });
  }
  selectcategoriesarea () {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = { };

    return this.http.post(this._url + 'api/selectcategoriesarea', JSON.stringify(credentials), { headers: headers });
  }

  selectcountry() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = { };
   console.log(this._url)
    return this.http.post(this._url + 'api/selectcountries', JSON.stringify(credentials), { headers: headers });
  }
  selectcountries() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
   
    return this.http.post(this._url + 'api/selectcountries', JSON.stringify(credentials), { headers: headers });
  }
  region() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
   
    return this.http.post(this._url + 'api/area', JSON.stringify(credentials), { headers: headers });
  }
  getCities() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
  
    return this.http.post(this._url + 'api/regions', JSON.stringify(credentials), { headers: headers });
  }

  // getPropertiesnumber() {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');

  //   let credentials = { country:window.localStorage.getItem('Ip') ,limit:5000 };
   
  //   return this.http.post(this._url + 'api/eqars', JSON.stringify(credentials), { headers: headers });
  // }
  // getProperties(search) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');

  //   let credentials = { country:window.localStorage.getItem('Ip'),search ,limit:300};
   
  //   return this.http.post(this._url + 'api/eqars', JSON.stringify(credentials), { headers: headers });
  // }
  getProperties(type,city,catrgory,area,nbrBedRooms,search,unit,pagenumber) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 let broker=0;
  this.credentials = { country:window.localStorage.getItem('Ip'),type,city,catrgory,area,nbrBedRooms,search,unit,limit:100};
    return this.http.post(this._url + 'api/eqars', JSON.stringify(this.credentials ), { headers: headers });
  }


  getPropertiesBYtype(type,city,catrgory,area,nbrBedRooms,search,unit,pagenumber) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.credentials = { country:window.localStorage.getItem('Ip'),type,city,catrgory,area,nbrBedRooms,search,unit};
    return this.http.post(this._url + 'api/eqars', JSON.stringify(this.credentials ), { headers: headers });
  }

  getPropertiesBYcompany(company) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {country:window.localStorage.getItem('Ip'), company ,limit:50 };
    return this.http.post(this._url + 'api/eqars', JSON.stringify(credentials), { headers: headers });
  }
  // getPropertiesBYcat(catrgory,search) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   let credentials = {country:window.localStorage.getItem('Ip'), catrgory,search ,limit:5000 };
   
  //   return this.http.post(this._url + 'api/eqars', JSON.stringify(credentials), { headers: headers });
  // }
  getPropertiesdetails(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = { id };
   
    return this.http.post(this._url + 'api/eqars', JSON.stringify(credentials), { headers: headers});
  }
  selectcompany() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials = {  };
   
    return this.http.post(this._url + 'api/company', JSON.stringify(credentials), { headers: headers });
  }
  /*
  public getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties.json');
  }
  */
  baseUrl3:string="https://api.ipify.org/?format=json";
  getInfo2():Observable<any>{
    return this.http.get(this.baseUrl3)
      }
  getip():Observable<any>{
    return this.http.get("https://api.ipify.org/?format=json")
       }
  getInfoshow(id:number):Observable<any>{
    return this.http.get<Property>(this.url + 'properties.json?id=' + id );
       }



  // public getPropertyById(id): Observable<Property>{
  //   return this.http.get<Property>(this.url + 'property-' + id + '.json');
  // }

  // public getFeaturedProperties(): Observable<Property[]>{
  //   return this.http.get<Property[]>(this.url + 'featured-properties.json');
  // } 

  // public getRelatedProperties(): Observable<Property[]>{
  //   return this.http.get<Property[]>(this.url + 'related-properties.json');
  // }

  // public getPropertiesByAgentId(agentId): Observable<Property[]>{
  //   return this.http.get<Property[]>(this.url + 'properties-agentid-' + agentId + '.json');
  // }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.url + 'locations.json');
  }
  /*
  public getCities(): Observable<Cityclass[]>{
    return this.http.get<Cityclass[]>(this.url + 'cities.json');
  }
  */
 /*
  public region(): Observable<regionclass[]>{
    return this.http.get<regionclass[]>(this.url + 'region.json');
  }
  */
 public countries():Observable<countries[]>{
  return this.http.get<countries[]>(this.url + 'countries.json')
 }
// countrys

 //chategorys

 public getPropertyTypes(): Observable<PropertyTypes[]>{
  return this.http.get<PropertyTypes[]>(this.url + 'PropertyTypes.json');
}
public getPropertytatuess(): Observable<PropertyStatuess[]>{
  return this.http.get<PropertyStatuess[]>(this.url + 'PropertyStatuses.json');
}
public getPropertytatuessunit(): Observable<PropertyStatuess[]>{
  return this.http.get<PropertyStatuess[]>(this.url + 'PropertyStatusesunit.json');
}
public getPropertyTypes2(): Observable<regionclass[]>{
  return this.http.get<regionclass[]>(this.url + 'region.json');
}
/*
public getPropertyStatuses(): Observable<PropertyStatuess[]>{
  return this.http.get<PropertyStatuess[]>(this.url + 'PropertyStatuses.json');
}
*/
 public getlanguge():Observable<language[]>{
  return this.http.get<language[]>(this.url + 'language.json')
 }

 

  public getAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
  }

  public getLatLng(address){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+this.apiKey+'&address='+address);
  }

  public getFullAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).subscribe(data =>{ 
      return data['results'][0]['formatted_address'];
    });
  }

  public addToCompare(property:Property, component, direction){ 
    if(!this.Data.compareList.filter(item=>item.id == property.id)[0]){
      this.Data.compareList.push(property);
      this.bottomSheet.open(component, {
        direction: direction
      }).afterDismissed().subscribe(isRedirect=>{  
        if(isRedirect){
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }        
      }); 
    } 
  }

  public addToFavorites(property:Property, direction,language){
    if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
      this.Data.favorites.push(property);
      if(language == 'ar')
      this.snackBar.open('العقار "' + property.titlear + '" تمت اضافته الى المفضلة.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
      if(language == 'en')
      this.snackBar.open('The property "' + property.titleEn + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
      if(language == 'tr')
      this.snackBar.open('The property "' + property.titleTr + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
      if(language == 'fr')
      this.snackBar.open('The property "' + property.titleFr + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
    }    
  }

  public openConfirmDialog(title:string, message:string) {  
    const dialogData = new ConfirmDialogModel(title, message); 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    }); 
    return dialogRef; 
  }

  public openAlertDialog(message:string) {   
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    }); 
    return dialogRef; 
  }

  public getTranslateValue(key:string, param:string = null){  
    let value = null;
    this.translateService.get(key, { param: param }).subscribe((res: string) => {
      value = res;
    }) 
    return value; 
  }
/*
  public getPropertyTypes(){
    return [ 
      { id: 1, name: 'Office' },
      { id: 2, name: 'Villas' },
      { id: 3, name: 'Apartment' },
      { id: 4, name: 'Commercial Shops' },
      { id: 5, name: 'Buildings and Towers' },
      { id: 6, name: 'Stores' },
    ]
  }
*/
/*
  public getPropertyStatuses(){
    return [ 
      { id: 1, name: 'SALE' },
      { id: 2, name: 'RENT' },
      { id: 3, name: 'Wanted' },
  
    ]
  }
*/

/*
  public getNeighborhoods(){
    return [      
      { id: 1, name: 'Astoria', cityId: 1 },
      { id: 2, name: 'Midtown', cityId: 1 },
      { id: 3, name: 'Chinatown', cityId: 1 }, 
      { id: 4, name: 'Austin', cityId: 2 },
      { id: 5, name: 'Englewood', cityId: 2 },
      { id: 6, name: 'Riverdale', cityId: 2 },      
      { id: 7, name: 'Hollywood', cityId: 3 },
      { id: 8, name: 'Sherman Oaks', cityId: 3 },
      { id: 9, name: 'Highland Park', cityId: 3 },
      { id: 10, name: 'Belltown', cityId: 4 },
      { id: 11, name: 'Queen Anne', cityId: 4 },
      { id: 12, name: 'Green Lake', cityId: 4 }      
    ]
  }
*/
  public getStreets(){
    return [      
      { id: 1, name: 'Astoria Street #1', cityId: 1, neighborhoodId: 1},
      { id: 2, name: 'Astoria Street #2', cityId: 1, neighborhoodId: 1},
      { id: 3, name: 'Midtown Street #1', cityId: 1, neighborhoodId: 2 },
      { id: 4, name: 'Midtown Street #2', cityId: 1, neighborhoodId: 2 },
      { id: 5, name: 'Chinatown Street #1', cityId: 1, neighborhoodId: 3 }, 
      { id: 6, name: 'Chinatown Street #2', cityId: 1, neighborhoodId: 3 },
      { id: 7, name: 'Austin Street #1', cityId: 2, neighborhoodId: 4 },
      { id: 8, name: 'Austin Street #2', cityId: 2, neighborhoodId: 4 },
      { id: 9, name: 'Englewood Street #1', cityId: 2, neighborhoodId: 5 },
      { id: 10, name: 'Englewood Street #2', cityId: 2, neighborhoodId: 5 },
      { id: 11, name: 'Riverdale Street #1', cityId: 2, neighborhoodId: 6 }, 
      { id: 12, name: 'Riverdale Street #2', cityId: 2, neighborhoodId: 6 },
      { id: 13, name: 'Hollywood Street #1', cityId: 3, neighborhoodId: 7 },
      { id: 14, name: 'Hollywood Street #2', cityId: 3, neighborhoodId: 7 },
      { id: 15, name: 'Sherman Oaks Street #1', cityId: 3, neighborhoodId: 8 },
      { id: 16, name: 'Sherman Oaks Street #2', cityId: 3, neighborhoodId: 8 },
      { id: 17, name: 'Highland Park Street #1', cityId: 3, neighborhoodId: 9 },
      { id: 18, name: 'Highland Park Street #2', cityId: 3, neighborhoodId: 9 },
      { id: 19, name: 'Belltown Street #1', cityId: 4, neighborhoodId: 10 },
      { id: 20, name: 'Belltown Street #2', cityId: 4, neighborhoodId: 10 },
      { id: 21, name: 'Queen Anne Street #1', cityId: 4, neighborhoodId: 11 },
      { id: 22, name: 'Queen Anne Street #2', cityId: 4, neighborhoodId: 11 },
      { id: 23, name: 'Green Lake Street #1', cityId: 4, neighborhoodId: 12 },
      { id: 24, name: 'Green Lake Street #2', cityId: 4, neighborhoodId: 12 }      
    ]
  }

  public getFeatures(){
    return [ 
      { id: 1, name: 'Air Conditioning', selected: false },
      { id: 2, name: 'Barbeque', selected: false },
      { id: 3, name: 'Dryer', selected: false },
      { id: 4, name: 'Microwave', selected: false }, 
      { id: 5, name: 'Refrigerator', selected: false },
      { id: 6, name: 'TV Cable', selected: false },
      { id: 7, name: 'Sauna', selected: false },
      { id: 8, name: 'WiFi', selected: false },
      { id: 9, name: 'Fireplace', selected: false },
      { id: 10, name: 'Swimming Pool', selected: false },
      { id: 11, name: 'Gym', selected: false },
    ]
  }


  public getHomeCarouselSlides(){
    return this.http.get<any[]>(this.url + 'slides.json');
  }


public paginatorshow(items, page?, perPage?) { 
  var page = page || 1,
  perPage = perPage || 4,
  offset = (page - 1) * perPage,   
  paginatedItems = items.slice(offset).slice(0, perPage),
  totalPages = Math.ceil(items.length / perPage);
  return {
    data: paginatedItems,
    pagination:{
      page: page,
      perPage: perPage,
      prePage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
    }
  };
}
public country:any;
//general fiterdata

//////////////////////////
  public filterData(data, params: any, sort?, page?, perPage?){ 

     if(params){

      // if(params.propertyType){
      //   data = data.filter(property => property.catrgory == params.propertyType.id)
      //  // console.log("catrgory is" + params.propertyType.id);
      // }
    
      // if(params.propertyType1){
      //  // data = data.filter(property => property.type == params.propertyType1.nameen)
      // //  console.log("type is" + params.propertyType1.name);
      // }
      // //crypto.name.toLowerCase().includes(search.toLowerCase())

      // if(params.propertyTypenit1){
      //   data = data.filter(property => property.unit == params.propertyTypenit1.nameen)
      // //  console.log("type is" + params.propertyType1.name);
      // }
    
      // if(params.neighborhood){
      //   data = data.filter(property => property.area == params.neighborhood.id)
      //  console.log("type is" + params.neighborhood.id);
      // }

      if(params.price){
   
          if(params.price.from){
         //   console.log("params.price.from = " + params.price.from);
            data = data.filter(property => {
              if( property.price >= params.price.from ){
                return true;
              }
             
              return false;
            });
          }
          if(params.price.to){
                console.log("params.price.to = " + params.price.to);
            data = data.filter(property => {
              if(property.price <= params.price.to){
                return true;
              }
             
              return false;
            });          
          }

       
      }  

      // if(params.city){
      //   data = data.filter(property => property.city == params.city.id)
      //  // console.log('city id = ' + params.city.id);
      // }else{
      //   this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
      //   data = data.filter(property => property.city == this.citydefultnumber)
      // }

      // if(params.zipCode){
      //   data = data.filter(property => property.zipCode == params.zipCode)
      // }
      
    

      if(params.bedrooms){
        if(params.bedrooms.from){
          data = data.filter(property => property.nbrBedRooms >= params.bedrooms.from)
        }
        if(params.bedrooms.to){
          data = data.filter(property => property.nbrBedRooms <= params.bedrooms.to)
        }
      } 
      
      if(params.bathrooms){
        if(params.bathrooms.from){
          data = data.filter(property => property.nbrBathroom >= params.bathrooms.from)
        }
        if(params.bathrooms.to){
          data = data.filter(property => property.nbrBathroom <= params.bathrooms.to)
        }
      } 

      // if(params.garages){
      //   if(params.garages.from){
      //     data = data.filter(property => property.garages >= params.garages.from)
      //   }
      //   if(params.garages.to){
      //     data = data.filter(property => property.garages <= params.garages.to)
      //   }
      // } 

      // if(params.area){
      //   if(params.area.from){
      //     data = data.filter(property => property.area.value >= params.area.from)
      //   }
      //   if(params.area.to){
      //     data = data.filter(property => property.area.value <= params.area.to)
      //   }
      // } 

      // if(params.yearBuilt){
      //   if(params.yearBuilt.from){
      //     data = data.filter(property => property.yearBuilt >= params.yearBuilt.from)
      //   }
      //   if(params.yearBuilt.to){
      //     data = data.filter(property => property.yearBuilt <= params.yearBuilt.to)
      //   }
      // }

      // if(params.features){       
      //   let arr = [];
      //   params.features.forEach(feature => { 
      //     if(feature.selected)
      //       arr.push(feature.name);
      //   });  

      // }
     
    }
    // else{
    //   this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
    //   data = data.filter(property => property.city == this.citydefultnumber)
    // }
    // console.log(data)

    //for show more properties mock data 
    /*
    for (var index = 0; index < 2; index++) {
      data = data.concat(data);        
    }     
     */
    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort, data){
    if(sort){
      switch (sort) {
        case 'Newest':
          data = data.sort((a, b)=> {return <any>new Date(b.published) - <any>new Date(a.published)});           
          break;
        case 'Oldest':
          data = data.sort((a, b)=> {return <any>new Date(a.published) - <any>new Date(b.published)});           
          break;
        case 'Popular':
          data = data.sort((a, b) => { 
            if(a.ratingsValue/a.ratingsCount < b.ratingsValue/b.ratingsCount){
              return 1;
            }
            if(a.ratingsValue/a.ratingsCount > b.ratingsValue/b.ratingsCount){
              return -1;
            }
            return 0; 
          });
          break;
        case 'Price (Low to High)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        case 'Price (High to Low)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        default:
          break;
      }
    }
    return data;
  }
 
  public paginator(items, page?, perPage?) { 
    var page = page || 1,
    perPage = perPage || 4,
    offset = (page - 1) * perPage,   
    paginatedItems = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination:{
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }




  public getTestimonials(){
    return [
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mr. Adam Sandler', 
            position: 'General Director', 
            image: 'assets/images/profile/adam.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Ashley Ahlberg', 
            position: 'Housewife', 
            image: 'assets/images/profile/ashley.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Bruno Vespa', 
            position: 'Blogger', 
            image: 'assets/images/profile/bruno.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mrs. Julia Aniston', 
            position: 'Marketing Manager', 
            image: 'assets/images/profile/julia.jpg' 
        }
    ];
  }

  public getAgents(){
    return [        
        { 
            id: 1,
            fullName: 'Lusia Manuel',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
        organization: 'Eqarco',
            email: 'info.m@a.com',
            phone: '(224) 267-1346',
            social: {
              facebook: 'lusia',
              twitter: 'lusia',
              linkedin: 'lusia',
              instagram: 'lusia',
              website: 'https://lusia.manuel.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-1.jpg' 
        },
        { 
            id: 2,
            fullName: 'Andy Warhol',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'Eqarco',
            email: 'andy.w@Eqarco.com',
            phone: '(212) 457-2308',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://andy.warhol.com'
            },
            ratingsCount: 4,
            ratingsValue: 400,
            image: 'assets/images/agents/a-2.jpg' 
        },        
        { 
            id: 3,
            fullName: 'Tereza Stiles',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'Eqarco',
            email: 'tereza.s@Eqarco.com',
            phone: '(214) 617-2614',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://tereza.stiles.com'
            },
            ratingsCount: 4,
            ratingsValue: 380,
            image: 'assets/images/agents/a-3.jpg' 
        },
        { 
          id: 4,
          fullName: 'Michael Blair',
          desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
          organization: 'Eqarco',
          email: 'michael.b@Eqarco.com',
          phone: '(267) 388-1637',
          social: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            website: 'https://michael.blair.com'
          },
          ratingsCount: 6,
          ratingsValue: 480,
          image: 'assets/images/agents/a-4.jpg'  
        },
        { 
            id: 5,
            fullName: 'Michelle Ormond',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'Eqarco',
            email: 'michelle.o@Eqarco.com',
            phone: '(267) 388-1637',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://michelle.ormond.com'
            },
            ratingsCount: 6,
            ratingsValue: 480, 
            image: 'assets/images/agents/a-5.jpg' 
        }
    ];
  }



  public getClients(){
    return [  
        { name: 'aloha', image: 'assets/images/clients/aloha.png' },
        { name: 'dream', image: 'assets/images/clients/dream.png' },  
        { name: 'congrats', image: 'assets/images/clients/congrats.png' },
        { name: 'best', image: 'assets/images/clients/best.png' },
        { name: 'original', image: 'assets/images/clients/original.png' },
        { name: 'retro', image: 'assets/images/clients/retro.png' },
        { name: 'king', image: 'assets/images/clients/king.png' },
        { name: 'love', image: 'assets/images/clients/love.png' },
        { name: 'the', image: 'assets/images/clients/the.png' },
        { name: 'easter', image: 'assets/images/clients/easter.png' },
        { name: 'with', image: 'assets/images/clients/with.png' },
        { name: 'special', image: 'assets/images/clients/special.png' },
        { name: 'bravo', image: 'assets/images/clients/bravo.png' }
    ];
  }

 

}
