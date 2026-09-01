import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Saudi Arabia Personal Data Protection Law (PDPL), Royal Decree M/19
// of 9/2/1443H, amended by Royal Decree M/148 of 5/9/1444H (Mar 2023);
// entered into force 14 Sept 2023 with a 1-year grace period ending
// 14 Sept 2024. Executive Regulations issued 2023 by SDAIA (Saudi
// Data and AI Authority).
// - PDPL Art. 5 + 6 + Exec Reg Art. 11: processing requires consent
//   ("لا تجوز معالجة البيانات الشخصية...إلا بعد موافقة صاحبها");
//   consent must be free-will, purpose-specific, separate per purpose,
//   verifiable, and from a person of full legal capacity ("من كامل
//   الأهلية"). Explicit consent required for sensitive data, credit
//   data, and automated-decision processing.
// - PDPL Art. 25 + Exec Reg Art. 28/29: sending promotional /
//   awareness / marketing materials requires the targeted recipient's
//   CONSENT, clear sender identity in every message, and an opt-out
//   mechanism at least as easy as the opt-in. Exec Reg Art. 28(1)
//   frames consent as required "in the case where there is no prior
//   dealing between the controller and the targeted recipient" —
//   maintainer treats this conservatively (no soft opt-in) because
//   Art. 29 imposes consent on direct marketing generally.
// - PDPL Art. 29 + Exec Reg: cross-border transfers permitted only
//   with adequate protection abroad assessed by SDAIA and limited to
//   the minimum data necessary.
// - PDPL covers personal data of natural persons; legal-person /
//   function business contacts (info@company.sa) are outside scope.
// - Arabic is the official language; consent wording must be
//   intelligible to the data subject — Arabic required where the
//   subject is an Arabic speaker / Saudi resident.
// - PDPL / Exec Reg do not fix a numeric child age of consent; Art. 5
//   and Exec Reg Art. 13 require guardian ("الولي الشرعي") consent
//   for a subject who is "ناقص أو عديم الأهلية" (incomplete /
//   lacking legal capacity). Saudi civil-law majority is 18.
// Verified 2026-09-01 against SDAIA primary text (PersonalData.pdf,
// ExecutiveRegulations.pdf).
export const SA: CountryData = {
  code: "SA",
  regime: "PDPL",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      regime: "none",
      conditions: [
        "PDPL applies to personal data of natural persons; corporate / legal-person contact data (e.g. info@company.sa) is outside scope",
        "Marketing to a named individual at a business address is still in scope",
      ],
    },
    consentLanguage: { required: ["ar"], mustMatchUserLocale: true },
    // PDPL Art. 29 + Implementing Regs: transfers outside the Kingdom
    // are permitted subject to SDAIA conditions; sensitive data and
    // certain government-related data may be subject to localization.
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "adequacy" },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: true,
    },
    reConsentTriggerMonths: 24,
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Personal Data Protection Law (PDPL), Royal Decree M/19 of 9/2/1443H, as amended by Royal Decree M/148 of 5/9/1444H; in force from 14 Sept 2023, enforcement from 14 Sept 2024 after 1-year grace period. Executive Regulations issued by SDAIA (2023).",
      url: "https://sdaia.gov.sa/en/SDAIA/about/Pages/PersonalDataProtection.aspx",
      jurisdiction: "SA",
      subRegime: "SA-PDPL",
      dataLastUpdated: "2026-09-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { canCollectForMarketing: false, optIn: "blocked", suggestedTemplate: "blocked" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    // PDPL Art. 25 requires consent for direct marketing regardless of
    // prior customer relationship; no soft opt-in is available.
    "existing-customer": {
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
