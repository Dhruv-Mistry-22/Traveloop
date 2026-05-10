'use strict';

require('../load-env');

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

async function main() {
  await prisma.sharedLink.deleteMany();
  await prisma.note.deleteMany();
  await prisma.packingItem.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.stop.deleteMany();
  await prisma.savedDestination.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  const alex = await prisma.user.create({
    data: {
      email: 'alex@traveloop.dev',
      passwordHash: hash('ChangeMe123!'),
      name: 'Alex Rivera',
      preference: {
        create: {
          language: 'en',
          currency: 'USD',
          timeZone: 'America/Los_Angeles',
          dietaryNotes: 'vegetarian-friendly',
          notificationsEmail: true,
          notificationsPush: true,
        },
      },
      savedDestinations: {
        create: [
          { country: 'JP', city: 'Kyoto', label: 'Spring temples' },
          { country: 'PT', city: 'Porto', label: 'River weekend' },
        ],
      },
    },
  });

  const sam = await prisma.user.create({
    data: {
      email: 'sam@traveloop.dev',
      passwordHash: hash('ChangeMe456!'),
      name: 'Sam Okonkwo',
      preference: {
        create: {
          language: 'en',
          currency: 'EUR',
          timeZone: 'Europe/Berlin',
          notificationsEmail: false,
          notificationsPush: true,
        },
      },
    },
  });

  const trip = await prisma.trip.create({
    data: {
      userId: alex.id,
      title: 'Japan Multi-City Spring',
      description: 'Tokyo → Kyoto → Osaka with rail pass',
      startsOn: new Date('2026-04-01'),
      endsOn: new Date('2026-04-14'),
      status: 'PLANNED',
      isMultiCity: true,
      stops: {
        create: [
          {
            city: 'Tokyo',
            country: 'JP',
            arrivesOn: new Date('2026-04-01'),
            departsOn: new Date('2026-04-05'),
            orderIndex: 0,
            logisticsNotes: 'Activate JR Pass at airport',
            activities: {
              create: [
                {
                  title: 'Shibuya evening walk',
                  startsAt: new Date('2026-04-01T18:00:00.000Z'),
                  endsAt: new Date('2026-04-01T21:00:00.000Z'),
                  estimatedCost: '0',
                },
                {
                  title: 'TeamLab Planets',
                  startsAt: new Date('2026-04-02T10:00:00.000Z'),
                  estimatedCost: '32.00',
                },
              ],
            },
          },
          {
            city: 'Kyoto',
            country: 'JP',
            arrivesOn: new Date('2026-04-05'),
            departsOn: new Date('2026-04-10'),
            orderIndex: 1,
            activities: {
              create: [
                {
                  title: 'Fushimi Inari hike',
                  startsAt: new Date('2026-04-06T07:30:00.000Z'),
                  estimatedCost: '0',
                },
              ],
            },
          },
        ],
      },
      packingItems: {
        create: [
          { name: 'Passport', category: 'DOCUMENTS', sortOrder: 0 },
          { name: 'Universal adapter', category: 'ELECTRONICS', sortOrder: 1 },
          { name: 'Comfortable shoes', category: 'CLOTHING', sortOrder: 2 },
        ],
      },
      notes: {
        create: [
          { title: 'Sim card', body: 'Pick up pocket WiFi at NRT', pinned: true },
          { body: 'Book kaiseki dinner if budget allows' },
        ],
      },
      sharedLinks: {
        create: [
          {
            title: 'Friends read-only',
            allowExpensesVisibility: false,
            expiresAt: new Date('2026-05-01T00:00:00.000Z'),
          },
        ],
      },
    },
    include: { stops: { include: { activities: true } } },
  });

  const tokyoStop = trip.stops.find((s) => s.city === 'Tokyo');
  const kyotoStop = trip.stops.find((s) => s.city === 'Kyoto');
  const teamlab = tokyoStop.activities.find((a) => a.title.startsWith('TeamLab'));

  await prisma.expense.createMany({
    data: [
      {
        tripId: trip.id,
        stopId: tokyoStop.id,
        category: 'TRANSPORT',
        amount: '420.00',
        currency: 'USD',
        vendor: 'ANA',
        memo: 'Round trip SFO–NRT',
        spentOn: new Date('2026-01-10'),
      },
      {
        tripId: trip.id,
        stopId: tokyoStop.id,
        activityId: teamlab.id,
        category: 'ACTIVITY',
        amount: '32.00',
        currency: 'USD',
        vendor: 'TeamLab',
        spentOn: new Date('2026-01-12'),
      },
      {
        tripId: trip.id,
        stopId: kyotoStop.id,
        category: 'ACCOMMODATION',
        amount: '540.00',
        currency: 'USD',
        vendor: 'Ryokan placeholder',
        spentOn: new Date('2026-01-15'),
      },
      {
        tripId: trip.id,
        category: 'FOOD',
        amount: '85.50',
        currency: 'USD',
        memo: 'Conbini + casual meals',
        spentOn: new Date('2026-02-01'),
      },
    ],
  });

  await prisma.trip.create({
    data: {
      userId: sam.id,
      title: 'Berlin long weekend',
      startsOn: new Date('2026-06-01'),
      endsOn: new Date('2026-06-04'),
      status: 'DRAFT',
      isMultiCity: false,
      stops: {
        create: [
          {
            city: 'Berlin',
            country: 'DE',
            orderIndex: 0,
            activities: {
              create: [{ title: 'Museum Island', estimatedCost: '25.00' }],
            },
          },
        ],
      },
    },
  });

  /** Indian domestic sample: hill stations (Maharashtra) + Gujarat coast & Sardar Patel memorial */
  const priya = await prisma.user.create({
    data: {
      email: 'priya@traveloop.dev',
      passwordHash: hash('ChangeMeIndian2026!'),
      name: 'Priya Nambiar',
      preference: {
        create: {
          language: 'en',
          currency: 'INR',
          timeZone: 'Asia/Kolkata',
          dietaryNotes: 'Jain veg on some days — plan meals early',
          notificationsEmail: true,
          notificationsPush: true,
        },
      },
      savedDestinations: {
        create: [
          {
            country: 'IN',
            region: 'Maharashtra',
            city: 'Mahabaleshwar',
            label: 'Strawberries & Venna Lake',
            latitude: '17.9236',
            longitude: '73.6586',
          },
          {
            country: 'IN',
            region: 'Maharashtra',
            city: 'Matheran',
            label: 'Vehicle‑free hill station',
            latitude: '18.9888',
            longitude: '73.2713',
          },
          {
            country: 'IN',
            region: 'Gujarat',
            city: 'Dwarka',
            label: 'Dwarkadhish Temple & sunset at Gomti',
            latitude: '22.2394',
            longitude: '68.9678',
          },
          {
            country: 'IN',
            region: 'Gujarat',
            city: 'Kevadia',
            label: 'Statue of Unity & Sardar Sarovar',
            latitude: '21.838',
            longitude: '73.7191',
          },
          {
            country: 'IN',
            region: 'Uttarakhand',
            city: 'Rishikesh',
            label: 'Ganga aarti backup trip',
          },
        ],
      },
    },
  });

  const indiaTrip = await prisma.trip.create({
    data: {
      userId: priya.id,
      title: 'India · Maharashtra hills to Gujarat heritage',
      description:
        'Weeklong loop: Sahyadri hill towns, then Gujarat coast — Dwarka pilgrimage + Statue of Unity at Kevadia.',
      startsOn: new Date('2026-10-09'),
      endsOn: new Date('2026-10-18'),
      status: 'PLANNED',
      isMultiCity: true,
      stops: {
        create: [
          {
            city: 'Mahabaleshwar',
            country: 'IN',
            arrivesOn: new Date('2026-10-09'),
            departsOn: new Date('2026-10-11'),
            orderIndex: 0,
            latitude: '17.9236',
            longitude: '73.6586',
            logisticsNotes:
              'Mumbai ↔ Mahabaleshwar by road/state transport; jacket for misty mornings',
            activities: {
              create: [
                {
                  title: 'Venna Lake boating & viewpoints',
                  description: 'Lodwick Point sunset if clouds clear.',
                  estimatedCost: '400.00',
                },
                {
                  title: 'Mapro Garden strawberry stop',
                  startsAt: new Date('2026-10-10T08:30:00.000+05:30'),
                  estimatedCost: '200.00',
                },
              ],
            },
          },
          {
            city: 'Matheran',
            country: 'IN',
            arrivesOn: new Date('2026-10-11'),
            departsOn: new Date('2026-10-13'),
            orderIndex: 1,
            latitude: '18.9888',
            longitude: '73.2713',
            logisticsNotes: 'Toy train timetable + red-mud walkways; confirm parking at Neral',
            activities: {
              create: [
                {
                  title: 'Panorama Point sunrise',
                  startsAt: new Date('2026-10-12T06:30:00.000+05:30'),
                  estimatedCost: '0',
                },
                {
                  title: 'Charlotte Lake ridge walk',
                  estimatedCost: '0',
                },
              ],
            },
          },
          {
            city: 'Dwarka',
            country: 'IN',
            arrivesOn: new Date('2026-10-14'),
            departsOn: new Date('2026-10-16'),
            orderIndex: 2,
            latitude: '22.2394',
            longitude: '68.9678',
            logisticsNotes:
              'Book Dwarkadhish darshan slot; ferry to Bet Dwarka weather-dependent',
            activities: {
              create: [
                {
                  title: 'Dwarkadhish Temple morning darshan',
                  estimatedCost: '150.00',
                },
                {
                  title: 'Gomti ghat sunset & lighthouse area',
                  startsAt: new Date('2026-10-15T17:45:00.000+05:30'),
                  estimatedCost: '0',
                },
              ],
            },
          },
          {
            city: 'Kevadia',
            country: 'IN',
            arrivesOn: new Date('2026-10-16'),
            departsOn: new Date('2026-10-18'),
            orderIndex: 3,
            latitude: '21.838',
            longitude: '73.7191',
            logisticsNotes:
              'Statue of Unity ticketing online; Sardar Sarovar viewpoint if time permits',
            activities: {
              create: [
                {
                  title: 'Statue of Unity observation deck visit',
                  description: 'Gallery + valley + evening laser show timing.',
                  estimatedCost: '1200.00',
                },
                {
                  title: 'Narmada riverfront walk near memorial',
                  estimatedCost: '0',
                },
              ],
            },
          },
        ],
      },
      packingItems: {
        create: [
          {
            name: 'Valid ID (Aadhaar / Passport)',
            category: 'DOCUMENTS',
            sortOrder: 0,
          },
          { name: 'Sturdy sandals + sneakers', category: 'CLOTHING', sortOrder: 1 },
          { name: 'Reusable water bottle', category: 'GEAR', sortOrder: 2 },
          {
            name: 'Temple-appropriate scarves / dupatta',
            category: 'CLOTHING',
            sortOrder: 3,
          },
          { name: 'Power bank', category: 'ELECTRONICS', sortOrder: 4 },
        ],
      },
      notes: {
        create: [
          {
            title: 'Monsoon aftermath',
            body: 'Late Oct can still have slippery trails — check Maharashtra road alerts.',
            pinned: true,
          },
          {
            body:
              'Gujarat leg: Gujarati thali lunches are heavy — plan lighter dinners.',
          },
        ],
      },
    },
    include: { stops: { include: { activities: true } } },
  });

  const mahabStop = indiaTrip.stops.find((s) => s.city === 'Mahabaleshwar');
  const matherStop = indiaTrip.stops.find((s) => s.city === 'Matheran');
  const dwarkaStop = indiaTrip.stops.find((s) => s.city === 'Dwarka');
  const kevadiaStop = indiaTrip.stops.find((s) => s.city === 'Kevadia');
  const statueAct = kevadiaStop.activities.find((a) =>
    a.title.includes('Statue of Unity'),
  );

  await prisma.expense.createMany({
    data: [
      {
        tripId: indiaTrip.id,
        stopId: mahabStop.id,
        category: 'TRANSPORT',
        amount: '4500.00',
        currency: 'INR',
        memo: 'Mumbai → Mahabaleshwar Volvo / SUV share',
        spentOn: new Date('2026-07-05'),
      },
      {
        tripId: indiaTrip.id,
        stopId: matherStop.id,
        category: 'ACCOMMODATION',
        amount: '8500.00',
        currency: 'INR',
        vendor: 'Hill bungalow placeholder',
        spentOn: new Date('2026-07-06'),
      },
      {
        tripId: indiaTrip.id,
        stopId: dwarkaStop.id,
        category: 'FOOD',
        amount: '2800.00',
        currency: 'INR',
        memo: 'Temple town thalis & chai',
        spentOn: new Date('2026-07-08'),
      },
      {
        tripId: indiaTrip.id,
        stopId: dwarkaStop.id,
        category: 'TRANSPORT',
        amount: '3200.00',
        currency: 'INR',
        memo: 'Rajkot/Keshod ↔ Dwarka ST / cab',
        spentOn: new Date('2026-07-09'),
      },
      {
        tripId: indiaTrip.id,
        stopId: kevadiaStop.id,
        activityId: statueAct.id,
        category: 'ACTIVITY',
        amount: '1200.00',
        currency: 'INR',
        memo: 'SoU combo ticket approximation',
        spentOn: new Date('2026-07-10'),
      },
      {
        tripId: indiaTrip.id,
        category: 'MISC',
        amount: '1500.00',
        currency: 'INR',
        memo: 'Travel insurance stub',
        spentOn: new Date('2026-06-20'),
      },
    ],
  });

  console.log('Seed complete:', {
    users: 3,
    japanTripId: trip.id,
    indiaTripId: indiaTrip.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
