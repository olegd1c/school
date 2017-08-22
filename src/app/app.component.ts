import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../environments/environment';
import { AppConfig } from '@app/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
    constructor() {
  }
}
