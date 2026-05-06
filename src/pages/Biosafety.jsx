import { TopNav, FooterMark, SectionHeader } from '../components/Chrome';
import { Ic } from '../components/Icons';

export function BiosafetyPage() {
  return (
    <div className="ink-app">
      <div className="grain" />
      <TopNav active="Bioseguridad" />

      {/* Hero */}
      <section style={{ padding: '60px 40px 40px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 60, alignItems: 'end' }}>
        <div>
          <div className="lab" style={{ marginBottom: 20 }}>· protocolo · norma 087 · iso 13485</div>
          <h1 className="serif" style={{ fontSize: 'clamp(60px,10vw,152px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em' }}>
            Bio<span className="serif-i" style={{ color: 'var(--gold)' }}>seguridad</span>.<br />
            Sin atajos.
          </h1>
        </div>
        <div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--bone-3)' }}>
            Cada herramienta que toca tu piel es desechable o pasó por un ciclo de autoclave clase B documentado. Aquí está el protocolo completo, con auditoría disponible en sitio.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <button className="btn">{Ic.download} Protocolo PDF</button>
            <button className="btn">Auditar visita</button>
          </div>
        </div>
      </section>

      {/* Protocol metrics */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--line)' }}>
          {[
            { k: 'Clase B', l: 'Autoclave certificado · ciclos B-Helix' },
            { k: 'Single-use', l: 'Agujas, cartuchos, tubos y guantes' },
            { k: 'ISO 13485', l: 'Consumibles médicos certificados' },
            { k: '0', l: 'Incidentes en 9 años de operación' },
          ].map((s, i) => (
            <div key={i} style={{ padding: 32, borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}>
              <span className="lab" style={{ color: 'var(--gold)' }}>· {String(i + 1).padStart(2, '0')}</span>
              <div className="serif" style={{ fontSize: 'clamp(28px,4vw,56px)', lineHeight: 1, marginTop: 16, letterSpacing: '-0.02em' }}>{s.k}</div>
              <div className="lab" style={{ marginTop: 14 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Protocol detail */}
      <section style={{ padding: '60px 40px', background: 'var(--ink-2)' }}>
        <SectionHeader kicker="· protocolo paso a paso" title="Antes, durante y después" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, marginTop: 50, border: '1px solid var(--line)' }}>
          {[
            { t: 'Antes de la sesión', items: ['Estación desinfectada con peróxido + alcohol al 70%', 'Film barrera nuevo en silla, lámpara y máquina', 'Equipo individual sellado, abierto frente al cliente', 'Verificación de lote y caducidad de tinta'] },
            { t: 'Durante', items: ['Doble guante quirúrgico, cambio cada 45 min', 'Tinta dispensada en capsulas individuales', 'Bandeja estéril; nada toca dos veces la piel', 'Bitácora del ciclo: hora, máquina, voltaje'] },
            { t: 'Después', items: ['Disposición de RPBI en contenedor amarillo', 'Curación con vendaje hidrocoloide o film', 'Esterilización de portatubos en autoclave clase B', 'Registro firmado en sistema CRM por artista'] },
          ].map((c, i) => (
            <div key={i} style={{ padding: 32, borderRight: i < 2 ? '1px solid var(--line)' : 'none' }}>
              <div className="lab" style={{ color: 'var(--gold)' }}>· fase {String(i + 1).padStart(2, '0')}</div>
              <div className="serif" style={{ fontSize: 32, marginTop: 14 }}>{c.t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 12 }}>
                {c.items.map((it, k) => (
                  <li key={k} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.5, color: 'var(--bone-3)' }}>
                    <span style={{ color: 'var(--gold)' }}>{Ic.check}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment grid */}
      <section style={{ padding: '80px 40px' }}>
        <SectionHeader kicker="· equipo certificado" title="Lo que entra al estudio" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 50 }}>
          {[
            { t: 'Autoclave Cominox 24B', d: 'Clase B · ciclos prion 134°C · impresora térmica de bitácora.', ph: '' },
            { t: 'Cartuchos KWADRON', d: 'Esterilizados con óxido de etileno. Membrana de seguridad anti-reflujo.', ph: 'warm' },
            { t: 'Tinta Eternal · World Famous', d: 'Lotes vegan-safe, libre de metales pesados, MSDS disponible.', ph: 'gold' },
          ].map((s, i) => (
            <div key={i} style={{ border: '1px solid var(--line)' }}>
              <div className={`placeholder ${s.ph}`} style={{ height: 240 }}>· {s.t.toLowerCase()} ·</div>
              <div style={{ padding: 24 }}>
                <div className="serif" style={{ fontSize: 26 }}>{s.t}</div>
                <p style={{ fontSize: 13, color: 'var(--bone-3)', marginTop: 10, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-care + contraindications */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <div className="lab" style={{ color: 'var(--gold)', marginBottom: 16 }}>· antes de venir</div>
            <h3 className="serif" style={{ fontSize: 56, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>Pre-care</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 30, display: 'grid', gap: 16 }}>
              {['Duerme bien, hidrátate y desayuna fuerte.', 'Evita alcohol y cafeína 24h antes.', 'Sin retinoides ni exfoliantes 7 días antes.', 'Trae ropa cómoda según la zona a tatuar.'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 14, lineHeight: 1.5 }}>
                  <span className="serif-i" style={{ fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>0{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="lab" style={{ color: 'var(--oxblood)', marginBottom: 16 }}>· contraindicaciones</div>
            <h3 className="serif" style={{ fontSize: 56, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>Reagendamos si</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 30, display: 'grid', gap: 16 }}>
              {['Estás embarazada o lactando.', 'Tomas anticoagulantes o isotretinoína.', 'Tienes infección activa en la zona.', 'Diabetes no controlada o trastorno hemorrágico.'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--oxblood)' }}>{Ic.x}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FooterMark />
    </div>
  );
}

export function AftercarePage() {
  const days = [
    { d: 'Día 0–2', t: 'Vendaje primario', c: 'El film hidrocoloide se queda 24–48h. Es normal ver suero amarillento.', color: 'var(--oxblood)' },
    { d: 'Día 3–6', t: 'Limpieza suave', c: 'Lava 2 veces al día con jabón pH neutro. Seca con palmaditas, sin frotar.', color: 'var(--oxblood)' },
    { d: 'Día 7–14', t: 'Costras finas', c: 'Picazón leve y descamación. NO rasques. Hidrata 3 veces al día.', color: 'var(--gold-2)' },
    { d: 'Día 15–28', t: 'Cicatrización profunda', c: 'La piel se ve mate. Continúa hidratando; evita sol y ejercicio intenso.', color: 'var(--gold-2)' },
    { d: 'Mes 2', t: 'Color final', c: 'El tatuaje muestra su tono definitivo. Protector solar SPF 50 de por vida.', color: '#3D8C5F' },
  ];

  return (
    <div className="ink-app bone">
      <div className="grain" />
      <TopNav active="Aftercare" bone />

      {/* Hero */}
      <section style={{ padding: '60px 40px 40px' }}>
        <div className="lab" style={{ marginBottom: 20 }}>· guía técnica · 28 días</div>
        <h1 className="serif" style={{ fontSize: 'clamp(80px,11vw,168px)', lineHeight: 0.86, margin: 0, letterSpacing: '-0.04em' }}>
          After<span className="serif-i" style={{ color: 'var(--oxblood)' }}>care</span>.
        </h1>
        <p style={{ marginTop: 30, maxWidth: 700, fontSize: 16, lineHeight: 1.7, color: 'rgba(14,14,12,.65)' }}>
          La pieza que llevarás de por vida se decide en las primeras cuatro semanas. Esta es la guía exacta que entregamos a cada cliente: día por día, sin grasa de marketing.
        </p>
      </section>

      {/* Timeline */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 40, right: 40, top: 60, height: 1, background: 'rgba(14,14,12,.18)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
            {days.map((d, i) => (
              <div key={i} style={{ position: 'relative', padding: '0 12px' }}>
                <div className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>· fase {String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: d.color, marginTop: 24, position: 'relative', zIndex: 1, border: '3px solid var(--bone)' }} />
                <div className="serif" style={{ fontSize: 30, marginTop: 24, letterSpacing: '-0.01em' }}>{d.d}</div>
                <div className="serif-i" style={{ fontSize: 20, marginTop: 4, color: d.color }}>{d.t}</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(14,14,12,.65)', marginTop: 10 }}>{d.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do / Don't */}
      <section style={{ padding: '60px 40px', background: 'rgba(14,14,12,.05)', borderTop: '1px solid rgba(14,14,12,.14)', borderBottom: '1px solid rgba(14,14,12,.14)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <div className="lab" style={{ color: '#3D8C5F', marginBottom: 16 }}>· qué sí</div>
            <h3 className="serif" style={{ fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>Hábitos amigos</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 30, display: 'grid', gap: 16 }}>
              {['Lava con jabón neutro 2× al día', 'Hidrata con loción no-perfumada (Bepanthol, Hustle Butter)', 'Duerme con camiseta limpia y suelta', 'Bebe 2L de agua diarios'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 15, color: 'var(--ink)' }}>
                  <span style={{ color: '#3D8C5F' }}>{Ic.check}</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="lab" style={{ color: 'var(--oxblood)', marginBottom: 16 }}>· qué no</div>
            <h3 className="serif" style={{ fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>Evitar 21 días</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 30, display: 'grid', gap: 16 }}>
              {['Sol directo, alberca, mar, sauna', 'Gimnasio pesado o fricción', 'Rascar, arrancar costras o exfoliar', 'Mascotas en la cama mientras cicatriza'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 15, color: 'var(--ink)' }}>
                  <span style={{ color: 'var(--oxblood)' }}>{Ic.x}</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Symptom checker */}
      <section style={{ padding: '80px 40px' }}>
        <SectionHeader kicker="· check de síntomas" title="¿Esto es normal?" bone />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 40 }}>
          {[
            { tag: 'NORMAL', color: '#3D8C5F', t: 'Calor leve, picazón, descamación', d: 'Síntomas esperados durante la primera y segunda semana.' },
            { tag: 'VIGILAR', color: 'var(--gold-2)', t: 'Hinchazón persistente >3 días', d: 'Toma una foto y envíanosla por WhatsApp para revisión rápida.' },
            { tag: 'URGENTE', color: 'var(--oxblood)', t: 'Fiebre, pus verde, vetas rojas', d: 'Acude a un médico hoy mismo y notifícanos para seguimiento.' },
          ].map((s, i) => (
            <div key={i} style={{ border: '1px solid rgba(14,14,12,.14)', padding: 28, background: 'var(--bone)' }}>
              <span className="chip chip-ink" style={{ background: s.color, color: 'var(--bone)', borderColor: s.color }}>{s.tag}</span>
              <div className="serif" style={{ fontSize: 28, marginTop: 18 }}>{s.t}</div>
              <p style={{ fontSize: 14, color: 'rgba(14,14,12,.65)', marginTop: 10, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section style={{ padding: '60px 40px 100px', borderTop: '1px solid rgba(14,14,12,.14)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="lab" style={{ color: 'var(--oxblood)' }}>· kit recomendado</div>
            <h3 className="serif" style={{ fontSize: 64, lineHeight: 1, margin: '16px 0 0', letterSpacing: '-0.02em' }}>El kit que te llevas a casa</h3>
            <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(14,14,12,.6)', lineHeight: 1.7 }}>
              Te entregamos una bolsa de tela con todo lo necesario para los primeros 7 días. Sin costo extra.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {[
              { t: 'Film hidrocoloide', n: 'Saniderm 5×7"' },
              { t: 'Jabón neutro', n: "Dr. Bronner's 60ml" },
              { t: 'Crema curativa', n: 'Bepanthol 30g' },
              { t: 'Toalla suave', n: 'Algodón orgánico' },
            ].map((k, i) => (
              <div key={i} className="lift" style={{ border: '1px solid rgba(14,14,12,.14)' }}>
                <div className="placeholder bone-ph" style={{ height: 120 }}>· producto ·</div>
                <div style={{ padding: 14 }}>
                  <div className="serif" style={{ fontSize: 18 }}>{k.t}</div>
                  <div className="lab" style={{ marginTop: 4, color: 'rgba(14,14,12,.55)' }}>{k.n}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterMark bone />
    </div>
  );
}
