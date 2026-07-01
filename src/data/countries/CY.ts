import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Cyprus: GDPR as implemented by Law 125(I)/2018 (Protection of Natural
// Persons with regard to the Processing of Personal Data) + ePrivacy as
// transposed in Law 112(I)/2004 on the Regulation of Electronic
// Communications and Postal Services (Article 106 — unsolicited
// communications). Regulator: Office of the Commissioner for Personal
// Data Protection (dataprotection.gov.cy).
export const CY: CountryData = {
  code: "CY",
  regime: "GDPR",
  defaults: {
    canCollectForMarketing: true,
    // Law 112(I)/2004 Art. 106(1): unsolicited communications by email/SMS
    // for direct marketing require prior consent of the subscriber.
    // https://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/all/F8E24EF6CA0C9D4DC2257AF6003D33E2
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    // Soft opt-in carve-out: Law 112(I)/2004 Art. 106(2) mirrors ePrivacy
    // Art. 13(2) — own customer, similar products/services, opt-out at
    // collection and in every message.
    // https://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/all/F8E24EF6CA0C9D4DC2257AF6003D33E2
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    // Verified 2026-07-01 against cylaw.org primary text: Law 112(I)/2004
    // Art. 106(5) states "Τα εδάφια (1) και (3) ισχύουν για τους συνδρομητές
    // που είναι φυσικά πρόσωπα" — subsections (1) and (3) apply only to
    // natural-person subscribers; legal-person subscribers are protected
    // via the 2005 Order on Legal Persons (Autoclitic Communications).
    // Practically, function-address B2B mail to a legal person's mailbox
    // is not caught by the Art. 106(1) prior-consent rule.
    // http://www.cylaw.org/nomoi/enop/non-ind/2004_1_112/full.html
    b2bExemption: {
      regime: "function-address",
      conditions: [
        "Law 112(I)/2004 Art. 106(5): subsections (1) and (3) apply only to natural-person subscribers",
        "Legal-person subscribers covered by 2005 Order on Legal Persons (Autoclitic Communications)",
      ],
    },
    // Greek is the working language of the Commissioner; consent text
    // shown to Greek-speaking residents should be in Greek (GDPR Art. 7(2)
    // intelligibility + Commissioner guidance).
    consentLanguage: { required: ["el"], mustMatchUserLocale: true },
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
    // Verified 2026-07-01: Law 125(I)/2018 Art. 8(1) (not Art. 7) —
    // "εάν το παιδί είναι τουλάχιστον δεκατεσσάρων (14) ετών". Child
    // age of consent for information society services is 14 (Cyprus
    // exercised the GDPR Art. 8 derogation downward from 16).
    // http://www.cylaw.org/nomoi/enop/non-ind/2018_1_125/full.html
    childAgeOfConsent: 14,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Regulation (EU) 2016/679 (GDPR) + Law 125(I)/2018 (Protection of Natural Persons with regard to the Processing of Personal Data) + Law 112(I)/2004 on the Regulation of Electronic Communications and Postal Services, Art. 106",
      url: "https://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/index_en/index_en?opendocument",
      jurisdiction: "CY",
      subRegime: "CY-EPRIVACY",
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
