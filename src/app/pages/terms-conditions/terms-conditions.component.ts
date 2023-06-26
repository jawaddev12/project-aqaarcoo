import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  public settings: Settings
  constructor(public appSettings:AppSettings) {   this.settings = this.appSettings.settings;}

  ngOnInit() {
  }

}
