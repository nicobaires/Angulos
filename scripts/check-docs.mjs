#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DOC_FILES = [
  'AGENTS.md',
  'MEMORY.md',
  'README.md'
];

function getDocFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getDocFiles(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function getAllRepoFiles(dir) {
  let results = new Set();
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const sub = getAllRepoFiles(fullPath);
      for (const s of sub) results.add(s);
    } else {
      results.add(file);
      results.add(path.relative('.', fullPath));
    }
  }
  return results;
}

const allRepoFiles = getAllRepoFiles('.');
const allDocs = [...DOC_FILES, ...getDocFiles('.agents')];
const missing = [];
const checked = new Set();

const FILE_PATTERN = /`([A-Za-z0-9_\-./]+\.[a-z0-9]+)`/g;

for (const doc of allDocs) {
  if (!fs.existsSync(doc)) continue;
  const content = fs.readFileSync(doc, 'utf-8');
  let match;
  while ((match = FILE_PATTERN.exec(content)) !== null) {
    const ref = match[1];
    // Ignorar urls, comandos, imports o formatos de fecha/regex
    if (ref.startsWith('http') || ref.includes('*') || ref.endsWith('.com') || ref.endsWith('.app') || ref.includes('()')) continue;
    if (ref.startsWith('0.') || ref.startsWith('1.') || ref.startsWith('v20') || ref.startsWith('v22')) continue;
    if (ref.includes('$') || ref.includes('`') || ref.includes('\\')) continue;

    const key = `${doc} -> ${ref}`;
    if (checked.has(key)) continue;
    checked.add(key);

    const base = path.basename(ref);
    const exists = allRepoFiles.has(ref) || allRepoFiles.has(base) || fs.existsSync(ref);

    if (!exists) {
      missing.push({ doc, ref });
    }
  }
}

console.log('\n📚 AUDITORÍA DE REFERENCIAS EN DOCUMENTACIÓN (check:docs)');
console.log('='.repeat(80));

if (missing.length === 0) {
  console.log('✨ No se encontraron referencias a archivos inexistentes en la documentación.\n');
  process.exit(0);
} else {
  console.log(`⚠️  Se detectaron ${missing.length} referencia(s) a rutas que no existen actualmente:\n`);
  for (const m of missing) {
    console.log(`  - [${m.doc}] cita \`${m.ref}\``);
  }
  console.log('\nAviso informativo: En la versión inicial de Spec 11 check:docs no bloquea el build.\n');
  process.exit(0);
}
