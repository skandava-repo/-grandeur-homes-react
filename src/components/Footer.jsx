const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-bg-darker)', padding: '3rem 0 2rem', borderTop: '1px solid rgba(201, 169, 97, 0.1)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-accent)' }}>GRANDEUR HOMES</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['About', 'Services', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}>{item}</a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(201, 169, 97, 0.1)' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>&copy; 2025 Grandeur Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
