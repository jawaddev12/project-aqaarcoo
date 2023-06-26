import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/app-validators';
import { Settings, AppSettings } from '../../../app.settings';
import { countries ,counteqars} from './../../../app.models';
import { AppService } from 'src/app/app.service';
import { isPlatformServer } from '@angular/common';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public settings: Settings;
    public countriy:countries;
    Language: any;
    english: any;
   public arabic: any;
    turkish: any;
    french: any;
    lang:string;
  public lat: number = 40.678178;
  public lng: number = -73.944158;
  public zoom: number = 12; 
  public mapStyles:any = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8b9198"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#323336"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#414954"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2e2f31"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7a7c80"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#242427"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#202022"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#393a3f"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#202022"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#393a3f"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#202022"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#202124"
            }
        ]
    }
  ];
  public feedbackForm: UntypedFormGroup;
  public subscribeForm: UntypedFormGroup;
  private isServer = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public formBuilder: UntypedFormBuilder,public appSettings:AppSettings,public appService:AppService,) 
  {
    this.isServer = isPlatformServer(platformId)
     this.settings = this.appSettings.settings; 
     if(!this.isServer)
     {

     this.appService.selectcountry().subscribe(data => {
        var  res:any = data;
        if (res.success) 
          {
          this.countriy = res.rows;
            }
            if(this.settings.countrykind != null){
                var numberValuelanglang = Number(this.settings.countrykind);
            }
            
            else
            {
                var numberValuelanglang = 1;
            }
            

        this.Language = this.getcountry(this.countriy,numberValuelanglang); 
        if(this.settings.languageto == 'ar')  this.arabic=this.Language.namearabic;
        if(this.settings.languageto == 'en')  this.arabic=this.Language.nameenglish;
        if(this.settings.languageto == 'tr')  this.arabic=this.Language.nameturkish;
        if(this.settings.languageto == 'fr')  this.arabic=this.Language.namefrench;
        
    
        })
    }
    }
    
   //PropertyType
   public getcountry(data,countrykind){
    data = data.find(countriy => countriy.id === countrykind)
   return data;
   }
   //end
  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({ 
      email: ['', Validators.compose([Validators.required, emailValidator])], 
      message: ['', Validators.required]
    });
    this.subscribeForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])]
    })
  }

  public onFeedbackFormSubmit(values:Object):void {
    if (this.feedbackForm.valid) {
      console.log(values);
    }
  }

  public onSubscribeFormSubmit(values:Object):void {
    if (this.subscribeForm.valid) {
      console.log(values);
    }
  }

}
