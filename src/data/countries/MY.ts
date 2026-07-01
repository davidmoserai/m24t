import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Malaysia Personal Data Protection Act 2010 (Act 709) plus the
// Personal Data Protection (Amendment) Act 2024 (Act A1727,
// gazetted 17 Oct 2024). Amendment provisions were commenced in
// phases via P.U. (B) 522/2024: sections 7, 11, 13, 14 on
// 1 Jan 2025; sections 2, 3, 4, 5, 8, 10, 12 on 1 Apr 2025; and
// sections 6 (DPO/breach notification, new sections 12A/12B) and
// 9 (new section 43A data portability) on 1 Jun 2025 — so all
// substantive amendments are now in force. Regulator is the
// Department of Personal Data Protection (JPDP / PDP Department),
// pdp.gov.my. PDPA s. 6 requires consent for processing of personal
// data; s. 43 (unchanged by A1727) gives the data subject a standing
// right to require a data controller (renamed from "data user" by
// A1727 s. 2) to cease (or not begin) processing their personal
// data for direct marketing at any time by notice in writing.
// PDPA applies to processing in respect of commercial transactions,
// which includes B2B contexts. Consent must be capable of being
// recorded and maintained, but the Act does not mandate double-
// opt-in — a single affirmative act (ticked box, sign-up
// confirmation) is sufficient. Penalties under PDPA include
// criminal fines and imprisonment; 2024 amendments raised maximum
// penalties (s. 5 breach: up to RM1m / 3 yrs), introduced mandatory
// data breach notification (s. 12B, up to RM250k / 2 yrs) and Data
// Protection Officer requirements (s. 12A), and added biometric
// data as sensitive personal data (s. 4).
export const MY: CountryData = {
  code: "MY",
  regime: "PDPA",
  defaults: {
    canCollectForMarketing: true,
    // PDPA s. 6 — consent required for processing; s. 43 — opt-out
    // right always available. Single affirmative consent is sufficient
    // (no DOI mandate); affirmative tick or signup acceptance.
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    // s. 43 is a cessation right, not a soft opt-in. PDPA does not
    // provide a soft opt-in carve-out for existing customers.
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    // PDPA covers personal data processed in commercial transactions;
    // there is no separate B2B exemption — corporate contacts who are
    // identifiable individuals are protected the same way.
    b2bExemption: {
      regime: "none",
      conditions: [
        "PDPA applies to personal data in commercial transactions regardless of recipient type (B2B included)",
      ],
    },
    // Personal Data Protection Regulations 2013 require a notice in
    // both Bahasa Malaysia and English.
    consentLanguage: { required: ["ms", "en"], mustMatchUserLocale: false },
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
    // PDPA does not specify a digital age of consent. Common-law age
    // of majority in Malaysia is 18 (Age of Majority Act 1971). 2024
    // amendments did not introduce a specific child digital-consent
    // threshold; treat under-18 as requiring guardian consent.
    childAgeOfConsent: 18,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Personal Data Protection Act 2010 (Act 709) + Personal Data Protection (Amendment) Act 2024",
      url: "https://www.agc.gov.my/agcportal/uploads/files/Publications/LOM/EN/Act%20709%2014%206%202016.pdf",
      jurisdiction: "MY",
      subRegime: "MY-PDPA",
      // 2026-07-01: reverified against Act 709 text on lom.agc.gov.my
      // and A1727 gazette PDF on pdp.gov.my; confirmed all A1727
      // provisions in force per P.U. (B) 522/2024 (staggered
      // Jan/Apr/Jun 2025). s. 43 direct-marketing opt-out unchanged.
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: false,
      lawyerAttestation: null,
    },
    suggestedTemplate: "single-opt-in",
  },
  byContext: {
    "lead-magnet": { canCollectForMarketing: false, optIn: "blocked", suggestedTemplate: "blocked" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    "existing-customer": {
      // No statutory soft opt-in under PDPA, but s. 43 cessation right
      // remains; existing-customer marketing still requires consent.
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
