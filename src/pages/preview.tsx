const PreviewPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '0.5rem' 
          }}>
            🏗️ UK Building Merchant SaaS - Polymet Preview
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Preview of available Polymet pages and components before Supabase integration
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          
          {/* Public Pages */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#2563eb' }}>
              📄 Public Pages
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🏠 Home Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                ℹ️ About Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                ⭐ Features Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                📞 Contact Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🏢 Organizations Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🎯 Offer Discovery
              </div>
            </div>
          </div>

          {/* Authentication Pages */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#059669' }}>
              🔐 Authentication
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🔐 Login Page
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                📝 Registration Page
              </div>
            </div>
          </div>

          {/* Dashboard Pages */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#7c3aed' }}>
              📊 Dashboards
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                📊 Main Dashboard
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🏭 Supplier Dashboard
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                🏪 Merchant Dashboard
              </div>
            </div>
          </div>

          {/* Organizations Preview */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#dc2626' }}>
              🏢 Organizations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#dbeafe', borderRadius: '0.375rem' }}>
                <strong>Toolbank</strong> - "Keeping the Tool Trade Local"
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '0.375rem' }}>
                <strong>NMBS</strong> - "Empowering Independent Merchants"
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fae8ff', borderRadius: '0.375rem' }}>
                <strong>IBC</strong> - "UK's Largest Builders' Merchant Buying Group"
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#ffedd5', borderRadius: '0.375rem' }}>
                <strong>BMF</strong> - "Representing the Building Materials Industry"
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#4b5563' }}>
              📋 Current Status
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                <span>Polymet Components Imported</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                <span>Basic Routing Setup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                <span>Working on Import Fixes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#6b7280', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                <span>Supabase Integration Pending</span>
              </div>
            </div>
          </div>

          {/* Polymet Components */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0891b2' }}>
              🧩 Polymet Components Available
            </h2>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>120+</strong> UI Components imported</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>20+</strong> Page templates ready</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Multi-org</strong> theming system</p>
              <p><strong>Auth & Dashboard</strong> components ready</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>
            ✨ <strong>Note:</strong> Polymet components are loaded but may have import dependencies. 
            This preview shows the structure before full Supabase integration and UI library setup.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage