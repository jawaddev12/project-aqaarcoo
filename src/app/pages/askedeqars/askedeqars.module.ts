import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';  
import { SharedModule } from '../../shared/shared.module';
import { AskedeqarsComponent } from './askedeqars.component';


import { HomeComponent } from '../home/home.component';
export const routes: Routes = [
    { path: '', component: AskedeqarsComponent, pathMatch: 'full' },
    // { path: ':id', component: PropertyComponent },
  
  ];
  @NgModule({
    declarations: [
      AskedeqarsComponent, 
  
    ],
    exports: [
      AskedeqarsComponent, 
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      AgmCoreModule,
      SharedModule
    ]
  })
  export class askedeqarsModule { }