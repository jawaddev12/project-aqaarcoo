import { ArticlesComponent } from './pages/articles/articles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { DetailsComponent } from './pages/details/details.component';
import { ArticlesdetailsComponent } from './pages/articlesdetails/articlesdetails.component';

import { LangingpagesComponent } from './pages/langingpages/langingpages.component';
export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
           
            {
                path:'properties/:id/:id2',component:DetailsComponent,
              },
              {
                path:'properties/:id',component:DetailsComponent,
              },
              {
                path:'artical/:id/:id2',component:ArticlesdetailsComponent,
              },

            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
           // { path: 'Landingpage', loadChildren: () => import('./pages/Landingpage/Landingpage.module').then(m => m.LandingpageModule) },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
            { path: 'Articles', loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule) },
            { path: 'SALE', loadChildren: () => import('./pages/sale/sale.module').then(m => m.saleModule) },
            { path: 'SALE/:id', loadChildren: () => import('./pages/sale/sale.module').then(m => m.saleModule) },
            { path: 'SALE/:id/:id2', loadChildren: () => import('./pages/sale/sale.module').then(m => m.saleModule) },
            
            { path: 'RENT', loadChildren: () => import('./pages/rent/rent.module').then(m => m.rentModule) },
            { path: 'RENT/:id', loadChildren: () => import('./pages/rent/rent.module').then(m => m.rentModule) },
            { path: 'RENT/:id/:id2', loadChildren: () => import('./pages/rent/rent.module').then(m => m.rentModule) },
            { path: 'dailyrent', loadChildren: () => import('./pages/dailyrent/dailyrent.module').then(m => m.DailyrentModule) },
            { path: 'askedeqars', loadChildren: () => import('./pages/askedeqars/askedeqars.module').then(m => m.askedeqarsModule) },
            { path: 'YACHTS', loadChildren: () => import('./pages/yachts/yachts.module').then(m => m.yachtsModule) },
            { path: 'external', loadChildren: () => import('./pages/external/external.module').then(m => m.externalModule) },
            { path: 'company/:id', loadChildren: () => import('./pages/company/company.module').then(m => m.companyModule) },
            { path: 'agents', loadChildren: () => import('./pages/agents/agents.module').then(m => m.AgentsModule) },
            { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule) },
            { path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule) },
            { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
            { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
            { path: 'privacy-polic', loadChildren: () => import('./pages/privacy-polic/privacy-polic.module').then(m => m.privacypolicModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) }, 
            { path: 'submit-property', loadChildren: () => import('./pages/submit-property/submit-property.module').then(m => m.SubmitPropertyModule) }   
        ]
    },
    { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
    { path: 'lock-screen', component: LockScreenComponent },

    { path: 'eqarco', component: LangingpagesComponent },
    { path: '**', component: NotFoundComponent }
    
   
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
            relativeLinkResolution: 'legacy',
            initialNavigation: 'enabledBlocking', // for one load page, without reload
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }