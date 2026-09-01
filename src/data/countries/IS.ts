import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Iceland is an EEA member: GDPR applies via the EEA Joint Committee
// Decision and is implemented domestically by Act No. 90/2018 on Data
// Protection and the Processing of Personal Data. Electronic direct
// marketing (ePrivacy) is governed by the Telecommunications Act
// No. 70/2022 (Lög um fjarskipti), Art. 94 (Óumbeðin fjarskipti) —
// which replaced the earlier Electronic Communications Act No. 81/2003
// Art. 46. Art. 94 mgr. 1 requires PRIOR EXPRESS CONSENT ("upplýst
// samþykki … fyrir fram") for use of automated calling systems, fax,
// email and any electronic messages for direct marketing. Mgr. 2 is a
// soft opt-in carve-out: an email address collected in the course of a
// sale may be used for direct marketing of the seller's own products
// or services if the recipient was given a free opt-out at collection
// and in every subsequent message (mirrors ePrivacy Directive 2002/58/EC
// Art. 13). Regulator: Persónuvernd (Icelandic Data Protection Authority).
//
// b2bExemption: Art. 94 mgr. 4 expressly permits use of general email
// addresses of companies and institutions (almenn tölvupóstföng
// fyrirtækja og stofnana) for direct marketing of goods and services,
// notwithstanding mgr. 1–3. Identifiable natural-person business
// addresses remain within mgr. 1 and require consent.
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
        "Act No. 70/2022 Art. 94 mgr. 4 permits use of general email addresses of companies and institutions (almenn tölvupóstföng fyrirtækja og stofnana) for direct marketing, notwithstanding mgr. 1–3",
        "Identifiable natural-person business addresses fall under mgr. 1 and require prior express consent (or the mgr. 2 existing-customer own-products carve-out)",
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
      statute: "Act No. 90/2018 on Data Protection and the Processing of Personal Data (implementing GDPR/EU 2016/679 via EEA) + Telecommunications Act No. 70/2022 (Lög um fjarskipti) Art. 94 (Óumbeðin fjarskipti) — replaces former Act No. 81/2003 Art. 46",
      url: "https://www.althingi.is/lagas/nuna/2022070.html",
      jurisdiction: "IS",
      subRegime: "IS-EPRIVACY",
      dataLastUpdated: "2026-09-01",
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
