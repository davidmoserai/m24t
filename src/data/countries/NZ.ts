import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Unsolicited Electronic Messages Act 2007 (UEMA) + Privacy Act 2020
// (as amended by Privacy Amendment Act 2025, Royal Assent 23 Sept 2025;
// IPP 3A indirect-collection notification commences 1 May 2026).
// UEMA s.4 "consent" defers to Schedule 2, which lists three forms:
// express, inferred (from conduct / existing relationship), and deemed
// (conspicuously published business address, message relevant to role,
// no "no marketing" notice accompanying publication) — most permissive
// B2B regime in this set. Sender identification: s.10. Functional
// unsubscribe: s.11; unsubscribe request takes effect 5 working days
// after use per s.11(2).
export const NZ: CountryData = {
  code: "NZ",
  regime: "UEMA",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: false,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "any",
    softOptInAvailable: true,
    softOptInScope: "any",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      regime: "publicly-disclosed",
      conditions: [
        // Deemed consent per UEMA Schedule 2 cl.4 (via s.4 defn): address
        // conspicuously published in business/official capacity, message
        // relevant to role/functions/duties, publication not accompanied
        // by a no-marketing notice.
        "UEMA Schedule 2 deemed consent: address conspicuously published in business/official capacity, message relevant to role/functions/duties, publication not accompanied by no-marketing notice",
      ],
    },
    consentLanguage: { required: [], mustMatchUserLocale: false },
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "scc" },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      healthMarketingBlocked: false,
      politicalMarketingBlocked: false,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "channel", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: null,
    childAgeOfConsent: 16,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "source", "wording"],
    basis: {
      // Privacy Amendment Act 2025 (No 53) received Royal Assent
      // 23 Sept 2025; IPP 3A (indirect-collection notification)
      // commences 1 May 2026.
      statute: "Unsolicited Electronic Messages Act 2007 (No. 7 of 2007) + Privacy Act 2020 (No. 31 of 2020, as amended by Privacy Amendment Act 2025 No. 53)",
      url: "https://www.legislation.govt.nz/act/public/2007/0007/latest/whole.html",
      jurisdiction: "NZ",
      subRegime: "UEMA",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "single-opt-in",
  },
  byContext: {
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "any",
    },
    "publicly-listed-business": {
      // Deemed consent for B2B published addresses
      softOptInAvailable: true,
      softOptInScope: "any",
      optIn: "single",
    },
  },
}
