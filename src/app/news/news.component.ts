import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { News } from '../interfaces/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  news: News[] = [];
  min = 0;
  interval = 4;
  reached_last = false;
  newsChannel: any = null;

  constructor(readonly supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    await this.loadNews();
    this.newsChannel = await this.supabase.newsChannel();
    this.newsChannel
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'news' }, this.handleNewsInsert.bind(this))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'news' }, this.handleNewsUpdate.bind(this))
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'news' }, this.handleNewsDelete.bind(this))
      .subscribe();
  }
  
  async loadMoreNews(): Promise<void> {
    this.min += this.interval+1
    await this.loadNews();
  }
  
  async loadNews(): Promise<void> {
    const { data, error } = await this.supabase.news(this.min, this.min+this.interval);
    if (error)
    {
      alert(error)
    }
    else
    {
      var count = 0;
      data.forEach((item)=>{
        this.news.push(item);
        count++;
      });
      if (count < this.interval+1)
      {
        this.reached_last = true;
      }
    }
  }
  
  async handleNewsInsert(payload: any): Promise<void> {
    this.news.unshift(payload.new);
    const { data, error } = await this.supabase.profileById(payload.new['author']);
    if (error)
    {
      alert(error);
    }
    else
    {
      this.news[0].profiles = data;
    }
  }
  
  handleNewsUpdate(payload: any): void {
    var index = this.news.findIndex((post: News) => post.id === payload.old['id']);
    this.news[index].title = payload.new.title;
    this.news[index].content = payload.new.content;
    this.news[index].updated_at = payload.new.updated_at;
  }
  
  handleNewsDelete(payload: any): void {
    var index = this.news.findIndex((post: News) => post.id === payload.old['id']);
    this.news.splice(index, 1);
  }
}
