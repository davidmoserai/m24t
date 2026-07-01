import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// PDPA 2012 + Spam Control Act 2007. Hybrid regime — PDPA is consent-
// based for personal data; Spam Control Act is opt-out for bulk UCE
// with header/unsubscribe rules. PDPA s.15A "deemed consent by
// notification" introduced 2021. Fines up to SGD 1M.
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
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: null,
    childAgeOfConsent: 13,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "source", "wording"],
    basis: {
      // Verified 2026-07-01 against SSO 2020 Revised Edition (in force 31 Dec 2021,
      // current as of 1 Jul 2026). PDPA §§14 (Provision of consent), 15 (Deemed
      // consent), 15A (Deemed consent by notification — inserted by Act 40/2020,
      // in force 1 Feb 2021). Legitimate interests exception is in First Schedule
      // Part 3 (not §15A). Do Not Call Registry is Part 9 (renumbered from Part
      // IX in 2020 RevEd); §37 defines "specified message". Spam Control Act 2007
      // §11 requires bulk UCE senders to comply with Second Schedule (unsubscribe
      // facility, sender identification, header labelling). "Cap. 311A" citation
      // dropped — the 2020 RevEd no longer uses Chapter numbers.
      statute: "Personal Data Protection Act 2012 (Act 26 of 2012, 2020 Revised Edition; §§14, 15, 15A) + Spam Control Act 2007 (Act 21 of 2007, 2020 Revised Edition; §11, Second Schedule) + Do Not Call Registry (PDPA Part 9, §37)",
      url: "https://sso.agc.gov.sg/Act/PDPA2012",
      jurisdiction: "SG",
      subRegime: "PDPA-DNC",
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
  },
}
