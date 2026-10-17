import fs from 'node:fs';

const records = [];

function rec(id, name, aliases, type, catCode, catName, subcat, shortDesc, detail, purpose, useCases, langs, deps, runtime, build, offline, role, dbRels, apiRels, comp, alts, hosting, diff, adv, lim, constr, sec, docs, repo, lic) {
  records.push({
    id,
    name,
    aliases: aliases || [],
    type,
    category: `${catCode}. ${catName}`,
    categoryCode: catCode,
    subcategory: subcat,
    shortDescription: shortDesc,
    detailedExplanation: detail,
    mainPurpose: purpose,
    typicalUseCases: useCases,
    relatedLanguages: langs,
    dependencies: deps,
    runtimeRequirements: runtime,
    buildRequirements: build,
    compatibility: {
      browser: 'All modern standards-compliant browsers',
      os: 'Cross-platform (Linux, macOS, Windows)',
      offlineCapable: offline
    },
    role,
    relations: {
      database: dbRels,
      api: apiRels,
      complementary: comp,
      alternatives: alts
    },
    hostingOptions: hosting,
    learningDifficulty: diff,
    advantages: adv,
    limitations: lim,
    knownConstraints: constr,
    securityNotes: sec,
    docsUrl: docs,
    repoUrl: repo,
    license: lic,
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// Write the builder script helper
fs.writeFileSync('scripts/recHelper.js', 'export const records = ' + JSON.stringify(records) + ';');
console.log('recHelper initialised.');
