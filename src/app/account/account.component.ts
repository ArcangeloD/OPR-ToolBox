import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  loading = false;
  profile!: Profile;

  @Input()
  session = this.supabase.session;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile();

    const { username, website, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    });
  }

  async getProfile() {
    try {
      this.loading = true;
      var session = await this.session;
      if (session)
      {
        const { user } = session;
        let { data: profile, error, status } = await this.supabase.profile(user);

        if (error && status !== 406) {
          throw error;
        }

        if (profile) {
          this.profile = profile;
        }
      }
      else
      {
        alert("Session error, redirecting to home");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      var session = await this.session;
      if (session)
      {
        const { user } = session;

        const username = this.updateProfileForm.value.username as string;
        const website = this.updateProfileForm.value.website as string;
        const avatar_url = this.updateProfileForm.value.avatar_url as string;

        const { error } = await this.supabase.updateProfile({
          id: user.id,
          username,
          website,
          avatar_url,
        });
        if (error) throw error;
      }
      else
      {
        alert("Session error, redirecting to home");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  async updateAvatar(event: string): Promise<void> {
    this.updateProfileForm.patchValue({
      avatar_url: event,
    });
    await this.updateProfile();
  }
}