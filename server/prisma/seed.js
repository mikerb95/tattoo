const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Artists
  const artists = await Promise.all([
    prisma.artist.upsert({
      where: { email: 'ana@atelier.mx' },
      update: {},
      create: {
        email: 'ana@atelier.mx',
        password: await bcrypt.hash('atelier2025', 10),
        name: 'Ana Ferraris',
        specialty: 'Fineline · botánico',
        initials: 'AF',
        color: '#C9A864',
        role: 'admin',
        status: 'online',
      },
    }),
    prisma.artist.upsert({
      where: { email: 'diego@atelier.mx' },
      update: {},
      create: {
        email: 'diego@atelier.mx',
        password: await bcrypt.hash('atelier2025', 10),
        name: 'Diego Solana',
        specialty: 'Blackwork · ornamental',
        initials: 'DS',
        color: '#7A2A22',
        status: 'online',
      },
    }),
    prisma.artist.upsert({
      where: { email: 'mara@atelier.mx' },
      update: {},
      create: {
        email: 'mara@atelier.mx',
        password: await bcrypt.hash('atelier2025', 10),
        name: 'Mara Itzel',
        specialty: 'Neotradicional',
        initials: 'MI',
        color: '#3D5A4F',
        status: 'offline',
      },
    }),
    prisma.artist.upsert({
      where: { email: 'kenji@atelier.mx' },
      update: {},
      create: {
        email: 'kenji@atelier.mx',
        password: await bcrypt.hash('atelier2025', 10),
        name: 'Kenji Aoki',
        specialty: 'Irezumi · wabori',
        initials: 'KA',
        color: '#5A4068',
        status: 'online',
      },
    }),
  ]);

  console.log(`✓ ${artists.length} artistas creados`);

  // Clients
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { email: 'sofia.a@correo.mx' },
      update: {},
      create: {
        name: 'Sofía Aguirre',
        email: 'sofia.a@correo.mx',
        phone: '+52 55 1234 9087',
        age: 28,
        allergies: 'Lidocaína',
      },
    }),
    prisma.client.upsert({
      where: { email: 'mateo.r@correo.mx' },
      update: {},
      create: {
        name: 'Mateo Reyes',
        email: 'mateo.r@correo.mx',
        phone: '+52 55 2345 0198',
        age: 32,
      },
    }),
    prisma.client.upsert({
      where: { email: 'lia.m@correo.mx' },
      update: {},
      create: {
        name: 'Lía Méndez',
        email: 'lia.m@correo.mx',
        phone: '+52 55 3456 1209',
        age: 25,
      },
    }),
    prisma.client.upsert({
      where: { email: 'iris.g@correo.mx' },
      update: {},
      create: {
        name: 'Iris Garza',
        email: 'iris.g@correo.mx',
        phone: '+52 55 4567 2310',
        age: 30,
      },
    }),
    prisma.client.upsert({
      where: { email: 'andres.p@correo.mx' },
      update: {},
      create: {
        name: 'Andrés Pinto',
        email: 'andres.p@correo.mx',
        phone: '+52 55 5678 3421',
        age: 35,
      },
    }),
  ]);

  console.log(`✓ ${clients.length} clientes creados`);

  // Portfolio pieces
  const styles = ['Fineline', 'Blackwork', 'Irezumi', 'Neotradicional', 'Lettering', 'Geométrico'];
  const zones = ['Antebrazo', 'Espalda', 'Pierna', 'Costilla', 'Clavícula', 'Brazo'];
  const portfolioPieces = [
    { title: 'Botánico · antebrazo', artist: 'Ana Ferraris', style: 'Fineline', zone: 'Antebrazo', year: 2025, featured: true },
    { title: 'Mandala · espalda', artist: 'Diego Solana', style: 'Blackwork', zone: 'Espalda', year: 2025, featured: true },
    { title: 'Koi nishiki', artist: 'Kenji Aoki', style: 'Irezumi', zone: 'Pierna', year: 2025, featured: true },
    { title: 'Letter · cuello', artist: 'Mara Itzel', style: 'Lettering', zone: 'Cuello', year: 2025 },
    { title: 'Lirio · clavícula', artist: 'Ana Ferraris', style: 'Fineline', zone: 'Clavícula', year: 2024, featured: true },
    { title: 'Tigre · muslo', artist: 'Kenji Aoki', style: 'Irezumi', zone: 'Pierna', year: 2024 },
    { title: 'Pieza grande · pecho', artist: 'Diego Solana', style: 'Blackwork', zone: 'Pecho', year: 2024 },
    { title: 'Constelación · ribs', artist: 'Mara Itzel', style: 'Neotradicional', zone: 'Costilla', year: 2024 },
    { title: 'Fern · pierna', artist: 'Ana Ferraris', style: 'Fineline', zone: 'Pierna', year: 2024 },
    { title: 'Hannya · brazo', artist: 'Kenji Aoki', style: 'Irezumi', zone: 'Brazo', year: 2024 },
    { title: 'Símbolo geom.', artist: 'Diego Solana', style: 'Geométrico', zone: 'Brazo', year: 2023 },
  ];

  for (const p of portfolioPieces) {
    await prisma.portfolio.upsert({
      where: { id: p.title.toLowerCase().replace(/\s/g, '-').replace(/·/g, '').replace(/\./g, '') + '-' + p.year },
      update: {},
      create: { ...p, tags: JSON.stringify([p.style, p.zone]) },
    }).catch(() => prisma.portfolio.create({ data: { ...p, tags: JSON.stringify([p.style, p.zone]) } }));
  }

  console.log(`✓ ${portfolioPieces.length} piezas de portafolio creadas`);

  // Sample appointment + deposit + healing for demo
  const sofia = clients[0];
  const ana = artists[0];

  const appt = await prisma.appointment.upsert({
    where: { id: 'demo-appt-sofia-1' },
    update: {},
    create: {
      id: 'demo-appt-sofia-1',
      clientId: sofia.id,
      artistId: ana.id,
      date: new Date('2025-05-04T10:00:00'),
      duration: 3,
      piece: 'Lirio · antebrazo',
      zone: 'antebrazo',
      status: 'in-progress',
      totalAmount: 5400,
    },
  });

  await prisma.deposit.upsert({
    where: { appointmentId: appt.id },
    update: {},
    create: {
      appointmentId: appt.id,
      clientId: sofia.id,
      amount: 1500,
      dueDate: new Date('2025-04-20'),
      paidAt: new Date('2025-04-18'),
      status: 'paid',
    },
  });

  const consentFolio = 'CI-2025-0487';
  await prisma.consentForm.upsert({
    where: { appointmentId: appt.id },
    update: {},
    create: {
      appointmentId: appt.id,
      clientId: sofia.id,
      folio: consentFolio,
      status: 'signed',
      sentAt: new Date('2025-05-03T18:20:00'),
      openedAt: new Date('2025-05-03T21:04:00'),
      clientSignedAt: new Date('2025-05-04T09:54:00'),
      artistSignedAt: new Date('2025-05-04T09:55:00'),
      clientSignature: 'data:svg;base64,signed-client',
      artistSignature: 'data:svg;base64,signed-artist',
      checklist: JSON.stringify({
        idVerified: true,
        medicalQuestionnaire: true,
        depositReceived: true,
        sketchApproved: true,
        postSessionPhoto: false,
      }),
    },
  });

  // Healing case for Iris
  const iris = clients[3];
  const healingCase = await prisma.healingCase.upsert({
    where: { id: 'demo-healing-iris-1' },
    update: {},
    create: {
      id: 'demo-healing-iris-1',
      clientId: iris.id,
      artistId: ana.id,
      piece: 'Neotrad · antebrazo',
      zone: 'antebrazo',
      startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      status: 'concern',
    },
  });

  for (const [i, dayData] of [
    { day: 0, symptoms: [], note: 'Vendaje hidrocoloide aplicado.', status: 'normal' },
    { day: 2, symptoms: ['itching'], note: 'Picazón leve normal.', status: 'normal' },
    { day: 4, symptoms: ['itching', 'swelling'], note: 'Hinchazón leve detectada.', status: 'watch' },
    { day: 6, symptoms: ['swelling'], note: 'Hinchazón persistente, pendiente de foto.', status: 'watch' },
  ].entries()) {
    await prisma.healingEntry.upsert({
      where: { id: `iris-entry-${i}` },
      update: {},
      create: {
        id: `iris-entry-${i}`,
        healingCaseId: healingCase.id,
        day: dayData.day,
        symptoms: JSON.stringify(dayData.symptoms),
        note: dayData.note,
        status: dayData.status,
      },
    });
  }

  console.log('✓ Casos demo (cita, depósito, consentimiento, curación) creados');
  console.log('\n🎨 Atelier seed completado. Credenciales de acceso:');
  console.log('   ana@atelier.mx     | atelier2025  (admin)');
  console.log('   diego@atelier.mx   | atelier2025');
  console.log('   mara@atelier.mx    | atelier2025');
  console.log('   kenji@atelier.mx   | atelier2025');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
