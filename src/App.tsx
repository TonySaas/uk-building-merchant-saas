function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '1rem' 
        }}>
          🏗️ UK Building Merchant SaaS - Server Running!
        </h1>
        
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#059669', marginBottom: '1rem' }}>✅ Development Server Active</h2>
          <p style={{ marginBottom: '1rem' }}>Great! The local development server is now running successfully.</p>
          
          <h3 style={{ color: '#2563eb', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🧩 Polymet Components Available:</h3>
          <ul style={{ marginLeft: '1.5rem', color: '#4b5563' }}>
            <li>120+ UI Components imported from Polymet</li>
            <li>20+ Page templates (Home, About, Features, Contact, etc.)</li>
            <li>Authentication pages (Login, Register)</li>
            <li>Dashboard pages (Supplier, Merchant, Admin)</li>
            <li>Multi-organization theming system</li>
          </ul>
          
          <h3 style={{ color: '#7c3aed', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🏢 Organizations Configured:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '0.375rem' }}>
              <strong>Toolbank</strong><br />
              <small>"Keeping the Tool Trade Local"</small>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '0.375rem' }}>
              <strong>NMBS</strong><br />
              <small>"Empowering Independent Merchants"</small>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fae8ff', borderRadius: '0.375rem' }}>
              <strong>IBC</strong><br />
              <small>"UK's Largest Builders' Merchant Buying Group"</small>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#ffedd5', borderRadius: '0.375rem' }}>
              <strong>BMF</strong><br />
              <small>"Representing the Building Materials Industry"</small>
            </div>
          </div>
          
          <h3 style={{ color: '#dc2626', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🚀 Next Steps:</h3>
          <ol style={{ marginLeft: '1.5rem', color: '#4b5563' }}>
            <li>Set up Supabase project and environment variables</li>
            <li>Configure authentication and user registration</li>
            <li>Implement organization-specific user roles</li>
            <li>Enable full Polymet component functionality</li>
            <li>Test supplier, merchant, and consumer workflows</li>
          </ol>
        </div>
        
        <div style={{ 
          backgroundColor: '#fef3c7', 
          border: '1px solid #f59e0b',
          borderRadius: '0.5rem', 
          padding: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#92400e', margin: 0 }}>
            <strong>Ready for Supabase Integration!</strong> The Polymet foundation is in place.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App