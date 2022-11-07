import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
    passwd: ''
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async register(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const passwd = this.signInForm.value.passwd as string;
      const { error } = await this.supabase.signUp(email, passwd);
      if (error)throw error;
      alert('Check your email for the confirmation mail!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
  
  async login(): Promise<void> {
    var readyToRedirect = false;
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const passwd = this.signInForm.value.passwd as string;
      const { error } = await this.supabase.signIn(email, passwd);
      if (error)
      { 
        throw error;
      }
      else
      {
        readyToRedirect = true;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
      if (readyToRedirect)
      {
        this.router.navigate(['']);
      }
    }
  }
}