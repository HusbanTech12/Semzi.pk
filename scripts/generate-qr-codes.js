const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const postgres = require('postgres');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const BASE_URL = 'https://semzi.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'qrcodes');

async function fetchProductsFromDB() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL not found in .env');

  const client = postgres(connectionString, { ssl: { rejectUnauthorized: false } });
  const rows = await client`SELECT slug, name FROM products WHERE is_active = true ORDER BY id`;
  await client.end();
  return rows;
}

async function generateQRCodes() {
  console.log('Fetching products from database...\n');
  const dbProducts = await fetchProductsFromDB();

  if (dbProducts.length === 0) {
    console.log('No products found in database.');
    return;
  }

  console.log(`Found ${dbProducts.length} products in DB.\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const dbSlugs = new Set();

  for (const product of dbProducts) {
    dbSlugs.add(product.slug);

    const url = `${BASE_URL}/product/${product.slug}`;
    const filename = `${product.slug}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    await QRCode.toFile(filepath, url, {
      type: 'png',
      width: 1024,
      margin: 2,
      color: { dark: '#2B2118', light: '#FFFFFF' },
      errorCorrectionLevel: 'H',
    });

    console.log(`✓ ${product.name}`);
    console.log(`  URL: ${url}`);
    console.log(`  File: public/qrcodes/${filename}\n`);
  }

  // Remove orphaned PNGs not in DB
  const existingFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  let removed = 0;

  for (const file of existingFiles) {
    const slug = file.replace('.png', '');
    if (!dbSlugs.has(slug)) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
      console.log(`✗ Removed orphaned: ${file}`);
      removed++;
    }
  }

  console.log(`\nDone! ${dbProducts.length} QR codes generated, ${removed} orphaned PNGs removed.`);
}

generateQRCodes().catch(console.error);
