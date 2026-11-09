#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const STANDARD_LIMIT = 130;
const ABSOLUTE_LIMIT = 210;
const WARNING_THRESHOLD = 120;

const EXCEPTIONS_PATH = path.resolve('.agents/size-exceptions.json');
let exceptions = {};
if (fs.existsSync(EXCEPTIONS_PATH)) {
  try {
    exceptions = JSON.parse(fs.readFileSync(EXCEPTIONS_PATH, 'utf-8'));
  } catch (err) {
    console.error(`Error leyendo ${EXCEPTIONS_PATH}:`, err.message);
    process.exit(1);
  }
}

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      if (
        (file.endsWith('.svelte') || file.endsWith('.astro') || file.endsWith('.ts')) &&
        !file.endsWith('.test.ts')
      ) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allFiles = getFiles('src');
let failures = [];
let warnings = [];
let rows = [];

for (const filePath of allFiles) {
  const relPath = path.relative('.', filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.length === 0 ? 0 : content.split('\n').length;

  const exc = exceptions[relPath];
  const effectiveLimit = exc && typeof exc.max === 'number' ? exc.max : STANDARD_LIMIT;

  let status = 'OK';

  if (lines > ABSOLUTE_LIMIT) {
    status = 'FALLA (Supera tope absoluto 210)';
    failures.push(`${relPath}: ${lines} líneas (supera máximo absoluto ${ABSOLUTE_LIMIT})`);
  } else if (lines > effectiveLimit) {
    status = exc
      ? `FALLA (Supera excepción ${exc.max})`
      : `FALLA (Supera estándar ${STANDARD_LIMIT})`;
    failures.push(`${relPath}: ${lines} líneas (límite ${effectiveLimit})`);
  } else if (exc && lines <= STANDARD_LIMIT) {
    status = 'AVISO (Excepción obsoleta ≤ 130)';
    warnings.push(`${relPath}: ${lines} líneas (excepción innecesaria aprobada para ${exc.max})`);
  } else if (lines >= WARNING_THRESHOLD) {
    status = 'AVISO (Cerca del límite)';
    warnings.push(`${relPath}: ${lines} líneas (cerca de ${STANDARD_LIMIT})`);
  }

  rows.push({
    file: relPath,
    lines,
    limit: effectiveLimit,
    status
  });
}

// Ordenar por número de líneas descendente
rows.sort((a, b) => b.lines - a.lines);

console.log('\n📊 REPORTE DE TAMAÑO DE ARCHIVOS (Spec 11)');
console.log('='.repeat(92));
console.log(
  'ARCHIVO'.padEnd(58) +
  'LÍNEAS'.padStart(7) +
  'LÍMITE'.padStart(8) +
  '   ESTADO'
);
console.log('-'.repeat(92));

for (const r of rows) {
  let indicator = '  ';
  if (r.status.startsWith('FALLA')) indicator = '❌';
  else if (r.status.startsWith('AVISO')) indicator = '⚠️ ';
  else indicator = '✅';

  console.log(
    r.file.padEnd(58) +
    String(r.lines).padStart(7) +
    String(r.limit).padStart(8) +
    `   ${indicator} ${r.status}`
  );
}
console.log('='.repeat(92));

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} advertencia(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}

if (failures.length > 0) {
  console.error(`\n❌ ${failures.length} archivo(s) violan los límites de tamaño:\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\nConsulta AGENTS.md. Si corresponde una excepción, regístrala en .agents/size-exceptions.json con aprobación del Arquitecto.\n');
  process.exit(1);
} else {
  console.log('\n✨ Todos los archivos cumplen las normas de tamaño (estándar ≤ 130 líneas).\n');
  process.exit(0);
}
