import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { Settings, AppSettings } from '../../app.settings';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public settings: Settings
  public contactForm: UntypedFormGroup;
  public lat: number = 25.260248189238798;
  public lng: number = 51.5239822;
  public zoom: number = 12; 
  constructor(public formBuilder: UntypedFormBuilder,public appSettings:AppSettings) { this.settings = this.appSettings.settings; }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }

}
