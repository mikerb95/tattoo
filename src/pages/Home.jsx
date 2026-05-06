import { Link } from 'react-router-dom';
import { TopNav, FooterMark, SectionHeader } from '../components/Chrome';
import { Ic } from '../components/Icons';

export default function HomePage() {
  return (
    <div className="ink-app">
      <div className="grain" />
      <TopNav active="Inicio" />

      {/* Hero */}
      <section style={{ padding: '60px 40px 80px', position: 'relative' }}>
        <div className="lab" style={{ marginBottom: 40 }}>· nº 0001 — primavera</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'end' }}>
          <div>
            <h1 className="serif" style={{ fontSize: 'clamp(80px,11vw,168px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em' }}>
              Marcas<br />
              <span className="serif-i" style={{ color: 'var(--gold)' }}>permanentes</span><br />
              hechas a mano.
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 56, flexWrap: 'wrap' }}>
              <Link to="/servicios" className="btn btn-solid">Reservar consulta {Ic.arrow}</Link>
              <Link to="/portafolio" className="btn">Ver portafolio</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="dot" style={{ background: '#3D8C5F' }} />
                <span className="lab">3 artistas con cupo abierto</span>
              </div>
            </div>
          </div>
          <div>
            <div className="placeholder warm" style={{ height: 540 }}>· hero · piece in progress · 35mm ·</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
              <span className="lab">Pieza de A. Ferraris</span>
              <span className="lab">Plate I/IV</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee values */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '26px 40px', display: 'flex', justifyContent: 'space-between', overflow: 'hidden', flexWrap: 'wrap', gap: 20 }}>
        {['Custom only', 'Ten años de práctica', 'Bioseguridad clínica', 'Cinco artistas residentes', 'Diseño de autor'].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="serif-i" style={{ fontSize: 22, color: 'var(--gold)' }}>§</span>
            <span className="mono" style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>{t}</span>
          </div>
        ))}
      </section>

      {/* Manifesto */}
      <section style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
        <div className="lab">· manifiesto</div>
        <div>
          <p className="serif" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
            Tatuamos despacio. Una pieza por día, una historia por persona.
            <span style={{ color: 'var(--ash)' }}> Cada cita comienza con conversación, referencia y un boceto que jamás se repite. </span>
            <span className="serif-i" style={{ color: 'var(--gold)' }}>No replicamos diseños ajenos.</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 64 }}>
            {[
              { n: '01', t: 'Consulta', d: 'Conversación de 30 min sin compromiso. Definimos concepto, escala y zona.' },
              { n: '02', t: 'Boceto', d: 'Diseño exclusivo entregado 72h antes. Dos rondas de ajuste incluidas.' },
              { n: '03', t: 'Sesión', d: 'Estudio privado, equipo desechable, café de especialidad incluido.' },
            ].map(b => (
              <div key={b.n}>
                <div className="lab" style={{ color: 'var(--gold)' }}>{b.n}</div>
                <div className="serif" style={{ fontSize: 28, marginTop: 12 }}>{b.t}</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--bone-3)', marginTop: 10 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr" />

      {/* Featured artists */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
          <SectionHeader kicker="· residentes — 05" title="Manos que firman" />
          <Link to="/portafolio" className="lab" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Todos los artistas {Ic.arrow}</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {[
            { n: 'Ana Ferraris', s: 'Fineline · botánico', y: '06 yrs', h: 540, ph: 'warm' },
            { n: 'Diego Solana', s: 'Blackwork · ornamental', y: '11 yrs', h: 460, ph: '' },
            { n: 'Mara Itzel', s: 'Neotradicional', y: '08 yrs', h: 580, ph: 'gold' },
            { n: 'Kenji Aoki', s: 'Irezumi · wabori', y: '14 yrs', h: 500, ph: 'warm' },
          ].map((a, i) => (
            <div key={i} className="lift" style={{ marginTop: i % 2 === 0 ? 0 : 40 }}>
              <div className={`placeholder ${a.ph}`} style={{ height: a.h }}>· portrait · {a.n.split(' ')[0].toLowerCase()} ·</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
                <div>
                  <div className="serif" style={{ fontSize: 22 }}>{a.n}</div>
                  <div className="lab" style={{ marginTop: 4 }}>{a.s}</div>
                </div>
                <span className="chip">{a.y}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section style={{ padding: '80px 40px', background: 'var(--ink-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40 }}>
          <SectionHeader kicker="· archivo · selección de la temporada" title="Trabajo selecto" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Todo', 'Fineline', 'Blackwork', 'Color', 'Irezumi'].map((t, i) => (
              <span key={i} className={i === 0 ? 'chip chip-gold' : 'chip'}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridAutoRows: 110, gap: 14 }}>
          {[
            { c: '1/5', r: '1/4', ph: 'warm', t: 'Lirio en tinta · brazo' },
            { c: '5/9', r: '1/3', ph: '', t: 'Mandala · espalda' },
            { c: '9/13', r: '1/3', ph: 'gold', t: 'Carpa nishikigoi' },
            { c: '5/9', r: '3/5', ph: 'warm', t: 'Constelación · clavícula' },
            { c: '9/13', r: '3/5', ph: '', t: 'Fern · costilla' },
            { c: '1/7', r: '4/7', ph: 'gold', t: 'Florería neotrad' },
            { c: '7/13', r: '5/7', ph: 'warm', t: 'Calavera · pierna' },
          ].map((g, i) => (
            <div key={i} style={{ gridColumn: g.c, gridRow: g.r, position: 'relative', overflow: 'hidden' }}>
              <div className={`placeholder ${g.ph}`} style={{ height: '100%' }}>· {String(i + 1).padStart(2, '0')} ·</div>
              <div style={{ position: 'absolute', left: 12, bottom: 10, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <span className="lab lab-bone">{g.t}</span>
                <span className="lab lab-bone">2025</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Biosafety metrics */}
      <section style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <SectionHeader kicker="· bioseguridad" title={<>Estándar <span className="serif-i" style={{ color: 'var(--gold)' }}>clínico</span>, no negociable.</>} subtitle="Autoclave clase B, agujas de un solo uso, registros de esterilización trazables y consentimiento digital firmado antes de cada sesión." />
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
            <Link to="/bioseguridad" className="btn">Ver protocolo {Ic.arrow}</Link>
            <Link to="/aftercare" className="btn">Aftercare</Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { k: '10⁵', l: 'ciclos de esterilización registrados' },
            { k: '0', l: 'incidentes en 9 años' },
            { k: 'ISO 13485', l: 'consumibles certificados' },
            { k: '100%', l: 'consentimiento digital' },
          ].map((s, i) => (
            <div key={i} style={{ border: '1px solid var(--line)', padding: 28, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span className="lab" style={{ color: 'var(--gold)' }}>· {String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.k}</div>
                <div className="lab" style={{ marginTop: 10 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hr" />

      {/* Booking CTA */}
      <section style={{ padding: '120px 40px', textAlign: 'center', position: 'relative' }}>
        <div className="lab" style={{ marginBottom: 30 }}>· abrir agenda</div>
        <h2 className="serif" style={{ fontSize: 'clamp(80px,13vw,200px)', lineHeight: 0.9, margin: 0, letterSpacing: '-0.04em' }}>
          Tu primera <span className="serif-i" style={{ color: 'var(--oxblood)' }}>línea</span>.
        </h2>
        <p style={{ maxWidth: 540, margin: '30px auto', color: 'var(--bone-3)', fontSize: 14, lineHeight: 1.6 }}>
          Depósito de $1,500 MXN para reservar. Lo descontamos del total el día de tu sesión.
        </p>
        <Link to="/servicios" className="btn btn-solid" style={{ padding: '20px 36px' }}>Solicitar cita {Ic.arrow}</Link>
      </section>

      <FooterMark />
    </div>
  );
}
