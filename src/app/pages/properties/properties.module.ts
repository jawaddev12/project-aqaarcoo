import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';  
import { SharedModule } from '../../shared/shared.module';
import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './property/property.component';
import { ShowComponent } from './show/show.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  { path: '', component: PropertiesComponent, pathMatch: 'full' },
  // { path: ':id', component: PropertyComponent },

];

@NgModule({
  declarations: [
    PropertiesComponent, 
    PropertyComponent, ShowComponent
  ],
  exports: [
    PropertiesComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule,
    SharedModule
  ]
})
export class PropertiesModule { }
