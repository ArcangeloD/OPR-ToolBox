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

  constructor(readonly supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    await this.loadNews();
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
}
