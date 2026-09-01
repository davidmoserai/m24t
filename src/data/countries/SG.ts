import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// PDPA 2012 + Spam Control Act 2007. Hybrid regime — PDPA is consent-
// based for personal data (s.13); Spam Control Act is opt-out for bulk
// UCE with header/unsubscribe rules. PDPA s.15A "deemed consent by
// notification" and s.15(3)-(8) "deemed consent by contractual
// necessity" both introduced by Act 40/2020, in force 1 Feb 2021.
// Fines up to SGD 1M.
// 2026-09-01 verified: SCA 2007 Second Schedule para 3(1) requires
// only non-misleading subject/header + <ADV> label + accurate contact
// email or telephone; a postal address is NOT required (postal is
// merely one permitted unsubscribe destination under para 2(1)(a)).
export const SG: CountryData = {
  code: "SG",
  regime: "PDPA",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: false,
    bundlingAllowed: true,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "any",
    softOptInAvailable: true,
    softOptInScope: "any",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      regime: "none",
      conditions: [
        "Spam Control Act applies to bulk UCE regardless of B2B/B2C",
        "PDPA s.4(5) partial exclusion for business-contact data used for business purposes",
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
      // SCA 2007 Second Schedule para 3(1)(d) requires only "an
      // accurate and functional email address or telephone number by
      // which the sender can be readily contacted" — not a postal
      // address. Postal is one of several permitted unsubscribe
      // destinations under para 2(1)(a) but is not mandated for
      // sender identity.
      physicalAddressRequired: false,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: null,
    childAgeOfConsent: 13,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "source", "wording"],
    basis: {
      statute: "Personal Data Protection Act 2012 (Act No. 26 of 2012) + Spam Control Act 2007 (Cap. 311A) + Do Not Call Registry (PDPA Part IX)",
      url: "https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/advisoryguidelinesonrequiringconsentformarketing8may2015.pdf",
      jurisdiction: "SG",
      subRegime: "PDPA-DNC",
      dataLastUpdated: "2026-09-01",
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
  },
}
