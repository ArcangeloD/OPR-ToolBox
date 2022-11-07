export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_informations: {
        Row: {
          id: number
          created_at: string
          app_name: string
          welcome_message: string
          app_icon: string
        }
        Insert: {
          id?: number
          created_at?: string
          app_name: string
          welcome_message: string
          app_icon?: string
        }
        Update: {
          id?: number
          created_at?: string
          app_name?: string
          welcome_message?: string
          app_icon?: string
        }
      }
      news: {
        Row: {
          id: number
          title: string
          content: string
          author: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          title: string
          content: string
          author: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          title?: string
          content?: string
          author?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
