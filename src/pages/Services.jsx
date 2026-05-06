import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopNav, FooterMark, SectionHeader } from '../components/Chrome';
import { Ic } from '../components/Icons';

function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState('M');
  const [zone, setZone] = useState('antebrazo');
  const [complexity, setComplexity] = useState('media');
  const [color, setColor] = useState('Tinta única');
  const [sessions, setSessions] = useState(1);

  const sizes = [
    { k: 'XS', l: 'Pequeño', d: '≤ 5 cm', base: 1800 },
    { k: 'S', l: 'Mediano-bajo', d: '5–10 cm', base: 3200 },
    { k: 'M', l: 'Mediano', d: '10–18 cm', base: 5400 },
    { k: 'L', l: 'Grande', d: '18–28 cm', base: 9200 },
    { k: 'XL', l: 'Pieza grande', d: '≥ 28 cm', base: 14500 },
  ];
  const zones = [
    { k: 'antebrazo', l: 'Antebrazo', m: 1.0, c: 'swatch-arm' },
    { k: 'brazo', l: 'Brazo / hombro', m: 1.05, c: 'swatch-arm' },
    { k: 'espalda', l: 'Espalda / pecho', m: 1.15, c: 'swatch-back' },
    { k: 'pierna', l: 'Pierna / muslo', m: 1.0, c: 'swatch-leg' },
    { k: 'torso', l: 'Costillas / torso', m: 1.25, c: 'swatch-chest' },
    { k: 'manos', l: 'Manos / cuello', m: 1.4, c: 'swatch-hand' },
  ];
  const comp = {
    simple: { l: 'Simple', d: 'Líneas o tipografía', m: 0.85 },
    media: { l: 'Media', d: 'Detalle moderado, sombras', m: 1.0 },
    alta: { l: 'Alta', d: 'Realismo, color denso, doble pasada', m: 1.35 },
  };

  const sizeObj = sizes.find(s => s.k === size);
  const zoneObj = zones.find(z => z.k === zone);
  const compObj = comp[complexity];
  const colorMul = color === 'Tinta única' ? 1 : color === '2-3 colores' ? 1.15 : 1.35;
  const total = Math.round(sizeObj.base * zoneObj.m * compObj.m * colorMul);
  const deposit = Math.round(total * 0.25);

  const steps = [
    { n: 1, t: 'Tamaño' }, { n: 2, t: 'Zona del cuerpo' },
    { n: 3, t: 'Complejidad' }, { n: 4, t: 'Color' }, { n: 5, t: 'Resumen' },
  ];

  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 560 }}>
      {/* Left: form */}
      <div style={{ padding: 36, borderRight: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: 0, marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', border: '1px solid',
                borderColor: step >= s.n ? 'var(--gold)' : 'var(--line-strong)',
                color: step >= s.n ? 'var(--gold)' : 'var(--ash)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 10,
              }}>{String(s.n).padStart(2, '0')}</div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: step > s.n ? 'var(--gold)' : 'var(--line)' }} />}
            </div>
          ))}
        </div>
        <div className="lab" style={{ color: 'var(--gold)', marginBottom: 8 }}>· paso {String(step).padStart(2, '0')} · {steps[step - 1].t}</div>
        <h3 className="serif" style={{ fontSize: 44, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
          {step === 1 && <>¿Qué <span className="serif-i" style={{ color: 'var(--gold)' }}>tamaño</span> imaginas?</>}
          {step === 2 && <>¿En qué <span className="serif-i" style={{ color: 'var(--gold)' }}>zona</span>?</>}
          {step === 3 && <>¿Qué tan <span className="serif-i" style={{ color: 'var(--gold)' }}>complejo</span>?</>}
          {step === 4 && <>¿Color o <span className="serif-i" style={{ color: 'var(--gold)' }}>tinta única</span>?</>}
          {step === 5 && <>Tu <span className="serif-i" style={{ color: 'var(--gold)' }}>cotización</span></>}
        </h3>

        <div style={{ marginTop: 30 }}>
          {step === 1 && (
            <div style={{ display: 'grid', gap: 10 }}>
              {sizes.map(s => (
                <button key={s.k} onClick={() => setSize(s.k)} style={{
                  textAlign: 'left', padding: 18, background: size === s.k ? 'var(--ink-3)' : 'transparent',
                  border: `1px solid ${size === s.k ? 'var(--gold)' : 'var(--line)'}`, color: 'var(--bone)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="serif-i" style={{ fontSize: 28, color: 'var(--gold)', width: 40 }}>{s.k}</span>
                    <div>
                      <div className="serif" style={{ fontSize: 20 }}>{s.l}</div>
                      <div className="lab" style={{ marginTop: 4 }}>{s.d}</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--bone-3)' }}>desde ${s.base.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {zones.map(z => (
                <button key={z.k} onClick={() => setZone(z.k)} style={{
                  textAlign: 'left', padding: 18, background: zone === z.k ? 'var(--ink-3)' : 'transparent',
                  border: `1px solid ${zone === z.k ? 'var(--gold)' : 'var(--line)'}`, color: 'var(--bone)',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className={`dot ${z.c}`} style={{ width: 10, height: 10 }} />
                    <span className="serif" style={{ fontSize: 18 }}>{z.l}</span>
                  </div>
                  <div className="lab" style={{ marginTop: 8 }}>multiplicador ×{z.m.toFixed(2)}</div>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'grid', gap: 10 }}>
              {Object.entries(comp).map(([k, v]) => (
                <button key={k} onClick={() => setComplexity(k)} style={{
                  textAlign: 'left', padding: 18,
                  background: complexity === k ? 'var(--ink-3)' : 'transparent',
                  border: `1px solid ${complexity === k ? 'var(--gold)' : 'var(--line)'}`, color: 'var(--bone)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div className="serif" style={{ fontSize: 22 }}>{v.l}</div>
                    <div className="lab" style={{ marginTop: 4 }}>{v.d}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 12 }}>×{v.m.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
          {step === 4 && (
            <div style={{ display: 'grid', gap: 10 }}>
              {['Tinta única', '2-3 colores', 'Full color'].map(c => (
                <button key={c} onClick={() => setColor(c)} style={{
                  textAlign: 'left', padding: 18,
                  background: color === c ? 'var(--ink-3)' : 'transparent',
                  border: `1px solid ${color === c ? 'var(--gold)' : 'var(--line)'}`, color: 'var(--bone)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span className="serif" style={{ fontSize: 22 }}>{c}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(c === 'Tinta única' ? ['#0E0E0C'] : c === '2-3 colores' ? ['#0E0E0C', '#7A2A22', '#C9A864'] : ['#0E0E0C', '#7A2A22', '#C9A864', '#3D5A4F', '#5A4068']).map(h => (
                      <span key={h} style={{ width: 18, height: 18, background: h, border: '1px solid var(--line-strong)' }} />
                    ))}
                  </div>
                </button>
              ))}
              <div style={{ marginTop: 20 }}>
                <div className="lab">· sesiones estimadas</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  {[1, 2, 3, 4].map(n => (
                    <button key={n} onClick={() => setSessions(n)} style={{
                      width: 56, height: 56, background: sessions === n ? 'var(--gold)' : 'transparent',
                      border: `1px solid ${sessions === n ? 'var(--gold)' : 'var(--line-strong)'}`,
                      color: sessions === n ? 'var(--ink)' : 'var(--bone)', cursor: 'pointer',
                      fontFamily: "'Cormorant Garamond',serif", fontSize: 24,
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { k: 'Tamaño', v: `${sizeObj.k} · ${sizeObj.l} (${sizeObj.d})` },
                  { k: 'Zona', v: zoneObj.l },
                  { k: 'Complejidad', v: compObj.l },
                  { k: 'Color', v: color },
                  { k: 'Sesiones', v: `${sessions} ${sessions > 1 ? 'sesiones' : 'sesión'}` },
                ].map(r => (
                  <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                    <span className="lab">{r.k}</span>
                    <span className="serif" style={{ fontSize: 18 }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ash)', lineHeight: 1.6 }}>* La cotización es estimativa. El precio final se confirma tras la consulta presencial con el artista.</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
          <button onClick={() => setStep(Math.max(1, step - 1))} className="btn" style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>← Atrás</button>
          {step < 5
            ? <button onClick={() => setStep(step + 1)} className="btn btn-solid">Continuar {Ic.arrow}</button>
            : <button className="btn btn-solid" style={{ background: 'var(--gold)', borderColor: 'var(--gold)' }}>Reservar con depósito {Ic.arrow}</button>
          }
        </div>
      </div>

      {/* Right: live summary */}
      <div style={{ padding: 36, background: 'var(--ink-3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="lab" style={{ color: 'var(--gold)' }}>· estimación en vivo</div>
          <div className="serif" style={{ fontSize: 96, lineHeight: 1, marginTop: 18, letterSpacing: '-0.03em' }}>
            ${total.toLocaleString()}
          </div>
          <div className="lab" style={{ marginTop: 6 }}>MXN · Total estimado</div>

          <div style={{ marginTop: 36, display: 'grid', gap: 14 }}>
            {[
              { k: 'Base por tamaño', v: `$${sizeObj.base.toLocaleString()}` },
              { k: 'Multiplicador zona', v: `× ${zoneObj.m.toFixed(2)}` },
              { k: 'Multiplicador complejidad', v: `× ${compObj.m.toFixed(2)}` },
              { k: 'Multiplicador color', v: `× ${colorMul.toFixed(2)}` },
            ].map(r => (
              <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--bone-3)' }}>{r.k}</span>
                <span className="mono" style={{ fontSize: 13 }}>{r.v}</span>
              </div>
            ))}
          </div>

          <div className="hr" style={{ margin: '30px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <span className="lab">· depósito (25%)</span>
            <span className="serif-i" style={{ fontSize: 36, color: 'var(--gold)' }}>${deposit.toLocaleString()}</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ash)', marginTop: 8 }}>Reembolsable hasta 7 días antes. Se descuenta del total.</p>
        </div>

        {/* body diagram */}
        <div style={{ marginTop: 28, padding: 20, border: '1px dashed var(--line-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="lab">Zona seleccionada</div>
            <div className="serif" style={{ fontSize: 26, marginTop: 6 }}>{zoneObj.l}</div>
          </div>
          <svg width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="var(--bone-3)" strokeWidth="1">
            <circle cx="40" cy="14" r="9" />
            <path d="M28 24 L52 24 L60 60 L52 100 L46 118 M28 24 L20 60 L28 100 L34 118 M40 24 L40 80" />
            {zone === 'antebrazo' && <circle cx="60" cy="55" r="6" fill="var(--gold)" stroke="none" />}
            {zone === 'brazo' && <circle cx="58" cy="35" r="6" fill="var(--gold)" stroke="none" />}
            {zone === 'espalda' && <rect x="30" y="30" width="20" height="22" fill="var(--gold)" stroke="none" />}
            {zone === 'pierna' && <circle cx="46" cy="95" r="6" fill="var(--gold)" stroke="none" />}
            {zone === 'torso' && <rect x="32" y="40" width="16" height="18" fill="var(--gold)" stroke="none" />}
            {zone === 'manos' && <circle cx="22" cy="64" r="5" fill="var(--gold)" stroke="none" />}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="ink-app">
      <div className="grain" />
      <TopNav active="Servicios" />

      <section style={{ padding: '60px 40px 40px' }}>
        <div className="lab" style={{ marginBottom: 20 }}>· servicios · cotización transparente</div>
        <h1 className="serif" style={{ fontSize: 'clamp(60px,10vw,156px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em', maxWidth: 1100 }}>
          Calcula tu pieza <span className="serif-i" style={{ color: 'var(--gold)' }}>en vivo</span>.
        </h1>
        <p style={{ marginTop: 30, maxWidth: 600, fontSize: 14, lineHeight: 1.6, color: 'var(--bone-3)' }}>
          Una estimación honesta antes de la consulta. El precio final se confirma con tu artista al revisar la idea, escala y técnica.
        </p>
      </section>

      <section style={{ padding: '20px 40px 80px' }}>
        <QuoteCalculator />
      </section>

      {/* Service cards */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid var(--line)' }}>
        <SectionHeader kicker="· catálogo de servicios" title="Lo que hacemos" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 50 }}>
          {[
            { t: 'Tatuaje custom', d: 'Diseño exclusivo, una sesión por persona por día.', p: 'desde $1,800', ph: 'warm' },
            { t: 'Cover-up', d: 'Rediseñamos un tatuaje viejo. Consulta gratuita previa.', p: 'desde $4,500', ph: '' },
            { t: 'Restauración', d: 'Reanimamos piezas desvanecidas con respeto al diseño original.', p: 'desde $2,900', ph: 'gold' },
            { t: 'Fineline botánico', d: 'Especialidad de Ana Ferraris. Tinta única.', p: 'desde $2,400', ph: 'warm' },
            { t: 'Irezumi · wabori', d: 'Pieza grande de tradición japonesa, con Kenji Aoki.', p: 'desde $14,500', ph: 'gold' },
            { t: 'Lettering', d: 'Tipografía dibujada a mano, con plantilla personalizada.', p: 'desde $1,200', ph: '' },
          ].map((s, i) => (
            <div key={i} className="lift" style={{ border: '1px solid var(--line)', padding: 0, overflow: 'hidden' }}>
              <div className={`placeholder ${s.ph}`} style={{ height: 220 }}>· {s.t.toLowerCase()} ·</div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div className="serif" style={{ fontSize: 28 }}>{s.t}</div>
                  <span className="chip chip-gold">{s.p}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--bone-3)', lineHeight: 1.6, marginTop: 12 }}>{s.d}</p>
                <a className="lab" style={{ marginTop: 16, display: 'inline-flex', gap: 8, color: 'var(--gold)', cursor: 'pointer' }}>Cotizar este servicio →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterMark />
    </div>
  );
}
