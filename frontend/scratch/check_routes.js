
import http from 'http';

const routes = [
  '/',
  '/login',
  '/register',
  '/trips',
  '/explore',
  '/itinerary',
  '/itinerary-view',
  '/checklist',
  '/community',
  '/notes',
  '/billing',
  '/dashboard',
  '/profile',
  '/create-trip'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      console.log(`[${res.statusCode}] ${route}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`[ERR] ${route}: ${err.message}`);
      resolve(500);
    });
  });
}

async function run() {
  console.log('Checking application routes...');
  for (const route of routes) {
    await checkRoute(route);
  }
}

run();
