import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-langingpages',
  templateUrl: './langingpages.component.html',
  styleUrls: ['./langingpages.component.scss'],
})
export class LangingpagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    document.getElementById('preloader').classList.add('hide');
  }
}
