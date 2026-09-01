import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Malta: GDPR (Reg. (EU) 2016/679) + Processing of Personal Data
// (Electronic Communications Sector) Regulations, S.L. 586.01
// (transposing ePrivacy Directive 2002/58/EC) + Data Protection Act
// (Cap. 586). Regulator: Information and Data Protection Commissioner
// (IDPC). S.L. 586.01 reg. 9(1) requires PRIOR CONSENT IN WRITING for
// unsolicited electronic mail for direct marketing (opt-in) and, in
// the same sub-regulation, extends that prohibition to a subscriber
// or user "irrespective of whether such subscriber or user is a
// natural person or legal person" — so no B2B exemption. Soft opt-in
// carve-out at reg. 9(2) for own similar products/services from
// existing customers, with clear opt-out at collection and in every
// message. Child digital-services age set to 13 by S.L. 586.11 reg. 4
// (issued under Cap. 586; Malta opted for the GDPR Art. 8 floor).
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
      // S.L. 586.01 reg. 9(1) extends opt-in protection to legal
      // persons (subscribers that are not natural persons) —
      // "irrespective of whether such subscriber or user is a natural
      // person or legal person". Malta is one of the EU MS that did
      // NOT carve out B2B from ePrivacy direct-marketing rules.
      regime: "none",
      conditions: [
        "S.L. 586.01 reg. 9(1) extends prior-consent-in-writing rule to legal persons",
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
    // S.L. 586.11 reg. 4 (issued under Cap. 586) — "The processing of
    // personal data of a child in relation to information society
    // services shall be lawful where the child is thirteen years of
    // age." Malta opted for the GDPR Art. 8 floor and did not raise it.
    childAgeOfConsent: 13,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute:
        "GDPR (Reg. (EU) 2016/679) + Processing of Personal Data (Electronic Communications Sector) Regulations, S.L. 586.01 reg. 9 + Data Protection Act (Cap. 586) + Processing of Child's Personal Data in Relation to the Offer of Information Society Services Regulations, S.L. 586.11 reg. 4",
      url: "https://legislation.mt/eli/sl/586.01/eng",
      jurisdiction: "MT",
      subRegime: "MT-EPRIVACY",
      dataLastUpdated: "2026-09-01",
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
