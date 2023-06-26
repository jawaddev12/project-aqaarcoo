import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';




import { AgmCoreModule } from '@agm/core';  
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from '../home/home.component';
import { ArticlesComponent } from './articles.component';
export const routes: Routes = [
    { path: '', component: ArticlesComponent, pathMatch: 'full' },
    // { path: ':id', component: PropertyComponent },
  
  ];
  @NgModule({
    declarations: [
      ArticlesComponent, 
  
    ],
    exports: [
      ArticlesComponent, 
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      AgmCoreModule,
      SharedModule
    ]
  })
  export class ArticlesModule { }