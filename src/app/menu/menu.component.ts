import { Component, OnInit } from '@angular/core';
import { AppTitle } from './../../environments/config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title: String = AppTitle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
