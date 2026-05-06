import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopNav, FooterMark, SectionHeader } from '../components/Chrome';
import { Ic } from '../components/Icons';

export function PortfolioPage() {
  const [filter, setFilter] = useState('Todo');
  const [view, setView] = useState('Mosaico');
  const filters = ['Todo', 'Fineline', 'Blackwork', 'Color', 'Irezumi', 'Lettering', 'Geométrico'];
  const tiles = [
    { c: 'span 4', r: 'span 8', ph: 'warm', t: 'Botánico · antebrazo', a: 'A. Ferraris', y: '2025' },
    { c: 'span 4', r: 'span 6', ph: '', t: 'Mandala · espalda', a: 'D. Solana', y: '2025' },
    { c: 'span 4', r: 'span 7', ph: 'gold', t: 'Koi nishiki', a: 'K. Aoki', y: '2025' },
    { c: 'span 4', r: 'span 6', ph: '', t: 'Letter · cuello', a: 'M. Itzel', y: '2025' },
    { c: 'span 4', r: 'span 8', ph: 'warm', t: 'Lirio · clavícula', a: 'A. Ferraris', y: '2024' },
    { c: 'span 4', r: 'span 7', ph: 'gold', t: 'Tigre · muslo', a: 'K. Aoki', y: '2024' },
    { c: 'span 6', r: 'span 6', ph: 'warm', t: 'Pieza grande · pecho', a: 'D. Solana', y: '2024' },
    { c: 'span 6', r: 'span 6', ph: '', t: 'Constelación · ribs', a: 'M. Itzel', y: '2024' },
    { c: 'span 4', r: 'span 7', ph: 'warm', t: 'Fern · pierna', a: 'A. Ferraris', y: '2024' },
    { c: 'span 4', r: 'span 6', ph: 'gold', t: 'Hannya · brazo', a: 'K. Aoki', y: '2024' },
    { c: 'span 4', r: 'span 6', ph: '', t: 'Símbolo geom.', a: 'D. Solana', y: '2023' },
  ];

  return (
    <div className="ink-app">
      <div className="grain" />
      <TopNav active="Portafolio" />

      {/* Header */}
      <section style={{ padding: '60px 40px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'end' }}>
        <div>
          <div className="lab" style={{ marginBottom: 18 }}>· archivo · 2018 — 2025</div>
          <h1 className="serif" style={{ fontSize: 'clamp(80px,10vw,152px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em' }}>
            Port<span className="serif-i" style={{ color: 'var(--gold)' }}>a</span>folio
          </h1>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--bone-3)' }}>
          Una selección curada de 487 piezas de los últimos siete años. Cada imagen incluye créditos del artista, fecha, técnica y, cuando es aplicable, las referencias originales.
        </p>
      </section>

      {/* Filter bar */}
      <section style={{ padding: '26px 40px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 65, background: 'var(--ink)', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span className="lab">· filtro</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <span key={f} onClick={() => setFilter(f)} style={{ cursor: 'pointer' }} className={filter === f ? 'chip chip-gold' : 'chip'}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--bone-3)' }}>{Ic.search}<span className="lab">Buscar pieza, artista, etiqueta…</span></div>
          <div style={{ display: 'flex', border: '1px solid var(--line-strong)' }}>
            {[{ k: 'Mosaico', i: Ic.layers }, { k: 'Cuadrícula', i: Ic.grid }, { k: 'Lista', i: Ic.list }].map(v => (
              <button key={v.k} onClick={() => setView(v.k)} style={{
                padding: '8px 12px', background: view === v.k ? 'var(--bone)' : 'transparent',
                color: view === v.k ? 'var(--ink)' : 'var(--bone-3)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
              }}>{v.i} {v.k}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Mosaic */}
      <section style={{ padding: '30px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridAutoRows: 30, gap: 14 }}>
          {tiles.map((t, i) => (
            <div key={i} style={{ gridColumn: t.c, gridRow: t.r, position: 'relative', overflow: 'hidden', cursor: 'pointer' }} className="lift">
              <div className={`placeholder ${t.ph}`} style={{ height: '100%' }}>
                · plate {String(i + 1).padStart(2, '0')} ·
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(14,14,12,0.85) 100%)', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                  <div>
                    <div className="serif" style={{ fontSize: 22 }}>{t.t}</div>
                    <div className="lab lab-bone" style={{ marginTop: 4 }}>{t.a} · {t.y}</div>
                  </div>
                  <Link to="/portafolio/artista" className="chip chip-gold">Ver pieza →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterMark />
    </div>
  );
}

export function ArtistPage() {
  return (
    <div className="ink-app">
      <div className="grain" />
      <TopNav active="Portafolio" />

      {/* Hero */}
      <section style={{ padding: '60px 40px 40px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60 }}>
        <div>
          <div className="lab" style={{ marginBottom: 14 }}>· residente · perfil 03 / 05</div>
          <h1 className="serif" style={{ fontSize: 'clamp(60px,8vw,116px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em' }}>
            Ana<br /><span className="serif-i" style={{ color: 'var(--gold)' }}>Ferraris</span>
          </h1>
          <p style={{ marginTop: 30, fontSize: 14, lineHeight: 1.7, color: 'var(--bone-3)' }}>
            Botánico fineline en tinta única. Estudia ilustración científica y traduce hojas, flores y minerales en piezas íntimas, casi diarísticas. Trabaja sobre piel desde 2019.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 36 }}>
            {[{ k: 'Estilo', v: 'Fineline · botánico' }, { k: 'Práctica', v: '06 años' }, { k: 'Idiomas', v: 'ES · EN · IT' }, { k: 'Próximo cupo', v: 'Mayo 12' }].map((m, i) => (
              <div key={i}>
                <div className="lab">{m.k}</div>
                <div className="serif" style={{ fontSize: 22, marginTop: 6 }}>{m.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <Link to="/servicios" className="btn btn-solid">Reservar con Ana {Ic.arrow}</Link>
            <button className="btn">{Ic.ig} Instagram</button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div className="placeholder warm" style={{ height: 620 }}>· retrato · ana ferraris ·</div>
          <div style={{ position: 'absolute', right: -10, bottom: -10, width: 200, height: 240 }}>
            <div className="placeholder gold" style={{ height: '100%' }}>· detalle de mano ·</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <span className="lab">Plato I — Estudio Atelier, 2025</span>
            <span className="lab">35 mm · TX-400</span>
          </div>
        </div>
      </section>

      {/* Bio quote */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <p className="serif-i" style={{ fontSize: 'clamp(28px,4vw,56px)', lineHeight: 1.1, margin: 0, maxWidth: 1100, letterSpacing: '-0.02em' }}>
          "Tatúo lo que dibujaría aunque nadie me viera. <span style={{ color: 'var(--gold)' }}>Cada hoja se cura distinto, igual que cada cliente recuerda distinto.</span>"
        </p>
      </section>

      {/* Specialty grid */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40 }}>
          <SectionHeader kicker="· obra reciente · 2024 — 2025" title="Plato a plato" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Todo', 'Fineline', 'Botánico', 'Lirio', 'Hojas'].map((t, i) => (
              <span key={i} className={i === 0 ? 'chip chip-gold' : 'chip'}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridAutoRows: 30, gap: 14 }}>
          {[
            { c: 'span 2', r: 'span 9', t: 'Lirio · brazo' },
            { c: 'span 2', r: 'span 7', t: 'Helecho · costilla' },
            { c: 'span 2', r: 'span 8', t: 'Magnolia · clavícula' },
            { c: 'span 3', r: 'span 8', t: 'Estudio botánico · espalda' },
            { c: 'span 3', r: 'span 6', t: 'Compuesta · muslo' },
            { c: 'span 2', r: 'span 7', t: 'Fragmento — hoja' },
            { c: 'span 2', r: 'span 6', t: 'Tallo · antebrazo' },
            { c: 'span 2', r: 'span 8', t: 'Flor compuesta' },
          ].map((t, i) => (
            <div key={i} style={{ gridColumn: t.c, gridRow: t.r, position: 'relative', overflow: 'hidden' }}>
              <div className="placeholder warm" style={{ height: '100%' }}>· {String(i + 1).padStart(2, '0')} ·</div>
              <div style={{ position: 'absolute', left: 12, right: 12, bottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span className="lab lab-bone">{t.t}</span>
                <span className="lab lab-bone">25</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process strip */}
      <section style={{ padding: '80px 40px', background: 'var(--ink-2)' }}>
        <SectionHeader kicker="· cómo trabajamos juntos" title="De la consulta al plato final" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginTop: 50 }}>
          {[
            { n: '01', t: 'Mensaje + referencia', d: 'Comparte 3 a 5 imágenes y un párrafo sobre la idea. Respondo en 48h.' },
            { n: '02', t: 'Consulta presencial', d: '30 min en el estudio. Definimos zona, escala, tiempo y depósito.' },
            { n: '03', t: 'Boceto exclusivo', d: 'Recibes el diseño 72h antes de la cita. Dos ajustes incluidos.' },
            { n: '04', t: 'Sesión + cuidados', d: 'Sesiones de 3 a 6h. Te entrego una guía de aftercare personalizada.' },
          ].map(s => (
            <div key={s.n} style={{ border: '1px solid var(--line)', padding: 24, minHeight: 220 }}>
              <div className="lab" style={{ color: 'var(--gold)' }}>· {s.n}</div>
              <div className="serif" style={{ fontSize: 26, marginTop: 14 }}>{s.t}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--bone-3)', marginTop: 10 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterMark />
    </div>
  );
}
