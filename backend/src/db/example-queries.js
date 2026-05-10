'use strict';

/**
 * Example Prisma query patterns for Traveloop.
 * Run with: `node -e "require('./src/db/example-queries').demo()"` from backend/
 * (requires DATABASE_URL and `prisma generate`).
 */

const { prisma } = require('../config/database');

async function createUser(payload) {
  return prisma.user.create({
    data: {
      email: payload.email,
      passwordHash: payload.passwordHash,
      name: payload.name,
    },
  });
}

async function createTripForUser(userId, data) {
  return prisma.trip.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      startsOn: data.startsOn,
      endsOn: data.endsOn,
      status: data.status ?? 'DRAFT',
      isMultiCity: Boolean(data.isMultiCity),
    },
  });
}

async function addStops(tripId, stops) {
  await prisma.stop.createMany({
    data: stops.map((s) => ({
      tripId,
      city: s.city,
      country: s.country,
      arrivesOn: s.arrivesOn,
      departsOn: s.departsOn,
      orderIndex: s.orderIndex,
      latitude: s.latitude,
      longitude: s.longitude,
      logisticsNotes: s.logisticsNotes,
    })),
    skipDuplicates: true,
  });
}

async function addActivity(stopId, activity) {
  return prisma.activity.create({
    data: {
      stopId,
      title: activity.title,
      description: activity.description,
      startsAt: activity.startsAt,
      endsAt: activity.endsAt,
      estimatedCost: activity.estimatedCost,
      locationHint: activity.locationHint,
    },
  });
}

async function addExpense(payload) {
  return prisma.expense.create({
    data: {
      tripId: payload.tripId,
      stopId: payload.stopId ?? null,
      activityId: payload.activityId ?? null,
      category: payload.category,
      amount: payload.amount,
      currency: payload.currency,
      vendor: payload.vendor,
      memo: payload.memo,
      spentOn: payload.spentOn ?? new Date(),
    },
  });
}

async function fetchCompleteItinerary(tripId) {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      stops: {
        orderBy: { orderIndex: 'asc' },
        include: {
          activities: { orderBy: { startsAt: 'asc' } },
        },
      },
      packingItems: { orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] },
      notes: { orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }] },
      sharedLinks: {
        where: { revokedAt: null },
      },
      expenses: { orderBy: { spentOn: 'desc' }, take: 100 },
      user: { select: { id: true, email: true, name: true } },
    },
  });
}

async function fetchUserTrips(userId, { status, take = 50 } = {}) {
  return prisma.trip.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
    },
    orderBy: { startsOn: 'desc' },
    take,
    select: {
      id: true,
      title: true,
      startsOn: true,
      endsOn: true,
      status: true,
      isMultiCity: true,
      updatedAt: true,
      _count: {
        select: {
          stops: true,
          expenses: true,
        },
      },
    },
  });
}

async function deleteTripWithCascade(tripId, ownerUserId) {
  const owned = await prisma.trip.findFirst({
    where: { id: tripId, userId: ownerUserId },
    select: { id: true },
  });

  if (!owned) {
    throw new Error('Trip not found for this user');
  }

  // Children (stops→activities→expense links, packing, notes, shares) cascade per schema.
  return prisma.trip.delete({ where: { id: tripId } });
}

async function budgetTotalsForTrip(tripId, currency) {
  const rows = await prisma.expense.groupBy({
    by: ['category'],
    where: {
      tripId,
      ...(currency ? { currency } : {}),
    },
    _sum: { amount: true },
    _count: { _all: true },
  });

  const grand = await prisma.expense.aggregate({
    where: { tripId, ...(currency ? { currency } : {}) },
    _sum: { amount: true },
  });

  return {
    currency: currency ?? 'ALL_OPEN',
    breakdown: rows,
    grandTotal: grand._sum.amount,
  };
}

async function demo() {
  const sampleUser = await prisma.user.findFirst();
  const sampleTrip = sampleUser
    ? await prisma.trip.findFirst({ where: { userId: sampleUser.id } })
    : null;
  return { sampleUserId: sampleUser?.id, sampleTripId: sampleTrip?.id };
}

module.exports = {
  createUser,
  createTripForUser,
  addStops,
  addActivity,
  addExpense,
  fetchCompleteItinerary,
  fetchUserTrips,
  deleteTripWithCascade,
  budgetTotalsForTrip,
  demo,
};
