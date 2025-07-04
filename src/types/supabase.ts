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
      analytics_events: {
        Row: {
          device_info: Json | null
          event_properties: Json | null
          event_type: string
          id: string
          location_data: Json | null
          merchant_id: string | null
          occurred_at: string | null
          offer_id: string | null
          organization_id: string | null
          page_url: string | null
          product_id: string | null
          referrer_url: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          device_info?: Json | null
          event_properties?: Json | null
          event_type: string
          id?: string
          location_data?: Json | null
          merchant_id?: string | null
          occurred_at?: string | null
          offer_id?: string | null
          organization_id?: string | null
          page_url?: string | null
          product_id?: string | null
          referrer_url?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          device_info?: Json | null
          event_properties?: Json | null
          event_type?: string
          id?: string
          location_data?: Json | null
          merchant_id?: string | null
          occurred_at?: string | null
          offer_id?: string | null
          organization_id?: string | null
          page_url?: string | null
          product_id?: string | null
          referrer_url?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_workflows: {
        Row: {
          config: Json | null
          created_at: string | null
          id: string
          organization_id: string | null
          updated_at: string | null
          workflow_type: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          updated_at?: string | null
          workflow_type: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          updated_at?: string | null
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_workflows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_locations: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          city: string
          country: string | null
          county: string | null
          created_at: string | null
          delivery_radius_km: number | null
          email: string | null
          facilities: Json | null
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          latitude: number | null
          longitude: number | null
          merchant_id: string | null
          name: string
          opening_hours: Json | null
          phone: string | null
          postal_code: string
          updated_at: string | null
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          city: string
          country?: string | null
          county?: string | null
          created_at?: string | null
          delivery_radius_km?: number | null
          email?: string | null
          facilities?: Json | null
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          latitude?: number | null
          longitude?: number | null
          merchant_id?: string | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          postal_code: string
          updated_at?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          country?: string | null
          county?: string | null
          created_at?: string | null
          delivery_radius_km?: number | null
          email?: string | null
          facilities?: Json | null
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          latitude?: number | null
          longitude?: number | null
          merchant_id?: string | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_locations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_locations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_organization_affiliations: {
        Row: {
          affiliation_status: string | null
          created_at: string | null
          fees_paid_up_to: string | null
          id: string
          member_since: string | null
          membership_benefits: Json | null
          membership_level: string | null
          merchant_id: string | null
          organization_id: string | null
          updated_at: string | null
        }
        Insert: {
          affiliation_status?: string | null
          created_at?: string | null
          fees_paid_up_to?: string | null
          id?: string
          member_since?: string | null
          membership_benefits?: Json | null
          membership_level?: string | null
          merchant_id?: string | null
          organization_id?: string | null
          updated_at?: string | null
        }
        Update: {
          affiliation_status?: string | null
          created_at?: string | null
          fees_paid_up_to?: string | null
          id?: string
          member_since?: string | null
          membership_benefits?: Json | null
          membership_level?: string | null
          merchant_id?: string | null
          organization_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_organization_affiliations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_organization_affiliations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_organization_affiliations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_reviews: {
        Row: {
          created_at: string | null
          helpful_votes: number | null
          id: string
          is_anonymous: boolean | null
          merchant_id: string | null
          rating: number
          review_text: string | null
          service_aspects: Json | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verified_customer: boolean | null
        }
        Insert: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_anonymous?: boolean | null
          merchant_id?: string | null
          rating: number
          review_text?: string | null
          service_aspects?: Json | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_customer?: boolean | null
        }
        Update: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_anonymous?: boolean | null
          merchant_id?: string | null
          rating?: number
          review_text?: string | null
          service_aspects?: Json | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_customer?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_selected_offers: {
        Row: {
          click_and_collect_available: boolean | null
          display_on_website: boolean | null
          estimated_stock_quantity: number | null
          id: string
          is_active: boolean | null
          local_delivery_available: boolean | null
          merchant_id: string | null
          merchant_notes: string | null
          offer_id: string | null
          organization_id: string | null
          selected_at: string | null
          stock_availability: string | null
          updated_at: string | null
        }
        Insert: {
          click_and_collect_available?: boolean | null
          display_on_website?: boolean | null
          estimated_stock_quantity?: number | null
          id?: string
          is_active?: boolean | null
          local_delivery_available?: boolean | null
          merchant_id?: string | null
          merchant_notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          selected_at?: string | null
          stock_availability?: string | null
          updated_at?: string | null
        }
        Update: {
          click_and_collect_available?: boolean | null
          display_on_website?: boolean | null
          estimated_stock_quantity?: number | null
          id?: string
          is_active?: boolean | null
          local_delivery_available?: boolean | null
          merchant_id?: string | null
          merchant_notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          selected_at?: string | null
          stock_availability?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_selected_offers_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_selected_offers_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_selected_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_selected_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_selected_offers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_views: {
        Row: {
          id: string
          merchant_id: string | null
          organization_id: string | null
          page_section: string | null
          referrer_source: string | null
          session_id: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          merchant_id?: string | null
          organization_id?: string | null
          page_section?: string | null
          referrer_source?: string | null
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          merchant_id?: string | null
          organization_id?: string | null
          page_section?: string | null
          referrer_source?: string | null
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_views_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_views_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_views_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          annual_turnover_band: string | null
          business_registration_number: string | null
          created_at: string | null
          description: string | null
          email: string | null
          employee_count_band: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          owner_user_id: string | null
          phone: string | null
          trading_since: string | null
          updated_at: string | null
          vat_number: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by_user_id: string | null
          website_url: string | null
        }
        Insert: {
          annual_turnover_band?: string | null
          business_registration_number?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          employee_count_band?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          owner_user_id?: string | null
          phone?: string | null
          trading_since?: string | null
          updated_at?: string | null
          vat_number?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by_user_id?: string | null
          website_url?: string | null
        }
        Update: {
          annual_turnover_band?: string | null
          business_registration_number?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          employee_count_band?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          owner_user_id?: string | null
          phone?: string | null
          trading_since?: string | null
          updated_at?: string | null
          vat_number?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by_user_id?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchants_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchants_verified_by_user_id_fkey"
            columns: ["verified_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          notification_types: Json | null
          push_notifications: boolean | null
          quiet_hours: Json | null
          sms_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          notification_types?: Json | null
          push_notifications?: boolean | null
          quiet_hours?: Json | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          notification_types?: Json | null
          push_notifications?: boolean | null
          quiet_hours?: Json | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_email_sent: boolean | null
          is_read: boolean | null
          message: string
          priority: string | null
          read_at: string | null
          related_merchant_id: string | null
          related_offer_id: string | null
          related_organization_id: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message: string
          priority?: string | null
          read_at?: string | null
          related_merchant_id?: string | null
          related_offer_id?: string | null
          related_organization_id?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message?: string
          priority?: string | null
          read_at?: string | null
          related_merchant_id?: string | null
          related_offer_id?: string | null
          related_organization_id?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_merchant_id_fkey"
            columns: ["related_merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_merchant_id_fkey"
            columns: ["related_merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_offer_id_fkey"
            columns: ["related_offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_offer_id_fkey"
            columns: ["related_offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_organization_id_fkey"
            columns: ["related_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          media_type: string
          offer_id: string | null
          sort_order: number | null
          title: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          media_type: string
          offer_id?: string | null
          sort_order?: number | null
          title?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          media_type?: string
          offer_id?: string | null
          sort_order?: number | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "offer_media_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_media_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_products: {
        Row: {
          created_at: string | null
          id: string
          max_quantity_per_customer: number | null
          offer_id: string | null
          offer_price: number
          product_id: string | null
          regular_price: number
          savings_amount: number | null
          savings_percentage: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_quantity_per_customer?: number | null
          offer_id?: string | null
          offer_price: number
          product_id?: string | null
          regular_price: number
          savings_amount?: number | null
          savings_percentage?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_quantity_per_customer?: number | null
          offer_id?: string | null
          offer_price?: number
          product_id?: string | null
          regular_price?: number
          savings_amount?: number | null
          savings_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offer_products_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_products_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_reservations: {
        Row: {
          collection_method: string | null
          confirmation_code: string | null
          created_at: string | null
          customer_notes: string | null
          expires_at: string | null
          id: string
          merchant_id: string | null
          merchant_notes: string | null
          offer_id: string | null
          organization_id: string | null
          preferred_collection_date: string | null
          quantity: number
          status: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          collection_method?: string | null
          confirmation_code?: string | null
          created_at?: string | null
          customer_notes?: string | null
          expires_at?: string | null
          id?: string
          merchant_id?: string | null
          merchant_notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          preferred_collection_date?: string | null
          quantity?: number
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          collection_method?: string | null
          confirmation_code?: string | null
          created_at?: string | null
          customer_notes?: string | null
          expires_at?: string | null
          id?: string
          merchant_id?: string | null
          merchant_notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          preferred_collection_date?: string | null
          quantity?: number
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offer_reservations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reservations_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reservations_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reservations_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reservations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_reviews: {
        Row: {
          created_at: string | null
          helpful_votes: number | null
          id: string
          is_anonymous: boolean | null
          merchant_id: string | null
          offer_id: string | null
          rating: number
          reported_count: number | null
          review_text: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verified_purchase: boolean | null
        }
        Insert: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_anonymous?: boolean | null
          merchant_id?: string | null
          offer_id?: string | null
          rating: number
          reported_count?: number | null
          review_text?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_purchase?: boolean | null
        }
        Update: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_anonymous?: boolean | null
          merchant_id?: string | null
          offer_id?: string | null
          rating?: number
          reported_count?: number | null
          review_text?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "offer_reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reviews_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reviews_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_views: {
        Row: {
          device_type: string | null
          id: string
          offer_id: string | null
          organization_id: string | null
          referrer_source: string | null
          session_id: string | null
          user_id: string | null
          view_duration_seconds: number | null
          viewed_at: string | null
        }
        Insert: {
          device_type?: string | null
          id?: string
          offer_id?: string | null
          organization_id?: string | null
          referrer_source?: string | null
          session_id?: string | null
          user_id?: string | null
          view_duration_seconds?: number | null
          viewed_at?: string | null
        }
        Update: {
          device_type?: string | null
          id?: string
          offer_id?: string | null
          organization_id?: string | null
          referrer_source?: string | null
          session_id?: string | null
          user_id?: string | null
          view_duration_seconds?: number | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offer_views_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_views_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_views_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          created_at: string | null
          description: string | null
          discount_value: number | null
          end_date: string
          id: string
          maximum_quantity: number | null
          minimum_order_value: number | null
          minimum_quantity: number | null
          offer_type: string
          priority: number | null
          short_description: string | null
          start_date: string
          status: string | null
          supplier_id: string | null
          terms_and_conditions: string | null
          title: string
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_value?: number | null
          end_date: string
          id?: string
          maximum_quantity?: number | null
          minimum_order_value?: number | null
          minimum_quantity?: number | null
          offer_type?: string
          priority?: number | null
          short_description?: string | null
          start_date: string
          status?: string | null
          supplier_id?: string | null
          terms_and_conditions?: string | null
          title: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_value?: number | null
          end_date?: string
          id?: string
          maximum_quantity?: number | null
          minimum_order_value?: number | null
          minimum_quantity?: number | null
          offer_type?: string
          priority?: number | null
          short_description?: string | null
          start_date?: string
          status?: string | null
          supplier_id?: string | null
          terms_and_conditions?: string | null
          title?: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_business_rules: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          rule_config: Json | null
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          rule_config?: Json | null
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          rule_config?: Json | null
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_business_rules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_offers: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by_user_id: string | null
          created_at: string | null
          id: string
          offer_id: string | null
          organization_id: string | null
          rejection_reason: string | null
          updated_at: string | null
          visibility_settings: Json | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by_user_id?: string | null
          created_at?: string | null
          id?: string
          offer_id?: string | null
          organization_id?: string | null
          rejection_reason?: string | null
          updated_at?: string | null
          visibility_settings?: Json | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by_user_id?: string | null
          created_at?: string | null
          id?: string
          offer_id?: string | null
          organization_id?: string | null
          rejection_reason?: string | null
          updated_at?: string | null
          visibility_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_offers_approved_by_user_id_fkey"
            columns: ["approved_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_offers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_relationships: {
        Row: {
          child_organization_id: string | null
          created_at: string | null
          id: string
          parent_organization_id: string | null
          relationship_type: string
        }
        Insert: {
          child_organization_id?: string | null
          created_at?: string | null
          id?: string
          parent_organization_id?: string | null
          relationship_type?: string
        }
        Update: {
          child_organization_id?: string | null
          created_at?: string | null
          id?: string
          parent_organization_id?: string | null
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_relationships_child_organization_id_fkey"
            columns: ["child_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_relationships_parent_organization_id_fkey"
            columns: ["parent_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_name: string
          role_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_name: string
          role_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_name?: string
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "organization_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          organization_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_settings: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          organization_id: string | null
          primary_color: string | null
          secondary_color: string | null
          tagline: string | null
          terms_and_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          organization_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tagline?: string | null
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          organization_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tagline?: string | null
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_category_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_category_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_category_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category_mappings: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          product_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_mappings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_size_bytes: number | null
          id: string
          media_type: string
          mime_type: string | null
          product_id: string | null
          sort_order: number | null
          title: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_size_bytes?: number | null
          id?: string
          media_type: string
          mime_type?: string | null
          product_id?: string | null
          sort_order?: number | null
          title?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_size_bytes?: number | null
          id?: string
          media_type?: string
          mime_type?: string | null
          product_id?: string | null
          sort_order?: number | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barcode: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          dimensions_cm: Json | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string | null
          regular_price: number | null
          short_description: string | null
          sku: string | null
          specifications: Json | null
          stock_status: string | null
          supplier_id: string | null
          updated_at: string | null
          weight_kg: number | null
        }
        Insert: {
          barcode?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dimensions_cm?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id?: string | null
          regular_price?: number | null
          short_description?: string | null
          sku?: string | null
          specifications?: Json | null
          stock_status?: string | null
          supplier_id?: string | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          barcode?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dimensions_cm?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string | null
          regular_price?: number | null
          short_description?: string | null
          sku?: string | null
          specifications?: Json | null
          stock_status?: string | null
          supplier_id?: string | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_followed_merchants: {
        Row: {
          followed_at: string | null
          id: string
          merchant_id: string | null
          notification_preferences: Json | null
          user_id: string | null
        }
        Insert: {
          followed_at?: string | null
          id?: string
          merchant_id?: string | null
          notification_preferences?: Json | null
          user_id?: string | null
        }
        Update: {
          followed_at?: string | null
          id?: string
          merchant_id?: string | null
          notification_preferences?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_followed_merchants_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_followed_merchants_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_followed_merchants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_organization_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organization_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_organization_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "organization_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_organization_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          company_name: string | null
          country: string | null
          county: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          email_verified_at: string | null
          first_name: string | null
          id: string
          last_login_at: string | null
          last_name: string | null
          login_count: number | null
          phone: string | null
          postal_code: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          email_verified_at?: string | null
          first_name?: string | null
          id: string
          last_login_at?: string | null
          last_name?: string | null
          login_count?: number | null
          phone?: string | null
          postal_code?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          email_verified_at?: string | null
          first_name?: string | null
          id?: string
          last_login_at?: string | null
          last_name?: string | null
          login_count?: number | null
          phone?: string | null
          postal_code?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_saved_offers: {
        Row: {
          id: string
          notes: string | null
          offer_id: string | null
          organization_id: string | null
          reminder_date: string | null
          saved_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          reminder_date?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          offer_id?: string | null
          organization_id?: string | null
          reminder_date?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offer_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_offers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_offers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_offers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_search_history: {
        Row: {
          id: string
          organization_id: string | null
          results_count: number | null
          search_filters: Json | null
          search_query: string
          searched_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          organization_id?: string | null
          results_count?: number | null
          search_filters?: Json | null
          search_query: string
          searched_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          organization_id?: string | null
          results_count?: number | null
          search_filters?: Json | null
          search_query?: string
          searched_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_search_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      merchant_analytics: {
        Row: {
          average_rating: number | null
          follower_count: number | null
          id: string | null
          name: string | null
          owner_user_id: string | null
          selected_offers_count: number | null
          total_reservations: number | null
          total_reviews: number | null
          total_views: number | null
          unique_viewers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "merchants_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_analytics: {
        Row: {
          average_rating: number | null
          confirmed_reservations: number | null
          id: string | null
          supplier_id: string | null
          times_saved: number | null
          title: string | null
          total_reservations: number | null
          total_reviews: number | null
          total_views: number | null
          unique_viewers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      complete_user_registration: {
        Args: {
          user_id: string
          email_param: string
          first_name_param: string
          last_name_param: string
          role_param: string
          company_name_param?: string
          phone_param?: string
          address_line_1_param?: string
          address_line_2_param?: string
          city_param?: string
          county_param?: string
          postal_code_param?: string
          organization_ids?: string[]
        }
        Returns: Json
      }
      create_user_profile_robust: {
        Args: {
          user_id: string
          email_param: string
          first_name_param?: string
          last_name_param?: string
          role_param?: string
        }
        Returns: Json
      }
      debug_registration_test: {
        Args: Record<PropertyKey, never>
        Returns: {
          result: Json
        }[]
      }
      generate_file_path: {
        Args: {
          bucket_name: string
          entity_type: string
          entity_id: string
          filename: string
        }
        Returns: string
      }
      get_file_url: {
        Args: { bucket_name: string; file_path: string }
        Returns: string
      }
      get_popular_offers: {
        Args: {
          organization_id_param?: string
          days_back?: number
          limit_count?: number
        }
        Returns: {
          offer_id: string
          title: string
          view_count: number
          unique_viewers: number
          save_count: number
        }[]
      }
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
      get_user_organizations: {
        Args: { user_id_param: string }
        Returns: {
          organization_id: string
          organization_name: string
          role_name: string
        }[]
      }
      handle_email_verification: {
        Args: { verification_token: string; user_email: string }
        Returns: Json
      }
      setup_default_organization_roles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      user_has_permission: {
        Args: {
          user_id_param: string
          organization_id_param: string
          permission_name_param: string
        }
        Returns: boolean
      }
      user_is_organization_member: {
        Args: { user_id_param: string; organization_id_param: string }
        Returns: boolean
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
    Enums: {},
  },
} as const
