import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from 'src/schema';

import { Profile } from './interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      }
    );
  }

//Authentication
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    })
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }
  
  profileById(id: String) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string, passwd: string) {
    return this.supabase.auth.signInWithPassword({ 
      email: email,
      password: passwd      
    });
  }
  
  signUp(email: string, passwd: string) {
    return this.supabase.auth.signUp({
      email: email,
      password: passwd
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
  
//Realtime subscription
  getChannel(tableName: string) {
    return this.supabase.channel('public:' + tableName);
  }

//App Informations
  appInfos () {
    return this.supabase
      .from('app_informations')
      .select('app_icon, app_name, welcome_message')
      .single();
  }
  
//News

  news (min: number, max: number) {
    return this.supabase
      .from('news')
      .select('id, title, content, created_at, updated_at, author, profiles(username, avatar_url)')
      .range(min, max)
      .order('created_at', { ascending: false });
  }
  
  newsChannel() {
    return this.supabase.channel('public:news');
  }
}