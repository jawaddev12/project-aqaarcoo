import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export class Settings {

    constructor(public name: string,
                public theme: string,
                public toolbar: number,
                public stickyMenuToolbar: boolean,                
                public header: string,
                public rtl: boolean,
                public searchPanelVariant: number,
                public searchOnBtnClick: boolean,
                public currency: string,
                public languageto: string,
                public countrykind: any,
               

                //additional options
                public mainToolbarFixed:boolean,
                public contentOffsetToTop:boolean,                
                public headerBgImage: boolean,
                public headerBgVideo: boolean,
                public loadMore: {                    
                    start: boolean,
                    step: number,
                    load: boolean,
                    page: number,
                    complete: boolean,
                    result: number
                } 
                ) { }
}

@Injectable()
export class AppSettings {
    /**
     *
     */
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private cookieService:SsrCookieService
    ) {
        
    }
    public settings = new Settings(
        'Aqarco',  // theme name
        'blue',      // blue, green, red, pink, purple, grey, orange-dark
        1,           // 1 or 2  
        true,        // true = sticky, false = not sticky
        'image',     // default, image, carousel, map, video
        false,       // true = rtl, false = ltr
        1,           //  1, 2  or 3
        false,       //  true = search on button click
        'USD',       // USD, EUR
        'ar',       // ar, en
        !this.isServer() ?
        window.localStorage.getItem('Ip') : this.cookieService.get('Ip'),

        //NOTE:  don't change additional options values, they used for theme performance
        false,
        false,
        false,        
        false,
        {            
            start: false,
            step: 1,
            load: false,
            page: 1,
            complete: false,
            result: 0
        }  
    )
    
    isServer(){
        return !isPlatformBrowser(this.platformId);
    }
}