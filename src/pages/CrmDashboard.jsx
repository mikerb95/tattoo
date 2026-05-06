import { Link } from 'react-router-dom';
import { Ic } from '../components/Icons';

function CrmShell({ active = 'Inicio', children, title, subtitle, actions }) {
  const items = [
    { k: 'Inicio', i: Ic.layers, to: '/crm' },
    { k: 'Agenda', i: Ic.cal, to: '/crm/agenda' },
    { k: 'Clientes', i: Ic.user, to: '/crm/clientes' },
    { k: 'Depósitos', i: Ic.cash, to: '/crm/depositos' },
    { k: 'Consentimientos', i: Ic.signature, to: '/crm/consentimientos' },
    { k: 'Curación', i: Ic.heart, to: '/crm/curacion' },
    { k: 'Archivo', i: Ic.doc, to: '/crm/archivo' },
  ];

  return (
    <div className="ink-app crm-bg" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <div className="grain" />
      {/* Sidebar */}
      <aside style={{ borderRight: '1px solid var(--line)', padding: '24px 18px', background: 'rgba(14,14,12,0.4)', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 18px', borderBottom: '1px solid var(--line)', color: 'var(--bone)', marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, border: '1px solid var(--bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>I</div>
          <div>
            <div className="serif-i" style={{ fontSize: 16 }}>Atelier</div>
            <div className="lab" style={{ fontSize: 8 }}>STUDIO · CRM</div>
          </div>
        </Link>
        <div className="lab" style={{ padding: '16px 8px 8px' }}>· workspace</div>
        <nav style={{ display: 'grid', gap: 2 }}>
          {items.map(it => (
            <Link key={it.k} to={it.to} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px',
              background: active === it.k ? 'rgba(201,168,100,0.10)' : 'transparent',
              borderLeft: active === it.k ? '2px solid var(--gold)' : '2px solid transparent',
              color: active === it.k ? 'var(--bone)' : 'var(--bone-3)',
              fontSize: 13, textDecoration: 'none',
            }}>
              <span style={{ color: active === it.k ? 'var(--gold)' : 'var(--ash)' }}>{it.i}</span>{it.k}
            </Link>
          ))}
        </nav>

        <div className="lab" style={{ padding: '20px 8px 8px' }}>· artistas</div>
        <div style={{ display: 'grid', gap: 8, padding: '0 8px' }}>
          {[
            { n: 'Ana Ferraris', c: 'var(--gold)', st: 'online' },
            { n: 'Diego Solana', c: 'var(--oxblood)', st: 'sesión' },
            { n: 'Mara Itzel', c: '#3D5A4F', st: 'offline' },
            { n: 'Kenji Aoki', c: '#5A4068', st: 'online' },
          ].map(a => (
            <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontSize: 12 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: a.c, color: 'var(--bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: "'Cormorant Garamond',serif" }}>{a.n[0]}</span>
              <span style={{ flex: 1 }}>{a.n.split(' ')[0]}</span>
              <span className="lab" style={{ fontSize: 8, color: a.st === 'online' ? '#3D8C5F' : a.st === 'sesión' ? 'var(--gold)' : 'var(--ash)' }}>● {a.st}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <div className="hr" style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: 'italic' }}>A</div>
            <div>
              <div style={{ fontSize: 12 }}>Ana Ferraris</div>
              <div className="lab" style={{ fontSize: 8 }}>artista · admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ padding: 0, position: 'relative', minHeight: '100vh' }}>
        {/* Topbar */}
        <div style={{ borderBottom: '1px solid var(--line)', padding: '18px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#0B0B09', zIndex: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--bone-3)' }}>
            <span className="lab">Atelier / {active}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: '1px solid var(--line-strong)', color: 'var(--bone-3)', fontSize: 12, minWidth: 280 }}>
              {Ic.search}<span>Buscar cliente, cita, expediente…</span><span className="kbd" style={{ marginLeft: 'auto' }}>⌘K</span>
            </div>
            <button style={{ background: 'transparent', border: '1px solid var(--line-strong)', padding: 8, color: 'var(--bone-3)', cursor: 'pointer', position: 'relative' }}>
              {Ic.bell}
              <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--oxblood)' }} />
            </button>
            <button className="btn btn-solid" style={{ padding: '8px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>{Ic.plus} Nueva cita</button>
          </div>
        </div>
        {/* Page header */}
        <div style={{ padding: '32px 32px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'end', borderBottom: '1px solid var(--line)' }}>
          <div>
            <div className="lab" style={{ marginBottom: 10 }}>· {subtitle}</div>
            <h1 className="serif" style={{ fontSize: 56, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>{title}</h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>{actions}</div>
        </div>

        <div style={{ padding: 32 }}>{children}</div>
      </main>
    </div>
  );
}

export function CrmDashboardPage() {
  return (
    <CrmShell active="Inicio" title={<>Buen día, <span className="serif-i" style={{ color: 'var(--gold)' }}>Ana</span></>} subtitle="lunes 04 de mayo · semana 19 · 4 sesiones hoy"
      actions={<>
        <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.download} Reporte semanal</button>
        <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.plus} Nueva cita</button>
      </>}>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { l: 'Ingresos del mes', v: '$184,500', d: '+12% vs abril', c: 'var(--gold)' },
          { l: 'Citas confirmadas', v: '17', d: 'Próximos 14 días', c: 'var(--bone)' },
          { l: 'Depósitos pendientes', v: '$8,200', d: '3 clientes en espera', c: 'var(--oxblood)' },
          { l: 'Curación activa', v: '11', d: 'Seguimiento en curso', c: '#3D8C5F' },
        ].map((k, i) => (
          <div key={i} style={{ border: '1px solid var(--line)', padding: 20 }}>
            <div className="lab">{k.l}</div>
            <div className="serif" style={{ fontSize: 44, lineHeight: 1, marginTop: 14, color: k.c, letterSpacing: '-0.02em' }}>{k.v}</div>
            <div style={{ fontSize: 11, color: 'var(--bone-3)', marginTop: 10 }}>{k.d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        {/* Today's schedule */}
        <div style={{ border: '1px solid var(--line)', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 18 }}>
            <div>
              <div className="lab">· hoy · 04 may</div>
              <div className="serif" style={{ fontSize: 28, marginTop: 8 }}>Tu día</div>
            </div>
            <Link to="/crm/agenda" className="lab" style={{ color: 'var(--gold)' }}>Ver agenda completa →</Link>
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {[
              { h: '10:00', c: 'Sofía Aguirre', p: 'Lirio · antebrazo (3h)', st: 'En curso', col: 'var(--gold)', a: 'AF' },
              { h: '14:30', c: 'Mateo Reyes', p: 'Lettering · pecho (2h)', st: 'Confirmada', col: '#3D8C5F', a: 'AF' },
              { h: '17:00', c: 'Lía Méndez', p: 'Consulta nueva · botánico', st: 'Consulta', col: 'var(--bone)', a: 'AF' },
              { h: '19:00', c: '—', p: 'Cierre · esterilización', st: 'Bloqueado', col: 'var(--ash)', a: '—' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 100px 90px', padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 16, color: 'var(--gold)' }}>{s.h}</span>
                <div>
                  <div style={{ fontSize: 14 }}>{s.c}</div>
                  <div className="lab" style={{ marginTop: 4 }}>{s.p}</div>
                </div>
                <span className="chip" style={{ borderColor: s.col, color: s.col }}>{s.st}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--bone-3)' }}>{s.a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next deposits + healing */}
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ border: '1px solid var(--line)', padding: 20 }}>
            <div className="lab">· depósitos esperados</div>
            <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
              {[
                { c: 'Lía Méndez', a: '$1,500', d: 'Vence: hoy' },
                { c: 'Carlos Vega', a: '$2,200', d: 'Vence: mañana' },
                { c: 'Renata Coss', a: '$4,500', d: 'Vence: jue' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13 }}>{d.c}</div>
                    <div className="lab" style={{ marginTop: 4, color: 'var(--oxblood)' }}>{d.d}</div>
                  </div>
                  <span className="serif" style={{ fontSize: 22, color: 'var(--gold)' }}>{d.a}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: '1px solid var(--line)', padding: 20 }}>
            <div className="lab">· seguimiento de curación</div>
            <div style={{ marginTop: 14, display: 'grid', gap: 14 }}>
              {[
                { n: 'Tomás L.', d: 'día 12 · normal', p: 0.45 },
                { n: 'Iris G.', d: 'día 6 · vigilar', p: 0.22 },
                { n: 'Andrés P.', d: 'día 21 · final', p: 0.78 },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13 }}>{c.n}</span>
                    <span className="lab">{c.d}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--ink-3)', marginTop: 8 }}>
                    <div style={{ height: '100%', width: `${c.p * 100}%`, background: 'var(--gold)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <div style={{ border: '1px solid var(--line)', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <div className="lab">· ingresos · últimos 7 días</div>
            <span className="serif-i" style={{ fontSize: 22, color: 'var(--gold)' }}>$48,200</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 8, height: 110 }}>
            {[0.4, 0.55, 0.72, 0.3, 0.85, 0.6, 0.95].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${h * 100}%`, background: i === 6 ? 'var(--gold)' : 'var(--ink-3)', border: '1px solid var(--line-strong)' }} />
                <span className="lab" style={{ fontSize: 8 }}>{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: '1px solid var(--line)', padding: 24 }}>
          <div className="lab" style={{ marginBottom: 18 }}>· actividad reciente</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { t: 'Sofía firmó consentimiento digital', ago: 'hace 3 min', c: 'var(--gold)' },
              { t: 'Depósito recibido · Mateo R. · $1,500', ago: 'hace 2 h', c: '#3D8C5F' },
              { t: 'Foto de curación día 6 · Iris G.', ago: 'hace 5 h', c: 'var(--bone)' },
              { t: 'Cita reagendada · Carlos V.', ago: 'ayer', c: 'var(--oxblood)' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'start', paddingBottom: 12, borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: a.c, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{a.t}</div>
                  <div className="lab" style={{ marginTop: 2 }}>{a.ago}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function CrmAgendaPage() {
  const days = ['LUN 04', 'MAR 05', 'MIÉ 06', 'JUE 07', 'VIE 08', 'SÁB 09', 'DOM 10'];
  const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const events = [
    { day: 0, start: 1, span: 3, c: 'Sofía Aguirre', p: 'Lirio · antebrazo', a: 'AF', col: 'var(--gold)' },
    { day: 0, start: 5, span: 2, c: 'Mateo Reyes', p: 'Lettering · pecho', a: 'AF', col: 'var(--oxblood)' },
    { day: 0, start: 8, span: 1, c: 'Lía M. · consulta', p: 'Botánico nuevo', a: 'AF', col: 'var(--bone)' },
    { day: 1, start: 2, span: 4, c: 'Carlos Vega', p: 'Mandala · espalda', a: 'DS', col: 'var(--gold)' },
    { day: 2, start: 1, span: 2, c: 'Renata Coss', p: 'Restauración brazo', a: 'DS', col: '#3D5A4F' },
    { day: 2, start: 6, span: 3, c: 'Pablo M.', p: 'Koi · pierna', a: 'KA', col: 'var(--oxblood)' },
    { day: 3, start: 3, span: 5, c: 'Andrea T.', p: 'Pieza grande · espalda · S2', a: 'DS', col: 'var(--gold)' },
    { day: 4, start: 1, span: 2, c: 'Iván V.', p: 'Geometría · brazo', a: 'MI', col: '#5A4068' },
    { day: 4, start: 5, span: 3, c: 'Frida B.', p: 'Florería neotrad', a: 'MI', col: 'var(--gold)' },
    { day: 5, start: 0, span: 4, c: 'Andrés P.', p: 'Hannya · brazo', a: 'KA', col: 'var(--oxblood)' },
    { day: 5, start: 5, span: 2, c: 'Gabo R.', p: 'Símbolo geom.', a: 'DS', col: '#3D5A4F' },
  ];

  return (
    <CrmShell active="Agenda" title="Agenda" subtitle="semana 19 · 04 — 10 may"
      actions={<>
        <div style={{ display: 'flex', border: '1px solid var(--line-strong)' }}>
          {['Día', 'Semana', 'Mes'].map((v, i) => (
            <button key={v} style={{ padding: '10px 14px', background: i === 1 ? 'var(--bone)' : 'transparent', color: i === 1 ? 'var(--ink)' : 'var(--bone-3)', border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase' }}>{v}</button>
          ))}
        </div>
        <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.filter} Filtrar</button>
        <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>{Ic.plus} Nueva cita</button>
      </>}>

      <div style={{ display: 'flex', gap: 18, marginBottom: 18, fontSize: 11, color: 'var(--bone-3)' }}>
        {[
          { n: 'Ana Ferraris', c: 'var(--gold)' },
          { n: 'Diego Solana', c: 'var(--oxblood)' },
          { n: 'Mara Itzel', c: '#5A4068' },
          { n: 'Kenji Aoki', c: '#3D5A4F' },
        ].map(p => (
          <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="dot" style={{ background: p.c, width: 8, height: 8 }} />{p.n}
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7,1fr)', borderBottom: '1px solid var(--line)' }}>
          <div />
          {days.map((d, i) => (
            <div key={d} style={{ padding: '14px 12px', borderLeft: '1px solid var(--line)', textAlign: 'left' }}>
              <div className="lab">{d.split(' ')[0]}</div>
              <div className="serif" style={{ fontSize: 26, marginTop: 4, color: i === 0 ? 'var(--gold)' : 'var(--bone)' }}>{d.split(' ')[1]}</div>
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '60px repeat(7,1fr)' }}>
          <div>
            {hours.map(h => <div key={h} style={{ height: 56, padding: '6px 8px', borderBottom: '1px solid var(--line)' }} className="lab">{h}h</div>)}
          </div>
          {days.map((_, di) => (
            <div key={di} style={{ position: 'relative', borderLeft: '1px solid var(--line)' }}>
              {hours.map((h) => <div key={h} style={{ height: 56, borderBottom: '1px solid var(--line)' }} />)}
              {events.filter(e => e.day === di).map((e, k) => (
                <div key={k} style={{
                  position: 'absolute', left: 4, right: 4, top: e.start * 56 + 2, height: e.span * 56 - 4,
                  background: e.col, color: e.col === 'var(--bone)' ? 'var(--ink)' : 'var(--bone)',
                  padding: 8, fontSize: 11, overflow: 'hidden', borderLeft: '3px solid rgba(14,14,12,.3)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.92,
                }}>
                  <div>
                    <div className="mono" style={{ fontSize: 9, opacity: .8, textTransform: 'uppercase', letterSpacing: '.12em' }}>{e.a}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, lineHeight: 1.1, marginTop: 4 }}>{e.c}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 9, opacity: .85, textTransform: 'uppercase', letterSpacing: '.1em' }}>{e.p}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </CrmShell>
  );
}

export function CrmClientsPage() {
  const clients = [
    { n: 'Sofía Aguirre', t: 'AF', st: 'Activa', ses: 3, last: 'hoy', st_c: 'var(--gold)' },
    { n: 'Mateo Reyes', t: 'AF', st: 'En curación', ses: 1, last: 'hoy', st_c: '#3D8C5F' },
    { n: 'Lía Méndez', t: 'AF', st: 'Consulta', ses: 0, last: 'hoy', st_c: 'var(--bone)' },
    { n: 'Carlos Vega', t: 'DS', st: 'Activa', ses: 2, last: 'ayer', st_c: 'var(--gold)' },
    { n: 'Renata Coss', t: 'DS', st: 'Pendiente depósito', ses: 0, last: '—', st_c: 'var(--oxblood)' },
    { n: 'Andrés Pinto', t: 'KA', st: 'En curación', ses: 4, last: 'hace 3 sem', st_c: '#3D8C5F' },
    { n: 'Iris Garza', t: 'AF', st: 'Vigilar', ses: 1, last: 'hace 6d', st_c: 'var(--gold)' },
    { n: 'Tomás L.', t: 'DS', st: 'Curación final', ses: 1, last: 'hace 12d', st_c: 'var(--bone-3)' },
    { n: 'Frida B.', t: 'MI', st: 'Activa', ses: 2, last: 'vie', st_c: 'var(--gold)' },
    { n: 'Pablo Marín', t: 'KA', st: 'Activa', ses: 6, last: 'mié', st_c: 'var(--gold)' },
  ];

  return (
    <CrmShell active="Clientes" title="Clientes" subtitle="487 expedientes · 11 con curación activa"
      actions={<>
        <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.download} Exportar CSV</button>
        <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>{Ic.plus} Nuevo cliente</button>
      </>}>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        <div style={{ border: '1px solid var(--line)' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--bone-3)', fontSize: 12, flex: 1 }}>{Ic.search}<span>Buscar por nombre, teléfono o etiqueta…</span></div>
            <span className="chip">Todos</span>
            <span className="chip">Activos</span>
            <span className="chip">Curación</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '32px 2fr 70px 1.4fr 80px 80px 30px', padding: '12px 18px', borderBottom: '1px solid var(--line)' }}>
            {['', 'Cliente', 'Artista', 'Estado', 'Sesiones', 'Último', ''].map((h, i) => (
              <span key={i} className="lab">{h}</span>
            ))}
          </div>
          {clients.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 70px 1.4fr 80px 80px 30px', padding: '14px 18px', borderBottom: i < clients.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'center', background: i === 0 ? 'rgba(201,168,100,0.06)' : 'transparent' }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink-3)', color: 'var(--bone-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 12, border: '1px solid var(--line-strong)' }}>{c.n[0]}</span>
              <span style={{ fontSize: 13 }}>{c.n}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--bone-3)' }}>{c.t}</span>
              <span className="chip" style={{ borderColor: c.st_c, color: c.st_c }}>{c.st}</span>
              <span className="serif" style={{ fontSize: 18 }}>{c.ses}</span>
              <span className="lab">{c.last}</span>
              <span style={{ color: 'var(--ash)', cursor: 'pointer' }}>{Ic.more}</span>
            </div>
          ))}
        </div>

        {/* Selected client detail */}
        <div style={{ border: '1px solid var(--gold)', background: 'rgba(201,168,100,0.04)', padding: 24 }}>
          <div className="lab" style={{ color: 'var(--gold)' }}>· expediente seleccionado</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 14, marginTop: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gold)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 28 }}>S</div>
            <div>
              <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>Sofía Aguirre</div>
              <div className="lab" style={{ marginTop: 6 }}>cliente desde mar 2023 · 3 piezas</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
            {[
              { k: 'Teléfono', v: '+52 55 1234 9087' },
              { k: 'Email', v: 'sofia.a@correo.mx' },
              { k: 'Edad', v: '28 años' },
              { k: 'Alergias', v: 'Lidocaína' },
            ].map(r => (
              <div key={r.k}>
                <div className="lab">{r.k}</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>{r.v}</div>
              </div>
            ))}
          </div>

          <div className="hr" style={{ margin: '24px 0' }} />
          <div className="lab" style={{ marginBottom: 12 }}>· historial de diseños</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { t: 'Lirio antebrazo', d: 'may 25' },
              { t: 'Helecho costilla', d: 'ago 24' },
              { t: 'Frase clavícula', d: 'mar 23' },
            ].map((h, i) => (
              <div key={i}>
                <div className="placeholder warm" style={{ height: 100 }}>· {String(i + 1).padStart(2, '0')} ·</div>
                <div style={{ fontSize: 11, marginTop: 6 }}>{h.t}</div>
                <div className="lab" style={{ marginTop: 2 }}>{h.d}</div>
              </div>
            ))}
          </div>

          <div className="hr" style={{ margin: '24px 0' }} />
          <div className="lab" style={{ marginBottom: 12 }}>· archivos</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { i: Ic.signature, t: 'Consentimiento informado · firmado', d: '04 may 2025' },
              { i: Ic.doc, t: 'Cotización · pieza 03', d: '29 abr 2025' },
              { i: Ic.camera, t: 'Fotos curación · 6 imágenes', d: 'actualizado hoy' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--gold)' }}>{f.i}</span>
                <span style={{ fontSize: 12, flex: 1 }}>{f.t}</span>
                <span className="lab">{f.d}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)', flex: 1 }}>{Ic.cal} Agendar</button>
            <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.msg} Mensaje</button>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function CrmConsentPage() {
  return (
    <CrmShell active="Consentimientos" title="Consentimiento informado" subtitle="expediente · sofía aguirre · pieza 03 · ana ferraris"
      actions={<>
        <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.download} PDF</button>
        <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>Enviar al cliente {Ic.arrow}</button>
      </>}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 14 }}>
        {/* Document */}
        <div style={{ border: '1px solid var(--line)', background: 'var(--bone)', color: 'var(--ink)', padding: '48px 56px', minHeight: 800 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 36 }}>
            <div>
              <div className="serif-i" style={{ fontSize: 32 }}>Atelier</div>
              <div className="lab" style={{ color: 'rgba(14,14,12,.55)', marginTop: 4 }}>STUDIO OF PERMANENT MARKS · CDMX</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>FOLIO</div>
              <div className="mono" style={{ fontSize: 14, marginTop: 4 }}>CI-2025-0487</div>
            </div>
          </div>

          <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
            Consentimiento <span className="serif-i" style={{ color: 'var(--oxblood)' }}>informado</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.7, color: 'rgba(14,14,12,.7)' }}>
            Yo, <span style={{ borderBottom: '1px solid var(--ink)', padding: '0 6px' }}>Sofía Aguirre Ramos</span>, mayor de edad, con identificación oficial CURP <span className="mono" style={{ background: 'rgba(14,14,12,.05)', padding: '2px 6px' }}>AURS970412MDFGNF09</span>, autorizo de manera libre e informada la realización del procedimiento de tatuaje descrito a continuación.
          </p>

          <div className="split-rule ink" style={{ margin: '30px 0 18px' }}><div className="line" /><span className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>· detalles del procedimiento</span><div className="line" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            {[
              { k: 'Artista', v: 'Ana Ferraris' },
              { k: 'Pieza', v: 'Lirio · antebrazo izq.' },
              { k: 'Tamaño', v: '12 × 18 cm' },
              { k: 'Sesión', v: '1 de 1 · 3h' },
              { k: 'Tinta', v: 'Eternal · negro' },
              { k: 'Lote', v: 'EX-2024-118-A' },
              { k: 'Fecha', v: '04 mayo 2025' },
              { k: 'Costo', v: '$5,400 MXN' },
            ].map(r => (
              <div key={r.k}>
                <div className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>{r.k}</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>{r.v}</div>
              </div>
            ))}
          </div>

          <div className="split-rule ink" style={{ margin: '30px 0 18px' }}><div className="line" /><span className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>· declaraciones</span><div className="line" /></div>
          <ol style={{ margin: 0, padding: '0 0 0 22px', display: 'grid', gap: 12, fontSize: 13, lineHeight: 1.6, color: 'rgba(14,14,12,.75)' }}>
            <li>Comprendo que el tatuaje es un procedimiento permanente que perfora la piel mediante agujas estériles.</li>
            <li>Confirmo no estar embarazada, ni bajo influencia de alcohol o sustancias, ni tener trastornos hemorrágicos o infección activa en la zona.</li>
            <li>He sido informada sobre el cuidado posterior, posibles complicaciones (infección, alergia, queloide) y comprendo los signos que requieren atención médica.</li>
            <li>Autorizo el uso de fotografías del resultado para portafolio y redes sociales del estudio, con anonimato de rostro.</li>
            <li>Acepto el costo total y el carácter no reembolsable del depósito tras la primera línea trazada.</li>
          </ol>

          <div className="split-rule ink" style={{ margin: '36px 0 24px' }}><div className="line" /><span className="lab" style={{ color: 'rgba(14,14,12,.55)' }}>· firma electrónica</span><div className="line" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ height: 110, border: '1px dashed rgba(14,14,12,.3)', padding: 14, position: 'relative', background: 'rgba(14,14,12,.02)' }}>
                <svg viewBox="0 0 280 80" style={{ width: '100%', height: '100%' }}>
                  <path d="M10 55 Q 30 20, 55 50 T 100 35 Q 130 60, 160 25 T 220 50 L 260 35" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="mono" style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 9, color: 'rgba(14,14,12,.55)' }}>04/05/25 · 09:54 · IP 187.213.x</span>
              </div>
              <div className="lab" style={{ color: 'rgba(14,14,12,.55)', marginTop: 10 }}>Cliente · Sofía Aguirre Ramos</div>
            </div>
            <div>
              <div style={{ height: 110, border: '1px dashed rgba(14,14,12,.3)', padding: 14, position: 'relative', background: 'rgba(14,14,12,.02)' }}>
                <svg viewBox="0 0 280 80" style={{ width: '100%', height: '100%' }}>
                  <path d="M10 60 Q 40 10, 70 45 T 130 30 Q 160 55, 200 20 T 260 45" fill="none" stroke="var(--oxblood)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="mono" style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 9, color: 'rgba(14,14,12,.55)' }}>04/05/25 · 09:55 · estudio</span>
              </div>
              <div className="lab" style={{ color: 'rgba(14,14,12,.55)', marginTop: 10 }}>Artista · Ana Ferraris</div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div style={{ border: '1px solid var(--gold)', background: 'rgba(201,168,100,.06)', padding: 20 }}>
            <div className="lab" style={{ color: 'var(--gold)' }}>· estado</div>
            <div className="serif" style={{ fontSize: 28, marginTop: 10 }}>Firmado</div>
            <div className="lab" style={{ marginTop: 6 }}>04 may 2025 · 09:55 hrs</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '10px 12px', background: 'var(--ink-3)', border: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--gold)' }}>{Ic.shieldCheck}</span>
              <span style={{ fontSize: 11 }}>Firma verificada · hash sha-256</span>
            </div>
          </div>

          <div style={{ border: '1px solid var(--line)', padding: 20 }}>
            <div className="lab">· checklist</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              {[
                { t: 'Identificación oficial verificada', c: true },
                { t: 'Cuestionario médico completo', c: true },
                { t: 'Depósito recibido', c: true },
                { t: 'Boceto aprobado por cliente', c: true },
                { t: 'Foto post-sesión', c: false },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                  <span style={{ width: 16, height: 16, border: `1px solid ${x.c ? 'var(--gold)' : 'var(--line-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>{x.c ? Ic.check : ''}</span>
                  <span style={{ color: x.c ? 'var(--bone)' : 'var(--bone-3)' }}>{x.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: '1px solid var(--line)', padding: 20 }}>
            <div className="lab">· timeline</div>
            <div style={{ display: 'grid', gap: 14, marginTop: 14, fontSize: 11 }}>
              {[
                { t: 'Enviado al cliente', d: '03 may · 18:20' },
                { t: 'Abierto en móvil', d: '03 may · 21:04' },
                { t: 'Cuestionario respondido', d: '04 may · 09:30' },
                { t: 'Firmado', d: '04 may · 09:55' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                  <span>{x.t}</span><span className="lab">{x.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function CrmHealingPage() {
  const cases = [
    { n: 'Iris Garza', t: 'AF', d: 6, p: 0.22, st: 'Vigilar', c: 'var(--gold)', note: 'Hinchazón leve persistente, foto recibida ayer.' },
    { n: 'Tomás L.', t: 'DS', d: 12, p: 0.45, st: 'Normal', c: '#3D8C5F', note: 'Costras finas, descamación esperada.' },
    { n: 'Sofía Aguirre', t: 'AF', d: 0, p: 0.04, st: 'Día 1', c: 'var(--bone)', note: 'Vendaje hidrocoloide aplicado en estudio.' },
    { n: 'Andrés P.', t: 'KA', d: 21, p: 0.78, st: 'Final', c: '#3D8C5F', note: 'Color asentado, recordar SPF 50.' },
    { n: 'Mateo Reyes', t: 'AF', d: 0, p: 0.04, st: 'Día 1', c: 'var(--bone)', note: 'Pieza fresca · seguimiento mañana.' },
    { n: 'Frida B.', t: 'MI', d: 8, p: 0.30, st: 'Normal', c: '#3D8C5F', note: 'Picazón controlada con Bepanthol.' },
  ];

  return (
    <CrmShell active="Curación" title={<>Seguimiento de <span className="serif-i" style={{ color: 'var(--gold)' }}>curación</span></>} subtitle="11 casos activos · 2 requieren atención"
      actions={<>
        <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.bell} Recordatorios</button>
        <button className="btn btn-solid" style={{ padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>{Ic.plus} Nuevo caso</button>
      </>}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 14 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {cases.map((c, i) => (
            <div key={i} style={{ border: '1px solid var(--line)', padding: 20, display: 'grid', gridTemplateColumns: '60px 1.4fr 1fr 1.6fr 100px', gap: 18, alignItems: 'center', background: c.st === 'Vigilar' ? 'rgba(201,168,100,0.05)' : 'transparent' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" className="ring">
                <circle cx="28" cy="28" r="22" stroke="var(--ink-3)" strokeWidth="3" fill="none" />
                <circle cx="28" cy="28" r="22" stroke={c.c} strokeWidth="3" fill="none"
                  strokeDasharray={`${2 * Math.PI * 22 * c.p} ${2 * Math.PI * 22}`} strokeLinecap="round" />
                <text x="28" y="32" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="11" fill="var(--bone)" transform="rotate(90 28 28)">{c.d}d</text>
              </svg>
              <div>
                <div className="serif" style={{ fontSize: 24 }}>{c.n}</div>
                <div className="lab" style={{ marginTop: 4 }}>artista · {c.t}</div>
              </div>
              <div>
                <span className="chip" style={{ borderColor: c.c, color: c.c }}>● {c.st}</span>
                <div className="lab" style={{ marginTop: 8 }}>día {c.d} de 28</div>
              </div>
              <div>
                <div className="lab">· última nota</div>
                <div style={{ fontSize: 12, color: 'var(--bone-3)', marginTop: 4, lineHeight: 1.5 }}>{c.note}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn" style={{ padding: '8px 10px', fontSize: 9 }}>{Ic.camera} Foto</button>
                <button className="btn" style={{ padding: '8px 10px', fontSize: 9 }}>{Ic.msg} Mensaje</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--gold)', background: 'rgba(201,168,100,.04)', padding: 24, alignSelf: 'start' }}>
          <div className="lab" style={{ color: 'var(--gold)' }}>· caso destacado · vigilar</div>
          <div className="serif" style={{ fontSize: 32, marginTop: 12 }}>Iris Garza</div>
          <div className="lab" style={{ marginTop: 4 }}>día 6 de 28 · pieza neotrad antebrazo</div>

          <div className="lab" style={{ marginTop: 24, marginBottom: 10 }}>· bitácora fotográfica</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
            {['d0', 'd2', 'd4', 'd6'].map((d) => (
              <div key={d}>
                <div className="placeholder warm" style={{ height: 80 }}>· {d} ·</div>
                <div className="lab" style={{ marginTop: 4, textAlign: 'center' }}>{d}</div>
              </div>
            ))}
          </div>

          <div className="lab" style={{ marginTop: 24, marginBottom: 10 }}>· síntomas reportados</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { t: 'Picazón leve', c: '#3D8C5F' },
              { t: 'Hinchazón persistente +3d', c: 'var(--gold)' },
              { t: 'Sin fiebre ni pus', c: '#3D8C5F' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <span className="dot" style={{ background: s.c }} />{s.t}
              </div>
            ))}
          </div>

          <div className="lab" style={{ marginTop: 24, marginBottom: 10 }}>· acción sugerida</div>
          <div style={{ background: 'var(--ink-3)', border: '1px solid var(--line)', padding: 14, fontSize: 12, lineHeight: 1.6, color: 'var(--bone-3)' }}>
            Solicitar foto en luz natural en 24h. Si la hinchazón persiste, derivar a consulta médica de seguimiento.
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="btn btn-solid" style={{ flex: 1, padding: '10px 14px', fontSize: 10, background: 'var(--gold)', borderColor: 'var(--gold)' }}>{Ic.msg} Enviar mensaje</button>
            <button className="btn" style={{ padding: '10px 14px', fontSize: 10 }}>{Ic.cal} Agendar revisión</button>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}
