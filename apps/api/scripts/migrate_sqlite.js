const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = 'H:/Shadow_watch/darkweb_monitor.db';
const outPath = path.join(__dirname, 'seed.sql');

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found at ${dbPath}`);
  fs.writeFileSync(outPath, '-- No source DB found. Please run migrations manually.\n');
  process.exit(0);
}

try {
  const db = new DatabaseSync(dbPath);
  
  // Try to find what tables exist
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log("Found tables:", tables.map(t => t.name).join(', '));
  
  let sql = `-- Auto-generated migration from ${dbPath}\n\n`;
  
  // We don't know the exact schema yet, but if it has 'cases' or similar, we can map it.
  // For now, this is a placeholder script until we inspect the actual db schema.
  
  fs.writeFileSync(outPath, sql);
  console.log(`Generated ${outPath}`);
} catch (err) {
  console.error("Migration script failed:", err.message);
}
