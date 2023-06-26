import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';
@Component({
  selector: 'app-privacy-polic',
  templateUrl: './privacy-polic.component.html',
  styleUrls: ['./privacy-polic.component.scss']
})
export class PrivacyPolicComponent implements OnInit {
  public settings: Settings
  constructor(public appSettings:AppSettings) { this.settings = this.appSettings.settings;}

  ngOnInit(): void {
  }

}
