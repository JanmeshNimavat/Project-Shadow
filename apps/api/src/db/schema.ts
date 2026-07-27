import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // CUID2
  email: text('email').notNull().unique(),
  full_name: text('full_name').notNull(),
  badge_number: text('badge_number'),
  department: text('department'),
  role: text('role').notNull().default('investigator'),
  is_active: integer('is_active', { mode: 'boolean' }).default(true),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const cases = sqliteTable('cases', {
  id: text('id').primaryKey(),
  case_number: text('case_number').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull().default('open'),
  priority: text('priority').notNull(),
  assigned_officer_id: text('assigned_officer_id').references(() => users.id),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const evidence = sqliteTable('evidence', {
  id: text('id').primaryKey(),
  evidence_number: text('evidence_number').notNull().unique(),
  case_id: text('case_id').notNull().references(() => cases.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  file_path: text('file_path'),
  file_hash_sha256: text('file_hash_sha256'),
  status: text('status').default('collected').notNull(),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
