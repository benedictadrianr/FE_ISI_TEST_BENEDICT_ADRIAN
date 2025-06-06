export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      code: {
        Row: {
          code_name: string
          created_at: string
          full_code: string
          id: number
        }
        Insert: {
          code_name?: string
          created_at?: string
          full_code?: string
          id?: number
        }
        Update: {
          code_name?: string
          created_at?: string
          full_code?: string
          id?: number
        }
        Relationships: []
      }
      company_project: {
        Row: {
          alt: string
          created_at: string
          id: number
          img: string
          link: string
          logo: string
          name: string
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: number
          img?: string
          link?: string
          logo?: string
          name?: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: number
          img?: string
          link?: string
          logo?: string
          name?: string
        }
        Relationships: []
      }
      Experience: {
        Row: {
          companyName: string
          created_at: string
          description: string
          highlight: string
          highlight_point: string[]
          highlightImg: string
          id: number
          jobDesc: string
          jobType: Database["public"]["Enums"]["job-type"] | null
          learnt: string
          learnt_points: string[]
          learntImg: string
          overview: string
          overviewImg: string
          preview_bullet: string[]
          previewImg: string
          skills: string[]
          timeFinish: number | null
          timeStart: number
        }
        Insert: {
          companyName?: string
          created_at?: string
          description?: string
          highlight?: string
          highlight_point?: string[]
          highlightImg?: string
          id?: number
          jobDesc?: string
          jobType?: Database["public"]["Enums"]["job-type"] | null
          learnt?: string
          learnt_points?: string[]
          learntImg?: string
          overview?: string
          overviewImg?: string
          preview_bullet?: string[]
          previewImg?: string
          skills?: string[]
          timeFinish?: number | null
          timeStart?: number
        }
        Update: {
          companyName?: string
          created_at?: string
          description?: string
          highlight?: string
          highlight_point?: string[]
          highlightImg?: string
          id?: number
          jobDesc?: string
          jobType?: Database["public"]["Enums"]["job-type"] | null
          learnt?: string
          learnt_points?: string[]
          learntImg?: string
          overview?: string
          overviewImg?: string
          preview_bullet?: string[]
          previewImg?: string
          skills?: string[]
          timeFinish?: number | null
          timeStart?: number
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          description: string | null
          id: number
          media_url: string
          title: string
          uploader: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          media_url: string
          title?: string
          uploader?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          media_url?: string
          title?: string
          uploader?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploader_fkey"
            columns: ["uploader"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          role: string
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          role: string
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          role?: string
          username?: string | null
        }
        Relationships: []
      }
      Project: {
        Row: {
          alt: string
          created_at: string
          id: number
          img: string
          link: string
          logo: string
          name: string
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: number
          img?: string
          link?: string
          logo?: string
          name?: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: number
          img?: string
          link?: string
          logo?: string
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          id: number
          task_delegations: string[] | null
          task_description: string | null
          task_name: string
          task_status: Database["public"]["Enums"]["task_status"]
        }
        Insert: {
          created_at?: string
          id?: number
          task_delegations?: string[] | null
          task_description?: string | null
          task_name?: string
          task_status?: Database["public"]["Enums"]["task_status"]
        }
        Update: {
          created_at?: string
          id?: number
          task_delegations?: string[] | null
          task_description?: string | null
          task_name?: string
          task_status?: Database["public"]["Enums"]["task_status"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender: "male" | "female" | "other"
      "job-type": "Full Time" | "Part Time" | "Internship" | "Contract"
      role: "team" | "lead"
      task_status: "Not Started" | "On Progress" | "Done" | "Reject"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender: ["male", "female", "other"],
      "job-type": ["Full Time", "Part Time", "Internship", "Contract"],
      role: ["team", "lead"],
      task_status: ["Not Started", "On Progress", "Done", "Reject"],
    },
  },
} as const
