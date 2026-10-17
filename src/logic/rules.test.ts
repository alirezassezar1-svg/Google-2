import test from 'node:test';
import assert from 'node:assert/strict';
import { TECH_CATALOG, TECH_MAP } from '../data/catalog.ts';
import {
  evaluateStackCompatibility,
  recommendStackFromAdvisor
} from './rules.ts';

test('Catalog Completeness & Validation', () => {
  assert.ok(TECH_CATALOG.length >= 150, `Expected at least 150 records, got ${TECH_CATALOG.length}`);
  
  // Verify all IDs are unique
  const idSet = new Set<string>();
  for (const item of TECH_CATALOG) {
    assert.ok(!idSet.has(item.id), `Duplicate ID found: ${item.id}`);
    idSet.add(item.id);

    // Verify critical schema fields
    assert.ok(item.name && item.name.length > 0, `Missing name for ${item.id}`);
    assert.ok(item.category && item.category.length > 0, `Missing category for ${item.id}`);
    assert.ok(item.mainPurpose && item.mainPurpose.length > 0, `Missing mainPurpose for ${item.id}`);
    assert.ok(item.learningDifficulty >= 1 && item.learningDifficulty <= 5, `Invalid difficulty for ${item.id}`);
    assert.ok(item.docsUrl && item.docsUrl.startsWith('http'), `Invalid docsUrl for ${item.id}`);
    assert.ok(item.license && item.license.length > 0, `Missing license for ${item.id}`);
  }
});

test('Compatibility: Detects Static Host + Persistent Server Conflict', () => {
  // Stack with GitHub Pages and Express
  const selectedIds = ['host-gh-pages', 'be-express', 'lang-javascript', 'db-postgres'];
  const findings = evaluateStackCompatibility(selectedIds, TECH_MAP);
  
  const staticConflict = findings.find(f => f.ruleId === 'RULE-STATIC-HOST-SERVER-RUNTIME');
  assert.ok(staticConflict, 'Should detect static host incompatible with server runtime');
  assert.equal(staticConflict?.severity, 'error');
});

test('Compatibility: Detects Client-Only Storage in Multi-User Context', () => {
  const selectedIds = ['db-indexeddb', 'be-express', 'lang-typescript'];
  const findings = evaluateStackCompatibility(selectedIds, TECH_MAP);
  
  const storageWarning = findings.find(f => f.ruleId === 'RULE-CLIENT-STORAGE-CENTRALIZED');
  assert.ok(storageWarning, 'Should warn that IndexedDB is single-client only');
  assert.equal(storageWarning?.severity, 'warning');
});

test('Compatibility: Valid Compatible Stack Produces No Errors', () => {
  // Fully compatible stack: React + Vite + TypeScript + Vercel
  const selectedIds = ['lang-typescript', 'fe-react', 'bt-vite', 'host-vercel'];
  const findings = evaluateStackCompatibility(selectedIds, TECH_MAP);
  
  const errors = findings.filter(f => f.severity === 'error');
  assert.equal(errors.length, 0, 'Standard compatible stack should have zero errors');
});

test('Project Advisor: Correctly Recommends Offline PWA when requested', () => {
  const recommendation = recommendStackFromAdvisor({
    appType: 'saas-web',
    audience: 'solo',
    formFactor: 'web',
    offlineReq: 'offline-first',
    dataArchitecture: 'local-only',
    hosting: 'static-cdn',
    devEnv: 'macos',
    budget: 'free',
    buildTolerance: 'zero-build',
    projectOrigin: 'greenfield'
  });

  assert.ok(recommendation.matchScore >= 90);
  assert.equal(recommendation.stack.database, 'db-indexeddb');
  assert.ok(recommendation.reasoningEn.length > 0);
  assert.ok(recommendation.reasoningFa.length > 0);
});

test('Project Advisor: Correctly Recommends Python AI Stack for AI application', () => {
  const recommendation = recommendStackFromAdvisor({
    appType: 'ai-data',
    audience: 'enterprise',
    formFactor: 'server',
    offlineReq: 'connected',
    dataArchitecture: 'relational-sql',
    hosting: 'vps',
    devEnv: 'linux',
    budget: 'low',
    buildTolerance: 'standard-bundler',
    projectOrigin: 'greenfield'
  });

  assert.equal(recommendation.stack.language, 'lang-python');
  assert.equal(recommendation.stack.backend, 'be-fastapi');
  assert.ok(recommendation.stack.aiIntegration?.includes('pytorch'));
});
