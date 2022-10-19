import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title: String = environment.title;
  
  session = this.supabase.session;

  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
  
  async logout (): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['']);
  }

}
