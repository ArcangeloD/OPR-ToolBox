import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = '';
  welcome_message = '';

  constructor(readonly supabase: SupabaseService) { }

  ngOnInit(): void {
    this.getAppInfos();
  }
  
  async getAppInfos(): Promise<void> {
    const { data, error } = await this.supabase.appInfos();
    if (error)
    {
      alert(error);
    }
    else
    {
      this.title = data.app_name;
      this.welcome_message = data.welcome_message;
    }
  }
}
