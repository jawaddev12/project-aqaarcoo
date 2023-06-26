import { filter } from 'rxjs/operators';
import { PropertyTypes } from './../../app.models';
import { Settings, AppSettings } from 'src/app/app.settings';
import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AppService } from '../../app.service'; 
import { Cityclass, } from './../../app.models';
import { MatSelectChange } from '@angular/material/select';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-properties-search',
  templateUrl: './properties-search.component.html',
  styleUrls: ['./properties-search.component.scss']
})

export class PropertiesSearchComponent implements OnInit {
[x: string]: any;
  @Input() variant:number = 1;
  @Input() propertycase:number = 1;
  @Input() propertycaseyahts:number = 1;
  @Input() propertydalyrent:number = 1;
  
  @Input() vertical:boolean = false;
  @Input() searchOnBtnClick:boolean = false;
  @Input() removedSearchField:string;
  @Output() onSearchChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
  public showMore: boolean = false;
  public form: UntypedFormGroup;
 public propertyTypes = [];
 public propertyTypesbycity=[];
 public propertyTypesbycat=[];
  public propertyStatus = [];
  public propertyStatusunit = [];
  public propertyTypes2 = [];
  public propertyStatuses = [];
  //public cities = [];
  public cities:Cityclass;
  public neighborhoods = [];
  public streets = [];
  public features = [];
  public settings:Settings;
  public languageto:any; 
  public country:any;
  public tap = [];
  public cat = [];
  public arrayA = [];
  public areaA = [];
  public citydefult:any;
  private isServer = false;
  public citydefultnumber:number;
  public cityid:number;
  // public citydefultname:string;
  public cityidnumbe:number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public appService:AppService, public fb: UntypedFormBuilder,public appSettings:AppSettings) {
    this.isServer = isPlatformServer(platformId)
      this.settings = this.appSettings.settings;
 
   }
   ////////////////////////////////////////
   public filtercityesbycountry(data,country){
    data = data.filter(cities => cities.country === country)
    return data;
  }
  public filtercityesbycountrydefult(data,citydefultnumber){
    data = data.find(cities =>  cities.id === citydefultnumber)
    return data;
  }
//////////////////////////////// getcityforcategory ///////////////

  public getcityforcategory(city_id)
  {
    
    this.appService.selectcategoriesregion().subscribe((data)=>{
      var res:any= data;
          if (res.success) 
      {
      this.propertyTypesbycity = res.rows;
      this.propertyTypesbycity = this.selectcategoriesregion(this.propertyTypesbycity,city_id); 

      const ids =  this.propertyTypesbycity.map((obj) => obj.categories);
    // const ids =[1,4,7]
      //console.log(ids[1]);
      ///for
      for (let i = 0; i < ids.length; i++) {
       // console.log (ids[i]);
       /////////////////
        this.appService.selecttype().subscribe
          (
            (data)=>
            {
              var res:any= data;
              if (res.success) 
              {
              this.cat = res.rows;
                }
            this.cat = this.fincat(this.cat,ids[i]);
            if(this.cat){this.arrayA = this.arrayA.concat(this.cat);}
            
          
            
            }
            
          )
       ////////////////
       
      }
      //// for end
      
        }
         
    })
    
    
  }
     //PropertyType
     public fincat(data,cat_id){
      data = data.find(PropertyType3 => PropertyType3.id === cat_id)
      return data;
     }

     public selectcategoriesregion(data,region_id){
      data = data.filter(PropertyType3 => PropertyType3.region === region_id)
     return data;
     }
     //////////////////////////////// getcityforcategory end ///////////////
   //////////////////////////////// اظهار المناطق عند تحديد المدينة ///////////////
   public getareabycityonly(cityid)
   {
    this.appService.region().subscribe
    (
      (data)=>
      {
        var res:any= data;
        if (res.success) 
        {
        this.area = res.rows;
          }
        if(this.cityid)  this.cityidnumbe=this.cityid;
         else this.cityidnumbe=Number(window.localStorage.getItem('sitydefultnumber')); 
         this.areaA= this.finregionbycityonly(this.area,this.cityidnumbe);     
      }
    )

     
     
   }
  public getcategoryforarea(cat_id)
  {
    
    this.appService.selectcategoriesarea().subscribe((data)=>{
      var res:any= data;
          if (res.success) 
      {
      this.propertyTypesbycat = res.rows;
      this.propertyTypesbycat = this.selectcategoriesarea(this.propertyTypesbycat,cat_id); 

      const ids =  this.propertyTypesbycat.map((obj) => obj.area);

      ///for ////////////
      for (let i = 0; i < ids.length; i++) {
       // console.log (ids[i]);
       /////////////////
        this.appService.region().subscribe
          (
            (data)=>
            {
              var res:any= data;
              if (res.success) 
              {
              this.area = res.rows;
                }
              if(this.cityid)  this.cityidnumbe=this.cityid;
               else this.cityidnumbe=Number(window.localStorage.getItem('sitydefultnumber')); 
            this.area = this.finregion(this.area,ids[i],this.cityidnumbe);
            if(this.area )
            {
             this.areaA = this.areaA.concat(this.area);
             
            }

            
            }
          )
       ////////////////
       
      }
      //// for end
      
        }
         
    })
    
    
  }
     //PropertyType
     public finregion(data,area_id,region_id){
      data = data.find(PropertyType4 => PropertyType4.id === area_id && PropertyType4.region === region_id)
     
      return data;
     }
     public finregionbycityonly(data,region_id){
      data = data.filter(PropertyType4 =>  PropertyType4.region === region_id)
     
      return data;
     }

     public selectcategoriesarea(data,cat_id){
      data = data.filter(PropertyType4 => PropertyType4.categories === cat_id)
     return data;
     }
     //////////////////////////////// getcategoryforregion end ///////////////
  ////////////////////////////////////////////
  ngOnInit() {
    if(!this.isServer){
    if(this.propertycaseyahts == 0){
      this.getcategoryforarea(20); 
    }

    this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
    this.getcityforcategory(this.citydefultnumber);
    this.getareabycityonly(this.cityid);
    this.languageto = this.settings.languageto;
    this.country =this.settings.countrykind;
 
    if(this.vertical){
      this.showMore = true;
    };
    ////// citybycountry
    this.appService.getCities().subscribe((data)=>
    {
      var res:any= data;
      if (res.success) 
      {
      this.cities = res.rows;

        }
        var numberValuelang = Number(this.country);
      this.cities = this.filtercityesbycountry(this.cities,numberValuelang);

      // this.citydefultnumber=Number(window.localStorage.getItem('sitydefultnumber'));
     // console.log('citydefultnumber = ' + this.citydefultnumber)
    // this.citydefult = this.filtercityesbycountrydefult(this.cities,this.citydefultnumber);
    // if(this.languageto == 'en') this.citydefultname=this.citydefult.englishname;
    // else if(this.languageto == 'ar') this.citydefultname=this.citydefult.arabicname;
    // else if(this.languageto == 'tr') this.citydefultname=this.citydefult.turkishname;
    // else if(this.languageto == 'fr') this.citydefultname=this.citydefult.frenchname;
   // console.log('this.citydefult = ' + this.citydefult.englishname)
     
    })

    ////// citybycountry end 
    this.appService.region().subscribe((data) => {
      var res:any= data;
      if (res.success) 
      {
      this.neighborhoods = res.rows;
    
        }
    
      })
      // مناطق
         // مناطق نهاية
         

        
    //فلل او شقق

/*
  this.appService.selecttype().subscribe((data) => {
  var res:any= data;
  if (res.success) 
  {
  this.propertyTypes = res.rows;

    }

  })
  */
    //فلل او شقق نهاية
    //بيع اجار
    this.appService.getPropertytatuess().subscribe((Response)=>{this.propertyStatus=Response;})
    //بيع اجار نهاية
        // مطلوب + يخوت
        this.appService.getPropertytatuessunit().subscribe((Response)=>{this.propertyStatusunit=Response;})
        //مطلوب + يخوت
   //المنطقة
    this.appService.getPropertyTypes2().subscribe((Response)=>{this.neighborhoods=Response;})
    //المنطقة
    //this.propertyTypes = this.appService.getPropertyTypes();
    //this.cities = this.appService.getCities();
    //this.neighborhoods = this.appService.getNeighborhoods();
    this.streets = this.appService.getStreets();
    this.features = this.appService.getFeatures();
  }
    this.form = this.fb.group({
      propertyType: null,
      propertyType1: null,
      search: null,
      propertyTypenit1: null,
      propertyType2: null,
      propertyStatus: null, 
      propertyStatusunit: null, 
      price: this.fb.group({
        from: null,
        to: null 
      }),
      city: null,
      zipCode: null,
      neighborhood: null,
      street: null,
      bedrooms: this.fb.group({
        from: null,
        to: null 
      }),
      bathrooms: this.fb.group({
        from: null,
        to: null 
      }),
      garages: this.fb.group({
        from: null,
        to: null 
      }),
      area: this.fb.group({
        from: null,
        to: null 
      }),
      yearBuilt: this.fb.group({
        from: null,
        to: null 
      }),       
      features: this.buildFeatures()
    }); 

    this.onSearchChange.emit(this.form);
  
}
 
  public buildFeatures() {
    const arr = this.features.map(feature => { 
      return this.fb.group({
        id: feature.id,
        name: feature.name,
        selected: feature.selected
      });
    })   
    return this.fb.array(arr);
  }
  

  ngOnChanges(){ 
    if(this.removedSearchField){ 
      if(this.removedSearchField.indexOf(".") > -1){
        let arr = this.removedSearchField.split(".");
        this.form.controls[arr[0]]['controls'][arr[1]].reset();
      } 
      else if(this.removedSearchField.indexOf(",") > -1){        
        let arr = this.removedSearchField.split(","); 
        this.form.controls[arr[0]]['controls'][arr[1]]['controls']['selected'].setValue(false);  
      }
      else{
        this.form.controls[this.removedSearchField].reset();
      }  
    }  
  }

  public reset(){     
    this.form.reset({ 
      propertyType: null,
      propertyType1: null,
      search: null,
      propertyTypenit1: null,
      propertyStatus: null, 
      propertyStatusunit:null,
      price: {
        from: null,
        to: null 
      },
      city: null,
      zipCode: null,
      neighborhood: null,
      street: null,
      bedrooms: {
        from: null,
        to: null 
      },
      bathrooms: {
        from: null,
        to: null 
      },
      garages: {
        from: null,
        to: null 
      },
      area: {
        from: null,
        to: null 
      },
      yearBuilt: {
        from: null,
        to: null 
      },       
      features: this.features    
    }); 
  }

  public search(){
    this.onSearchClick.emit(); 
  }

  public onSelectCity($event: MatSelectChange){
   // this.form.controls['neighborhood'].setValue(null, {emitEvent: false});
  //  this.form.controls['street'].setValue(null, {emitEvent: false});
   this.cityid = $event.value.id; 
   // console.log(" this.value" + this.cityid);
    this.arrayA=[];
    this.cat=[];
    this.areaA=[];
    this.getcityforcategory(this.cityid);
    this.getareabycityonly(this.cityid);
  }

  public onSelectcat($event: MatSelectChange){
   const list = $event.value.id; 
     //console.log(" this.value" + list);
     this.areaA=[];
     this.area=[];
    this.getcategoryforarea(list);
   }
   
  public onSelectNeighborhood(){
    this.form.controls['street'].setValue(null, {emitEvent: false});
  }

  public getAppearance(){
    return (this.variant != 3) ? 'outline' : '';
  }
  public getFloatLabel(){
    return (this.variant == 1) ? 'always' : '';
  }


}
