import { Link } from 'react-router-dom';

export function TopNav({ active = 'Inicio', bone = false }) {
  const items = ['Inicio', 'Portafolio', 'Servicios', 'Bioseguridad', 'Aftercare', 'Contacto'];
  const routes = {
    Inicio: '/', Portafolio: '/portafolio', Servicios: '/servicios',
    Bioseguridad: '/bioseguridad', Aftercare: '/aftercare', Contacto: '/',
  };
  const c = bone ? 'rgba(14,14,12,.7)' : 'rgba(242,238,229,.7)';
  const fg = bone ? '#0E0E0C' : '#F2EEE5';
  const line = bone ? 'rgba(14,14,12,.14)' : 'rgba(242,238,229,.12)';

  return (
    <div style={{ borderBottom: `1px solid ${line}`, padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: fg, position: 'sticky', top: 0, zIndex: 10, background: bone ? 'var(--bone)' : 'var(--ink)' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, color: fg }}>
        <div style={{ width: 30, height: 30, border: `1px solid ${fg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20 }}>I</div>
        <div>
          <div className="serif-i" style={{ fontSize: 18, lineHeight: 1 }}>Atelier</div>
          <div className="lab" style={{ fontSize: 9, marginTop: 2 }}>EST · CDMX · MMXVI</div>
        </div>
      </Link>
      <nav style={{ display: 'flex', gap: 28 }}>
        {items.map(it => (
          <Link key={it} to={routes[it]} style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
            color: it === active ? fg : c, paddingBottom: 2,
            borderBottom: it === active ? `1px solid ${fg}` : '1px solid transparent',
          }}>{it}</Link>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span className="lab" style={{ color: c }}>ES / EN</span>
        <Link to="/servicios" className={bone ? 'btn btn-ink' : 'btn'} style={{ padding: '10px 16px', fontSize: 10 }}>Reservar</Link>
      </div>
    </div>
  );
}

export function FooterMark({ bone = false }) {
  const line = bone ? 'rgba(14,14,12,.14)' : 'rgba(242,238,229,.12)';
  return (
    <div style={{ borderTop: `1px solid ${line}`, padding: '32px 40px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <div className="serif-i" style={{ fontSize: 36, lineHeight: 1 }}>Atelier</div>
        <div className="lab" style={{ marginTop: 10 }}>Studio of permanent marks · since 2016</div>
      </div>
      <div>
        <div className="lab" style={{ marginBottom: 10 }}>Visitar</div>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>Av. Álvaro Obregón 24<br />Col. Roma Norte<br />Ciudad de México</div>
      </div>
      <div>
        <div className="lab" style={{ marginBottom: 10 }}>Horario</div>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>Mar — Sáb<br />11:00 — 20:00<br />Solo con cita</div>
      </div>
      <div>
        <div className="lab" style={{ marginBottom: 10 }}>Seguir</div>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>@atelier.ink<br />hola@atelier.mx<br />+52 55 1234 5678</div>
      </div>
    </div>
  );
}

export function SectionHeader({ kicker, title, subtitle, bone = false, align = 'left' }) {
  return (
    <div style={{ textAlign: align }}>
      <div className="lab" style={{ marginBottom: 18 }}>{kicker}</div>
      <h2 className="serif" style={{ fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
      {subtitle && <p style={{ marginTop: 18, maxWidth: 540, fontSize: 14, lineHeight: 1.6, color: bone ? 'rgba(14,14,12,.6)' : 'rgba(242,238,229,.6)' }}>{subtitle}</p>}
    </div>
  );
}
