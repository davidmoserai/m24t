import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Liechtenstein is an EEA member state — GDPR applies directly via the
// EEA Agreement. Domestic implementation: Datenschutzgesetz (DSG),
// LGBl. 2018 Nr. 272 (in force 1 Jan 2020). ePrivacy/electronic
// marketing rules: Kommunikationsgesetz (KomG), LGBl. 2006 Nr. 91, esp.
// Art. 50 "Unerbetene Nachrichten" (verified 2026-07-01 against
// gesetze.li consolidated KomG) — express prior consent required for
// marketing email, with a narrow soft opt-in for existing customers
// on own similar products/services (Art. 50(1)(b), referring to Art. 13(2)
// of the EU ePrivacy Directive). Regulator: Datenschutzstelle
// (https://www.datenschutzstelle.li).
export const LI: CountryData = {
  code: "LI",
  regime: "GDPR",
  defaults: {
    canCollectForMarketing: true,
    // KomG Art. 50(1)(a) mirrors EU ePrivacy Art. 13 — express prior
    // consent for unsolicited electronic mail (updated 2026-07-01: prior
    // record cited Art. 47; correct article is Art. 50).
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    // KomG Art. 50(1)(b) soft opt-in: own similar products/services to
    // existing customers, with clear opt-out at collection and in
    // every message. Applied via byRelationship["existing-customer"];
    // default (no relationship) remains false.
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    // Liechtenstein has no general B2B carve-out from KomG Art. 50;
    // the prohibition on unsolicited direct-marketing email applies
    // regardless of recipient type. Generic role addresses are treated
    // more lightly in practice but this is not codified.
    b2bExemption: {
      regime: "none",
      conditions: [
        "KomG Art. 50 applies to Direktwerbung regardless of recipient type",
      ],
    },
    // German is the sole official language of Liechtenstein. Consent
    // wording presented to LI residents should be in German to be
    // demonstrably informed under GDPR Art. 7(2).
    consentLanguage: { required: ["de"], mustMatchUserLocale: true },
    // EEA member — data flows freely within the EEA; outbound transfers
    // require Chapter V mechanisms (adequacy/SCCs/BCRs).
    dataResidency: { storageRegion: "eu", crossBorderTransferMechanism: "adequacy" },
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
    // LI DSG (LGBl. 2018 Nr. 272) contains no derogation from GDPR
    // Art. 8(1); therefore the EEA/GDPR default of 16 applies directly
    // (verified 2026-07-01 against gesetze.li consolidated DSG).
    childAgeOfConsent: 16,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Corrected 2026-07-01: KomG unsolicited-messages provision is
      // Art. 50 (not Art. 47 as previously recorded).
      statute: "Datenschutzgesetz (DSG), LGBl. 2018 Nr. 272 + Kommunikationsgesetz (KomG), LGBl. 2006 Nr. 91, Art. 50 (Unerbetene Nachrichten) + GDPR (Regulation (EU) 2016/679 via EEA Agreement)",
      url: "https://www.gesetze.li/konso/2006091000",
      jurisdiction: "LI",
      subRegime: "LI-EPRIVACY",
      dataLastUpdated: "2026-07-01",
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
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
