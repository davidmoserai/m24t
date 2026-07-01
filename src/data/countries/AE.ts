import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Federal Decree-Law No. 45 of 2021 (PDPL) + TDRA Regulatory Policy on
// Unsolicited Electronic Communications v1.0 (30 Dec 2009) and Mobile
// Text Messages annex v1.1 (13 June 2022) + Federal Decree-Law No. 26
// of 2025 (Child Digital Safety, in force 2026). PDPL Executive
// Regulations status disputed —
// possibly issued 2024 but not consistently confirmed in Official
// Gazette as of 2026; UAE Data Office continues sector guidance.
// Free zones (DIFC, ADGM) operate independent GDPR-style regimes —
// check which regime applies before sending.
export const AE: CountryData = {
  code: "AE",
  regime: "PDPL",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "link",
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      regime: "none",
      conditions: [
        "PDPL applies regardless of recipient type",
        "TDRA SPAM Policy applies to all unsolicited commercial messages",
      ],
    },
    // Arabic primary under Consumer Protection Law and general UAE
    // contract practice; PDPL itself does not statutorily mandate
    // bilingual marketing consent. English commonly accepted.
    consentLanguage: { required: ["ar-AE"], mustMatchUserLocale: false },
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "explicit-consent" },
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
    reConsentTriggerMonths: null,
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording"],
    basis: {
      // statute: TDRA policy corrected to primary-source dates (v1.0 issued
      // 30 December 2009; Mobile Text Messages annex v1.1 issued 13 June
      // 2022) per PDF at
      // https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/Unsolicited-Elrctronic-Commuincations--pdf.ashx
      statute: "Federal Decree-Law No. 45 of 2021 (UAE Personal Data Protection Law; Executive Regulations status disputed) + TDRA Regulatory Policy on Unsolicited Electronic Communications v1.0 (30 Dec 2009) + TDRA Mobile Text Messages annex v1.1 (13 June 2022) + Federal Decree-Law No. 26 of 2025 (Child Digital Safety) + DIFC Data Protection Law No. 5 of 2020 + ADGM Data Protection Regulations 2021",
      url: "https://uaelegislation.gov.ae/en/legislations/1972/download",
      jurisdiction: "AE",
      subRegime: "AE-PDPL",
      dataLastUpdated: "2026-07-01",
      confidence: "low",
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
    "existing-customer": {
      // TDRA SPAM Policy tolerates marketing to customers with prior
      // relationship + clear opt-out, but no codified soft opt-in
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
