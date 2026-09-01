import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Spam Act 2003 (Cth) ss. 16-18 + Schedule 2 (consent: express OR inferred);
// Privacy Act 1988 (as amended by Privacy and Other Legislation Amendment
// Act 2024, Royal Assent 10 Dec 2024) APP 7 (direct marketing). APP 7
// "does not apply to the extent" the Spam Act applies (OAIC APP 7 ch. 7).
// Functional unsubscribe (s. 18) and sender ID (s. 17) required in every
// commercial electronic message. B2B: Schedule 2 clause 4 deems consent
// for messages sent to a conspicuously published work-related electronic
// address of an employee/director/officer/etc., provided the message
// relates to that person's work role and the publication is not
// accompanied by a "no unsolicited messages" statement (mapped to the
// `publicly-disclosed` regime, per Spam Act 2003 Sch. 2 cl. 4).
// Children's Online Privacy Code (mandated by 2024 Amendment) in
// exposure draft as of 2026-09-01 — must be registered by 10 Dec 2026;
// not yet in force. Sources verified 2026-09-01:
//   https://www.legislation.gov.au/C2004A01214/latest (Spam Act 2003)
//   https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-7-app-7-direct-marketing
//   https://www.oaic.gov.au/privacy/privacy-registers/privacy-codes/childrens-online-privacy-code
//   https://www.legislation.gov.au/C2024A00128/asmade
export const AU: CountryData = {
  code: "AU",
  regime: "Spam-Act-2003",
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
    // b2bExemption: publicly-disclosed per https://www.legislation.gov.au/C2004A01214/latest
    // (Spam Act 2003 Sch. 2 cl. 4 — inferred consent for conspicuously
    // published work-related electronic addresses of employees, directors,
    // officers, partners, office-holders and self-employed individuals,
    // limited to messages relevant to that person's work role).
    b2bExemption: {
      regime: "publicly-disclosed",
      conditions: [
        "address must be conspicuously published (Spam Act 2003 Sch. 2 cl. 4(2)(b))",
        "address must belong to an employee, director, officer, partner, office-holder or self-employed individual (Sch. 2 cl. 4(2)(a))",
        "publication must not carry a 'no unsolicited messages' statement (Sch. 2 cl. 4(2)(d))",
        "message must be relevant to the work-related business, functions or duties of the recipient (Sch. 2 cl. 4(2)(e)-(g))",
        "sender identification (s. 17) and functional unsubscribe (s. 18) still apply",
      ],
    },
    consentLanguage: { required: [], mustMatchUserLocale: false },
    dataResidency: {
      storageRegion: "any",
      crossBorderTransferMechanism: "none-required",
    },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: false,
      childrenBlocked: true,
    },
    preferenceCenter: {
      granularityRequired: "channel",
      perEmailUnsubAlsoRequired: true,
    },
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: null,
    childAgeOfConsent: 15,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "source", "wording"],
    basis: {
      statute:
        "Spam Act 2003 (Cth) + Privacy Act 1988 (as amended by Privacy and Other Legislation Amendment Act 2024)",
      url: "https://www.acma.gov.au/avoid-sending-spam",
      jurisdiction: "AU",
      subRegime: null,
      dataLastUpdated: "2026-09-01",
      confidence: "medium",
      extraterritorialReach: false,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    transactional: {
      proofRequired: [],
    },
  },
  byRelationship: {
    "existing-customer": {
      // Spam Act 2003 §16 + ACMA "Avoid sending spam" guidance: inferred
      // consent for existing business relationships. Express consent not
      // required, but functional unsubscribe still mandatory in every
      // message.
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
    },
  },
}
