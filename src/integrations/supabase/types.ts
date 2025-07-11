export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          id: string
          published: boolean | null
          published_at: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          published?: boolean | null
          published_at?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          published?: boolean | null
          published_at?: string
          title?: string
        }
        Relationships: []
      }
      article_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "article_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          available: boolean | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          pdf_preview_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          available?: boolean | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          pdf_preview_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          available?: boolean | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          pdf_preview_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          domain: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          domain: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          domain?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          approved: boolean | null
          article_id: string | null
          content: string
          email: string
          id: string
          posted_at: string
          thinker_id: string | null
          user_name: string
        }
        Insert: {
          approved?: boolean | null
          article_id?: string | null
          content: string
          email: string
          id?: string
          posted_at?: string
          thinker_id?: string | null
          user_name: string
        }
        Update: {
          approved?: boolean | null
          article_id?: string | null
          content?: string
          email?: string
          id?: string
          posted_at?: string
          thinker_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_thinker_id_fkey"
            columns: ["thinker_id"]
            isOneToOne: false
            referencedRelation: "thinkers"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          sent_at: string
          subject: string
        }
        Insert: {
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          sent_at?: string
          subject: string
        }
        Update: {
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          sent_at?: string
          subject?: string
        }
        Relationships: []
      }
      media_gallery: {
        Row: {
          description: string | null
          event_date: string | null
          id: string
          media_url: string
          title: string
          type: Database["public"]["Enums"]["media_type"]
          uploaded_at: string
        }
        Insert: {
          description?: string | null
          event_date?: string | null
          id?: string
          media_url: string
          title: string
          type: Database["public"]["Enums"]["media_type"]
          uploaded_at?: string
        }
        Update: {
          description?: string | null
          event_date?: string | null
          id?: string
          media_url?: string
          title?: string
          type?: Database["public"]["Enums"]["media_type"]
          uploaded_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          author: string
          author_title: string | null
          created_at: string
          id: string
          quote: string
          thinker_id: string | null
        }
        Insert: {
          author: string
          author_title?: string | null
          created_at?: string
          id?: string
          quote: string
          thinker_id?: string | null
        }
        Update: {
          author?: string
          author_title?: string | null
          created_at?: string
          id?: string
          quote?: string
          thinker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_thinker_id_fkey"
            columns: ["thinker_id"]
            isOneToOne: false
            referencedRelation: "thinkers"
            referencedColumns: ["id"]
          },
        ]
      }
      site_stats: {
        Row: {
          description: string | null
          id: string
          label: string
          number_value: string
          stat_key: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: string
          label: string
          number_value: string
          stat_key: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: string
          label?: string
          number_value?: string
          stat_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      thinker_ideas: {
        Row: {
          created_at: string
          id: string
          idea: string
          thinker_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          idea: string
          thinker_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          idea?: string
          thinker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thinker_ideas_thinker_id_fkey"
            columns: ["thinker_id"]
            isOneToOne: false
            referencedRelation: "thinkers"
            referencedColumns: ["id"]
          },
        ]
      }
      thinkers: {
        Row: {
          birth_year: number | null
          career: string | null
          category: string | null
          category_id: string | null
          contributions_impact: string | null
          country: string | null
          created_at: string
          death_year: number | null
          description: string
          education: string | null
          id: string
          image_url: string | null
          name: string
          period: string | null
          practical_impact: string | null
          title: string
          updated_at: string
          vision: string | null
          works_projects_media: Json | null
        }
        Insert: {
          birth_year?: number | null
          career?: string | null
          category?: string | null
          category_id?: string | null
          contributions_impact?: string | null
          country?: string | null
          created_at?: string
          death_year?: number | null
          description: string
          education?: string | null
          id?: string
          image_url?: string | null
          name: string
          period?: string | null
          practical_impact?: string | null
          title: string
          updated_at?: string
          vision?: string | null
          works_projects_media?: Json | null
        }
        Update: {
          birth_year?: number | null
          career?: string | null
          category?: string | null
          category_id?: string | null
          contributions_impact?: string | null
          country?: string | null
          created_at?: string
          death_year?: number | null
          description?: string
          education?: string | null
          id?: string
          image_url?: string | null
          name?: string
          period?: string | null
          practical_impact?: string | null
          title?: string
          updated_at?: string
          vision?: string | null
          works_projects_media?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "thinkers_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      media_type: "image" | "video" | "event"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      media_type: ["image", "video", "event"],
    },
  },
} as const
