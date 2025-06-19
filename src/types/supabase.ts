// Temporary Supabase types file for development preview
// This will be replaced with generated types once Supabase is properly configured

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          type: 'wholesaler' | 'buying_group' | 'trade_association'
          description?: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'wholesaler' | 'buying_group' | 'trade_association'
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'wholesaler' | 'buying_group' | 'trade_association'
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role?: 'supplier' | 'merchant' | 'consumer' | 'admin'
          company_name?: string | null
          phone?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          county?: string | null
          postal_code?: string | null
          country?: string | null
          email_verified: boolean
          email_verified_at?: string | null
          last_login_at?: string | null
          login_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role?: 'supplier' | 'merchant' | 'consumer' | 'admin'
          company_name?: string | null
          phone?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          county?: string | null
          postal_code?: string | null
          country?: string | null
          email_verified?: boolean
          email_verified_at?: string | null
          last_login_at?: string | null
          login_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'supplier' | 'merchant' | 'consumer' | 'admin'
          company_name?: string | null
          phone?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          county?: string | null
          postal_code?: string | null
          country?: string | null
          email_verified?: boolean
          email_verified_at?: string | null
          last_login_at?: string | null
          login_count?: number
          created_at?: string
          updated_at?: string
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