import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LandingpageComponent } from './landingpage.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [LandingpageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LandingpageModule { }
