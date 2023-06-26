import { filter } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList, Injectable ,Inject, PLATFORM_ID, Injector} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Property } from 'src/app/app.models';
import { Cityclass } from 'src/app/app.models';
import { photos } from 'src/app/app.models';
import { regionclass } from 'src/app/app.models';
import { companyclass } from 'src/app/app.models';
import { PropertyTypes } from 'src/app/app.models';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CompareOverviewComponent } from 'src/app/shared/compare-overview/compare-overview.component';
import { EmbedVideoService } from 'ngx-embed-video'; 
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { SsrCookieService} from 'ngx-cookie-service-ssr';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, PlatformLocation, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';  
import { count } from 'console';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;  
  @ViewChildren(SwiperDirective) swipers: QueryList<SwiperDirective>;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  public sidenavOpen:boolean = true;
  public config: SwiperConfigInterface = {}; 
  public config2: SwiperConfigInterface = {}; 
  private sub: any;
  public property:Property;
  public city:Cityclass; 
  public Photos:photos
  public region:regionclass;
  public company:companyclass;
  public PropertyType:PropertyTypes;
  public settings: Settings;  
  public embedVideo: any;
  public relatedProperties: Property[];
  public featuredProperties: Property[];
  public agent:any;
  public mortgageForm: UntypedFormGroup;
  public monthlyPayment:any;
  public contactForm: UntypedFormGroup;
  public cat:string='1';
public id:any;
public slugchang:string;
public name:string='';
public getproperty:[];
public getcity:[];
public getregion:[];
public getPhosto:[];
public getcompany:[];
public lat:any;
public lng:any;
public newURL:string;
public imageurl:string;
https: any;
public src:string;
public reportData = [];
public language:string;
public lang:string;
public langName:string = '';
public number:string;
public arraywhats = [];
public number2:number=0;
public number3:number;
public strValue:string;
public discription:string;
public key:any;
public   firsttimetodetails : any;
public isServer = false;
  constructor(
    private platformLocation: PlatformLocation,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document:Document,public translateService: TranslateService,public appSettings:AppSettings, public translate: TranslateService,
              public appService:AppService, public cookieService:SsrCookieService,
              private activatedRoute: ActivatedRoute, 
              private embedService: EmbedVideoService,private route:ActivatedRoute,
    public fb: UntypedFormBuilder, private http: HttpClient, private router: Router, private meta: Meta,private title:Title) {
    this.isServer = isPlatformServer(platformId)
    this.settings = this.appSettings.settings; 
    
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id');   
     
      if(!this.isServer){
        this.lang=window.localStorage.getItem('langdefult');
      }
      this.translateService.use(this.lang); 
      this.langName =this.lang;  
      let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
     
      this.settings.rtl = this.lang === "ar" ? (true):(false);
      HtmlTag.lang = this.lang === "ar" ? "ar" :"en";
      this.translate.setDefaultLang( this.lang);
      this.translate.use(this.lang);
      this.cookieService.set('language',this.lang,7)
      this.settings.languageto = this.lang; 
           
           // HtmlTag.dir = lang === "ar" ? "rtl":"ltr";
      
           
            this.translate.use(this.lang);
            this.cookieService.set('language',this.lang,7)
          
            this.settings.languageto = this.lang;
            
    })  
    
    this.appService.getPropertiesdetails(Number(this.id)).subscribe((data) => { 
      if(!this.isServer)
      {

        this.lang=window.localStorage.getItem('langdefult');
      }
      else 
      {
        this.lang = this.cookieService.get('langdefult')
      }
      
      this.translateService.use(this.lang); 
      this.langName =this.lang;  
      let HtmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
     
      this.settings.rtl = this.lang === "ar" ? (true):(false);
      HtmlTag.lang = this.lang === "ar" ? "ar" :"en";
      this.translate.setDefaultLang( this.lang);
      this.translate.use(this.lang);
      this.cookieService.set('language',this.lang,7)
      this.settings.languageto = this.lang; 
      
      var  res : any = data;
      if (res.success) 
        {       
        this.getproperty = res.rows;
          }
          this.property = this.filterDatashow(this.getproperty ,Number(this.id)); 
          // console.log('settings.languageto',this.settings.languageto);
         this.lat=Number(this.property.lat);
          this.lng=Number(this.property.lng);
          if(this.property.whatsapp < 1) var whatsup= this.property.phone;
        else if(this.property.whatsapp > 1) var whatsup= this.property.whatsapp;
         else var whatsup= 2222;
       //  console.log('property.whatsapp' + this.property.whatsapp);
    if(this.property.whatsapp < 1)   
	  var myInt = this.property.phone;
    if(this.property.whatsapp > 1)   
	  var myInt = this.property.whatsapp;
	// Getting the string as a parameter
	// and typecasting it into an integer
        
	let myFunc = num => Number(num);
	var intArr = Array.from(String(myInt), myFunc);
        
if(intArr[0] == 0 && intArr[1] == 0)
{
  for (let i = 2; i < intArr.length; i++) {
    this.arraywhats[this.number2]= intArr[i];
    this.number2++;
   
  }
  this.strValue =this.arraywhats.join('');
}
else this.strValue = String(myInt);



  // console.log(this.strValue); // 'javascript,typescript,react,angular'
  


        // var whatsup= this.property.phone;
        //  console.log('whatsup' + whatsup);
         //    this.lat=Number(25.259821243345474);
             //this.lat=String(25.259821243345474);


            //  const keyar = this.property.descrAr.split(' ');
            //  const keyen = this.property.titleEn.split(' ');
            //  console.log('words' + words);

            if(this.isServer){
              this.newURL = this.platformLocation.href;
            }
            else
            {

              this.newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
            }
             this.language=this.property.titleAr + '/' + this.property.titleEn;
             this.discription=this.property.descrAr.replace(/\s+/g, ' ') + '/' + this.property.descrEn.replace(/\s+/g, ' ');
             this.key=this.discription.split(' ') ;

            // if(this.settings.languageto == 'en') this.language=this.property.titleEn;
            // if(this.settings.languageto == 'tr') this.language=this.property.titleTr;
            // if(this.settings.languageto == 'fr') this.language=this.property.titleEn;
            
            //  this.title.setTitle(this.language)
            this.title.setTitle(this.language)
             this.meta.updateTag({name: 'keywords', content: this.key});
             this.meta.updateTag({name: 'description', content: this.discription}, 'name="description"');
             this.meta.updateTag({property: 'og:title', content: this.language});
             this.meta.updateTag({property: 'og:url', content: this.newURL});
             this.meta.updateTag({property: 'og:image', content: this.property.mainphoto});
             this.meta.updateTag({property: 'og:description', content: this.language});
           this.src=this.lat,this.lng;

          //  this.meta.updateTag(
          //   { property: 'title', content: this.language  },
          // );
        //    this.meta.updateTag(
        //     { property: 'og:title', content: this.property.titleEn  },
        //   );
        //   this.meta.updateTag(
        //     { property: 'og:description', content: this.property.descrEn },
        //   );
        //   this.meta.updateTag(
        //     { property: 'og:description', content: this.property.descrEn },
        //   );
        //   console.log('property.titleEn' + this.property.titleEn);

        //  this.meta.addTag({ name: this.property.titleEn, content: this.property.descrEn });
        
        //  this.meta.addTag({ name: 'title', content: this.property.titleEn });
        //  this.meta.addTag({ name: this.property.titlear, content: this.property.descrAr });
  

      // this.meta.addTag({ property: 'og:image', content: String(this.property.mainphoto) });

      // this.meta.addTag({ property: 'og:title', content: String(this.property.titleEn) });
      // this.meta.addTag({ property: 'og:titlear', content: String(this.property.titlear) });
      // this.meta.addTag({ property: 'og:titleFr', content: String(this.property.titleFr) });
      // this.meta.addTag({ property: 'og:titleTr', content: String(this.property.titleTr) });
  

    


           //photos
           this.appService.getphotos(Number(this.id)).subscribe((data) => {
            var  res : any = data;
            if (res.success) 
              {
              this.getPhosto = res.rows;
                }
           
            this.Photos = this.allphotos( this.getPhosto,Number(this.id)); 
            //console.log('this.getPhosto = ' + this.Photos);

          })
          //photos end
          //city
          this.appService.getCities().subscribe((data) => {
            var  res : any = data;
            if (res.success) 
              {
              this.getcity = res.rows;
                }
            
            this.city = this.cityname( this.getcity,this.property.city); 

          })
          //city end

          //region
          this.appService.region().subscribe((data) => {
            var  res : any = data;
            if (res.success) 
              {
              this.getregion = res.rows;
                }
            this.region = this.regionname(this.getregion,this.property.area); 
          // console.log("city is " + this.region.arabicname);
          })
          //end reigon
              //company
              this.appService.selectcompany().subscribe((data) => {
                var  res : any = data;
                if (res.success) 
                  {
                  this.getcompany = res.rows;
                    }
                    
                this.company = this.companyname(this.getcompany,Number(this.property.company)); 
              // console.log("city is " + this.region.arabicname);
              })
              //end company
          //PropertyType
          this.appService.getPropertyTypes().subscribe(data => {
            this.PropertyType = this.PropertyTypesname(data,this.property.catrgory); 
          // console.log("city is " + this.region.catrgory);
          })
          //end PropertyType
  
     
        })
      
  }
//city
public goweb(){

  // this.firsttimetodetails=false;
  window.localStorage.setItem('first','on');
  this.newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
  document.location.href = this.newURL;

}
public goapp(){

  // this.firsttimetodetails=false;
  // window.localStorage.setItem('first','on');
  this.newURL = "https://appaqarcoo.page.link?amv=0&apn=qa.aqarco.app&link=https%3A%2F%2Faqarcoo.com%2FpropertyDetail%3Fid%3"+this.property.id;
  document.location.href = this.newURL;

}
  public cityname(data,city_id){
    data = data.find(city => city.id === city_id)
   return data;
   }
//region 
   public regionname(data,region_id){
    data = data.find(region => region.id === region_id)
   return data;
   }
   //end
   //region 
   public companyname(data,company_id){
    data = data.find(company => company.id === company_id)
   return data;
   }
   //end
   //PropertyType
   public PropertyTypesname(data,type_id){
    data = data.find(PropertyType => PropertyType.id === type_id)
   return data;
   }
   //end
//for show
public filterDatashow(data,id){
  data = data.find(Property => Property.id === id)


  return data;
  
 }
 public  allphotos(data,aqar){
  data = data.filter(Photos => Photos.aqar === aqar)


  return data;
  
 }

//for show end
goto():void{
 // this.router.navigate(['/property','Modern-and-quirky-flat']);

  
}

  ngOnInit() {
    this.firsttimetodetails=window.localStorage.getItem('first');
    // console.log('this.firsttimetodetails' + this.firsttimetodetails);
     this.title.setTitle(this.property.titleEn)
    // this.title.setTitle('sadsad')
    this.newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
    this.imageurl = window.location.protocol + "//" + window.location.host ;

    // this.getRelatedProperties();
    // this.getFeaturedProperties();
    this.getAgent(1);
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
      if(this.sidenav){
        this.sidenav.close();
      } 
    };
    this.mortgageForm = this.fb.group({
      principalAmount: ['', Validators.required],
      downPayment: ['', Validators.required], 
      interestRate: ['', Validators.required],
      period: ['', Validators.required]
    });
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  } 

  ngOnDestroy() {
   // this.sub.unsubscribe();
  }  

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true; 
  }
/*
  public getPropertyById(id){
    this.appService.getPropertyById(id).subscribe(data=>{
      this.property = data;  
      this.embedVideo = this.embedService.embed(this.property.videos[1].link);
      setTimeout(() => { 
        this.config.observer = true;
        this.config2.observer = true; 
        this.swipers.forEach(swiper => { 
          if(swiper){
            swiper.setIndex(0);
          } 
        }); 
      });
    });
  }
*/
  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 1,
      spaceBetween: 0,       
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    };

    this.config2 = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 16,      
      keyboard: true,
      navigation: false,
      pagination: false, 
      grabCursor: true,       
      loop: false, 
      preloadImages: false,
      lazy: true,  
      breakpoints: {
        200: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 4
        } 
      }
    } 

  }
  

  public onOpenedChange(){ 
    this.swipers.forEach(swiper => { 
      if(swiper){
        swiper.update();
      } 
    });     
  }

  public selectImage(index:number){ 
    this.swipers.forEach(swiper => {
      if(swiper['elementRef'].nativeElement.id == 'main-carousel'){
        swiper.setIndex(index);
      }      
    }); 
  }

  public onIndexChange(index: number) {  
    this.swipers.forEach(swiper => { 
      let elem = swiper['elementRef'].nativeElement;
      if(elem.id == 'small-carousel'){
        swiper.setIndex(index);  
        for (let i = 0; i < elem.children[0].children.length; i++) {
          const element = elem.children[0].children[i]; 
          if(element.classList.contains('thumb-'+index)){
            element.classList.add('active-thumb'); 
          }
          else{
            element.classList.remove('active-thumb'); 
          }
        }
      } 
    });     
  }

  public addToCompare(){
    this.appService.addToCompare(this.property, CompareOverviewComponent, (this.settings.rtl) ? 'rtl':'ltr'); 
  }

  public onCompare(){
    return this.appService.Data.compareList.filter(item=>item.id == this.property.id)[0];
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl':'ltr',this.settings.languageto);
  }

  public onFavorites(){
    return this.appService.Data.favorites.filter(item=>item.id == this.property.id)[0];
  }

  // public getRelatedProperties(){
  //   this.appService.getRelatedProperties().subscribe(properties=>{
  //     this.relatedProperties = properties;
  //   })
  // }

  // public getFeaturedProperties(){
  //   this.appService.getFeaturedProperties().subscribe(properties=>{
  //     this.featuredProperties = properties.slice(0,3); 
  //   })
  // } 

  public getAgent(agentId:number = 1){
    var ids = [1,2,3,4,5]; //agent ids 
    agentId = ids[Math.floor(Math.random()*ids.length)]; //random agent id
    this.agent = this.appService.getAgents().filter(agent=> agent.id == agentId)[0]; 
  }

  public onContactFormSubmit(values:Object){
    if (this.contactForm.valid) { 
     // console.log(values);
    } 
  }

  public onMortgageFormSubmit(values:Object){ 
    if (this.mortgageForm.valid) { 
      var principalAmount = values['principalAmount']
      var down = values['downPayment']
      var interest = values['interestRate']
      var term = values['period']
      this.monthlyPayment = this.calculateMortgage(principalAmount, down, interest / 100 / 12, term * 12).toFixed(2);
    }     
  }
  public calculateMortgage(principalAmount:any, downPayment:any, interestRate:any, period:any){    
    return ((principalAmount-downPayment) * interestRate) / (1 - Math.pow(1 + interestRate, -period));
  } 



}