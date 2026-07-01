import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Malta: GDPR (Reg. (EU) 2016/679) + Processing of Personal Data
// (Electronic Communications Sector) Regulations, S.L. 586.01
// (transposing ePrivacy Directive 2002/58/EC) + Data Protection Act
// (Cap. 586). Regulator: Information and Data Protection Commissioner
// (IDPC). S.L. 586.01 reg. 9(1) requires PRIOR consent IN WRITING for
// unsolicited electronic mail for direct marketing (opt-in). Soft
// opt-in carve-out at reg. 9(2) for own similar products/services from
// existing customers, with clear opt-out at collection and in every
// message. No B2B exemption — reg. 9(1) explicitly applies to any
// subscriber or user "irrespective of whether such subscriber or user
// is a natural person or legal person". Child digital-services age
// set to 13 by S.L. 586.11 reg. 4 (Legal Notice 179 of 2018) — Malta
// opted for the GDPR Art. 8 floor. Verified 2026-07-01 against
// idpc.org.mt primary-source PDFs.
export const MT: CountryData = {
  code: "MT",
  regime: "GDPR+ePrivacy",
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
      // S.L. 586.01 reg. 9(1) applies "irrespective of whether such
      // subscriber or user is a natural person or legal person" —
      // Malta is one of the EU MS that did NOT carve out B2B from
      // ePrivacy direct-marketing rules.
      regime: "none",
      conditions: [
        "S.L. 586.01 reg. 9(1) prior-written-consent rule applies to legal persons",
        "GDPR LIA still possible for B2B role addresses but ePrivacy consent layer applies to email channel",
      ],
    },
    consentLanguage: {
      // Malta is officially bilingual (Maltese + English) under the
      // Constitution art. 5. Either is acceptable for consent wording.
      required: ["en", "mt"],
      mustMatchUserLocale: false,
    },
    dataResidency: { storageRegion: "eu", crossBorderTransferMechanism: "scc" },
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
    // S.L. 586.11 reg. 4 (Legal Notice 179 of 2018) — Malta set the
    // digital-services consent age at 13 (the GDPR Art. 8 floor;
    // Malta did not raise it). NB: Cap. 586 art. 4 is scope, not
    // child consent — that provision lives in the S.L.
    childAgeOfConsent: 13,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute:
        "GDPR (Reg. (EU) 2016/679) + Processing of Personal Data (Electronic Communications Sector) Regulations, S.L. 586.01 reg. 9 + Data Protection Act (Cap. 586) + S.L. 586.11 reg. 4 (child consent age 13)",
      url: "https://idpc.org.mt/wp-content/uploads/2020/07/SL-586.01.pdf",
      jurisdiction: "MT",
      subRegime: "MT-EPRIVACY",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { bundlingAllowed: false },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    "existing-customer": {
      // S.L. 586.01 reg. 9(2): own similar products/services soft opt-in,
      // clear and distinct opt-out at point of collection and in every
      // subsequent message.
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
      suggestedTemplate: "single-opt-in",
    },
  },
}
