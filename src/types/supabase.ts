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
          country?: string
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
          country?: string
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
      get_registration_organizations: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          type: string
          description: string
          logo_url: string
          tagline: string
          is_active: boolean
        }[]
      }
      complete_user_registration: {
        Args: {
          p_user_id: string
          p_role: string
          p_organization_ids: string[]
          p_first_name: string
          p_last_name: string
          p_company_name?: string
          p_phone?: string
          p_address_line_1?: string
          p_address_line_2?: string
          p_city?: string
          p_county?: string
          p_postal_code?: string
          p_country?: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}