'use strict';

const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

function rowToService(row) {
  let data = {};
  try {
    data = JSON.parse(row.data);
  } catch (_e) {
    data = {};
  }
  // Exclude stored string "id" so the numeric PK is never overridden
  const { id: _ignoredStringId, ...rest } = data;
  return {
    dbId: row.id,
    id: row.slug,
    slug: row.slug,
    order: row.sort_order,
    ...rest,
  };
}

// GET /api/v1/services
router.get('/', (req, res) => {
  const rows = db
    .prepare('SELECT id, slug, sort_order, data FROM services ORDER BY sort_order ASC, id ASC')
    .all();
  res.json(rows.map(rowToService));
});

// GET /api/v1/services/:slug
router.get('/:slug', (req, res) => {
  const row = db
    .prepare('SELECT id, slug, sort_order, data FROM services WHERE slug = ?')
    .get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Servizio non trovato' });
  res.json(rowToService(row));
});

// POST /api/v1/services
router.post('/', requireAdmin, (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body richiesto: oggetto JSON' });
  }
  const { slug, order, ...rest } = body;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Campo "slug" obbligatorio' });
  }
  const sortOrder = typeof order === 'number' ? order : 0;
  try {
    const stmt = db.prepare(
      `INSERT INTO services (slug, sort_order, data, updated_at)
       VALUES (?, ?, ?, datetime('now'))`
    );
    const info = stmt.run(slug, sortOrder, JSON.stringify(rest));
    const row = db
      .prepare('SELECT id, slug, sort_order, data FROM services WHERE id = ?')
      .get(info.lastInsertRowid);
    res.status(201).json(rowToService(row));
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) {
      return res.status(400).json({ error: `Slug "${slug}" già esistente` });
    }
    throw err;
  }
});

// PUT /api/v1/services/:slug
router.put('/:slug', requireAdmin, (req, res) => {
  const slug = req.params.slug;
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body richiesto: oggetto JSON' });
  }
  const existing = db.prepare('SELECT id FROM services WHERE slug = ?').get(slug);
  if (!existing) return res.status(404).json({ error: 'Servizio non trovato' });

  const { slug: newSlug, order, ...rest } = body;
  if (!newSlug || typeof newSlug !== 'string') {
    return res.status(400).json({ error: 'Campo "slug" obbligatorio' });
  }
  const sortOrder = typeof order === 'number' ? order : 0;
  try {
    const stmt = db.prepare(
      `UPDATE services
         SET slug = ?, sort_order = ?, data = ?, updated_at = datetime('now')
       WHERE id = ?`
    );
    stmt.run(newSlug, sortOrder, JSON.stringify(rest), existing.id);
    const row = db
      .prepare('SELECT id, slug, sort_order, data FROM services WHERE id = ?')
      .get(existing.id);
    res.json(rowToService(row));
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) {
      return res.status(400).json({ error: `Slug "${newSlug}" già esistente` });
    }
    throw err;
  }
});

// DELETE /api/v1/services/:slug
router.delete('/:slug', requireAdmin, (req, res) => {
  const slug = req.params.slug;
  const info = db.prepare('DELETE FROM services WHERE slug = ?').run(slug);
  if (info.changes === 0) return res.status(404).json({ error: 'Servizio non trovato' });
  res.json({ ok: true, slug });
});

module.exports = router;
