import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { AgmCoreModule } from '@agm/core';
import { EmbedVideo } from 'ngx-embed-video'; 
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
// import {provideClientHydration} from '@angular/platform-browser';

const config: InputFileConfig = {
  fileAccept: '*'
};

import { Meta } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 

export function HttpLoaderFactory(httpClient: HttpClient) { 
  return new TranslateHttpLoader(httpClient, environment.url +'/assets/i18n/', '.json');
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { AppInterceptor } from './theme/utils/app-interceptor';


import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Toolbar1Component } from './theme/components/toolbar1/toolbar1.component';
import { Toolbar2Component } from './theme/components/toolbar2/toolbar2.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { CurrencyComponent } from './theme/components/currency/currency.component';
import { LangComponent } from './theme/components/lang/lang.component';
import { SocialIconsComponent } from './theme/components/social-icons/social-icons.component';
import { ContactsComponent } from './theme/components/contacts/contacts.component'; 
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';

import { CountriesComponent } from './theme/components/countries/countries.component';
import { DetailsComponent } from './pages/details/details.component';
import {  Http, HttpModule } from '@angular/http';


import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LangingpagesComponent } from './pages/langingpages/langingpages.component';
import { SsrCookieService } from 'ngx-cookie-service-ssr';




@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,
    CurrencyComponent,
    LangComponent,
    SocialIconsComponent,
    ContactsComponent, 
    Toolbar1Component,
    Toolbar2Component,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    FooterComponent,
    LockScreenComponent,
    CountriesComponent,
    DetailsComponent,
    LangingpagesComponent



  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    BrowserAnimationsModule, 
    FormsModule,
      HttpClientModule, 
      HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I',
      libraries: ["places"]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EmbedVideo.forRoot(),
    NgProgressModule,
    NgProgressHttpModule, 
    InputFileModule.forRoot(config),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    SsrCookieService,
    AppSettings, Meta,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
