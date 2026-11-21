import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEMES, UserProfile } from '../src/lib/schemes';
import { evaluateScheme, evaluateAllSchemes, getTopMatches } from '../src/lib/eligibility-engine';

test('SchemeSaathi Decision Engine Tests', async (t) => {
  await t.test('1. PM-KISAN: eligible farmer with land holding and low income passes', () => {
    const pmKisan = SCHEMES.find((s) => s.id === 'pm-kisan');
    assert.ok(pmKisan, 'PM-KISAN scheme must exist in catalog');

    const farmerProfile: UserProfile = {
      occupation: 'farmer',
      landHoldingAcres: 2.5,
      annualIncomeLakhsRs: 1.5,
      age: 35,
    };

    const result = evaluateScheme(pmKisan, farmerProfile);
    assert.equal(result.overallMatch, 'matches-checked-criteria');
    assert.equal(result.failCount, 0);
    assert.equal(result.unknownCount, 0);
    assert.ok(result.passCount >= 3);
  });

  await t.test('2. PM-KISAN: high-income person (> ₹10L/year) fails exclusion criterion', () => {
    const pmKisan = SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const richFarmer: UserProfile = {
      occupation: 'farmer',
      landHoldingAcres: 5.0,
      annualIncomeLakhsRs: 12.0, // Exceeds 10L threshold
    };

    const result = evaluateScheme(pmKisan, richFarmer);
    assert.equal(result.overallMatch, 'does-not-match');
    assert.ok(result.failCount >= 1);
  });

  await t.test('3. Missing answers result in "more-info-needed", never assumed false', () => {
    const pmKisan = SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const incompleteProfile: UserProfile = {
      occupation: 'farmer',
      // landHoldingAcres and annualIncomeLakhsRs are unknown
    };

    const result = evaluateScheme(pmKisan, incompleteProfile);
    assert.equal(result.overallMatch, 'more-info-needed');
    assert.ok(result.unknownCount > 0);
    assert.equal(result.failCount, 0);
  });

  await t.test('4. Ayushman Bharat PM-JAY: BPL ration card holder matches checked criteria', () => {
    const pmJay = SCHEMES.find((s) => s.id === 'ayushman-bharat')!;
    const bplProfile: UserProfile = {
      hasRationCard: true,
      rationCardType: 'bpl',
      annualIncomeLakhsRs: 1.2,
    };

    const result = evaluateScheme(pmJay, bplProfile);
    assert.equal(result.overallMatch, 'matches-checked-criteria');
    assert.equal(result.failCount, 0);
  });

  await t.test('5. Sukanya Samriddhi: girl child age boundary (age <= 10 passes, > 10 fails)', () => {
    const ssy = SCHEMES.find((s) => s.id === 'ssy')!;
    assert.ok(ssy, 'SSY scheme must exist in catalog');

    const eligibleGirl: UserProfile = {
      gender: 'female',
      age: 8,
    };
    const resPass = evaluateScheme(ssy, eligibleGirl);
    assert.equal(resPass.overallMatch, 'matches-checked-criteria');

    const ineligibleGirl: UserProfile = {
      gender: 'female',
      age: 14, // > 10
    };
    const resFail = evaluateScheme(ssy, ineligibleGirl);
    assert.equal(resFail.overallMatch, 'does-not-match');
    assert.ok(resFail.failCount >= 1);
  });

  await t.test('6. NSAP Senior Citizen Pension: exact boundary age 60 passes', () => {
    const nsap = SCHEMES.find((s) => s.id === 'nsap')!;
    assert.ok(nsap, 'NSAP scheme must exist in catalog');

    const senior60: UserProfile = {
      age: 60,
      hasRationCard: true,
      rationCardType: 'bpl',
    };

    const res = evaluateScheme(nsap, senior60);
    assert.equal(res.overallMatch, 'matches-checked-criteria');
  });

  await t.test('7. Empty or Reset profile marks all conditional schemes as more-info-needed', () => {
    const emptyProfile: UserProfile = {};
    const results = evaluateAllSchemes(SCHEMES, emptyProfile);
    assert.equal(results.length, SCHEMES.length);

    // No scheme should falsely fail because of missing answers
    const failedSchemes = results.filter((r) => r.overallMatch === 'does-not-match');
    assert.equal(failedSchemes.length, 0, 'Empty profile should have 0 failed schemes');
  });

  await t.test('8. Sorting: getTopMatches orders matches first, then more-info-needed', () => {
    const mixedProfile: UserProfile = {
      occupation: 'farmer',
      landHoldingAcres: 2.0,
      annualIncomeLakhsRs: 1.0,
      gender: 'male',
      age: 40,
    };
    const results = evaluateAllSchemes(SCHEMES, mixedProfile);
    const sorted = getTopMatches(results);

    // Matches first
    let seenNonMatch = false;
    for (const item of sorted) {
      if (item.overallMatch !== 'matches-checked-criteria') {
        seenNonMatch = true;
      } else if (seenNonMatch) {
        assert.fail('Found a matches-checked-criteria scheme after non-matching ones');
      }
    }
  });
});
