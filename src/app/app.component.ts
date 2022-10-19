import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;
  
  //session = this.supabase.session;
  
  constructor() {}//private readonly supabase: SupabaseService) {}

  ngOnInit() {
    //this.supabase.authChanges((_, session) => (this.session = session));
  }
}
