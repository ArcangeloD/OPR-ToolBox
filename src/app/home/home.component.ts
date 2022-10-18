import { Component, OnInit } from '@angular/core';
import { AppTitle } from './../../environments/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = AppTitle;

  constructor() { }

  ngOnInit(): void {
  }

}
