import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const cli = resolve(dirname(fileURLToPath(import.meta.url)), '../bin/skills.mjs');

test('skills where reads Agent Home from config/settings.json, not workspace.json', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'finch-skills-layout-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const runtime = join(root, 'runtime');
  const agent = join(root, 'configured-agent');
  mkdirSync(join(runtime, 'config'), { recursive: true });
  writeFileSync(join(runtime, 'workspace.json'), JSON.stringify({ finchHomeDir: join(root, 'stale-agent') }));
  writeFileSync(join(runtime, 'config', 'settings.json'), JSON.stringify({ general: { finchHomeDir: agent } }));
  const result = spawnSync(process.execPath, [cli, 'where'], { env: { ...process.env, FINCH_RUNTIME_HOME: runtime, FINCH_AGENT_HOME: '' }, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes(join(agent, '.finch', 'skills')));
  assert.ok(!result.stdout.includes('stale-agent'));
});

test('skills where falls back to v1.7.1 workspace Agent Home before settings migration', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'finch-skills-v171-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const runtime = join(root, 'runtime');
  const agent = join(root, 'legacy-agent');
  mkdirSync(runtime, { recursive: true });
  writeFileSync(join(runtime, 'workspace.json'), JSON.stringify({ finchHomeDir: agent }));
  const result = spawnSync(process.execPath, [cli, 'where'], {
    env: { ...process.env, FINCH_RUNTIME_HOME: runtime, FINCH_AGENT_HOME: '' }, encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes(join(agent, '.finch', 'skills')));
});
