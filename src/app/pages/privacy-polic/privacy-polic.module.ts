import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PrivacyPolicComponent } from './privacy-polic.component';

export const routes: Routes = [
  { path: '', component: PrivacyPolicComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [PrivacyPolicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class privacypolicModule { }
