import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Iceland is an EEA member: GDPR applies via the EEA Joint Committee
// Decision and is implemented domestically by Act No. 90/2018 on Data
// Protection and the Processing of Personal Data. Electronic direct
// marketing (ePrivacy) is governed by the Electronic Communications Act
// No. 70/2022, Art. 94 (Óumbeðin fjarskipti) — which replaced Act
// 81/2003 Art. 46 on 1 September 2022. Art. 94 requires PRIOR CONSENT
// for unsolicited electronic marketing (automated calling systems, SMS,
// email) to subscribers, with a soft opt-in carve-out for the sender's
// own similar products to existing customers (mirrors ePrivacy
// Directive 2002/58/EC Art. 13). Regulator: Persónuvernd (Icelandic
// DPA) and Fjarskiptastofa (Electronic Communications Office).
// [2026-07-01] Updated statute reference from Act 81/2003 → Act 70/2022
// per althingi.is/lagas/nuna/2022070.html.
//
// b2bExemption: Act 70/2022 Art. 94 addresses subscribers ("áskrifendur");
// electronic marketing to legal persons (companies) is generally
// permitted unless they have opted out. Generic role addresses
// (info@, sales@) are not linked to an identifiable natural person
// and are treated more lightly.
//
// childAgeOfConsent: Act No. 90/2018 Art. 10 sets the age of consent for
// information society services at 13 (Iceland used the GDPR Art. 8(1)
// derogation to lower from 16 to 13).
export const IS: CountryData = {
  code: "IS",
  regime: "GDPR",
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
      regime: "function-address",
      conditions: [
        "Act No. 70/2022 Art. 94 (Óumbeðin fjarskipti) applies to subscribers/natural persons; legal persons may be marketed to until they opt out",
        "Generic role addresses (info@, sales@) of legal persons treated lighter; identifiable natural-person business addresses still require consent",
      ],
    },
    consentLanguage: { required: [], mustMatchUserLocale: true },
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
    childAgeOfConsent: 13,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // [2026-07-01] Statute updated: Electronic Communications Act 81/2003
      // was repealed and replaced by Act 70/2022 (in force 1 Sept 2022);
      // the ePrivacy provision moved from Art. 46 → Art. 94 ("Óumbeðin
      // fjarskipti"). Verified against althingi.is/lagas/nuna/2022070.html.
      statute: "Act No. 90/2018 on Data Protection and the Processing of Personal Data (implementing GDPR/EU 2016/679 via EEA) + Electronic Communications Act No. 70/2022 Art. 94 (ePrivacy; replaces Act 81/2003 Art. 46)",
      url: "https://www.althingi.is/lagas/nuna/2022070.html",
      jurisdiction: "IS",
      subRegime: "IS-EPRIVACY",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { bundlingAllowed: false, checkboxRequired: true },
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
