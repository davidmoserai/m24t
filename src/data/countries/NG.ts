import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Nigeria Data Protection Act 2023 (NDPA) + General Application and
// Implementation Directive 2025 (GAID). Regulator: Nigeria Data Protection
// Commission (NDPC, ndpc.gov.ng).
//
// NDPA s. 25(1)(a) makes consent a lawful basis; s. 26 defines the standard:
// consent must be "freely given, specific, informed, and unambiguous"
// (s. 26; also see s. 65 interpretation of "consent"), given by written,
// oral or affirmative electronic act, and NOT pre-ticked (s. 26(7)(a)).
// Silence/inactivity is not consent (s. 26(3)). GAID Article 18 lists
// direct marketing as a consent-required activity — pre-ticked boxes,
// silence, or bundled consent are invalid.
// NDPA s. 36(3)-(4): where personal data is processed for direct marketing,
// the data subject has the right to object at any time, and on objection
// the data shall no longer be processed for those purposes — this is the
// unconditional direct-marketing carve-out to the general s. 36(2) right
// to object. Opt-out must be available at every contact.
// NDPA s. 31 requires parental/guardian consent where the data subject is
// a "child". Per s. 65 (interpretation), "child" has the meaning ascribed
// in the Child's Rights Act No. 26, 2003 — i.e. a person under 18. This
// raises the threshold from the previous NDPR 2019 (which used 13). NDPA
// s. 31(5) reserves power for the Commission to make regulations for
// children 13+ using e-services at the child's specific request, but no
// such regulations have been issued in the GAID (March 2025) — so the
// under-18 threshold applies uniformly to direct marketing today.
// NDPA covers natural persons only — pure B2B (role-based corporate
// addresses, no identifiable individual) sits outside scope, but most
// named-person business emails remain in scope.
// Soft opt-in is NOT codified in NDPA/GAID; legitimate interest under
// s. 25(1)(b)(v) could in principle support marketing to existing customers
// after a s. 26 balancing exercise, but NDPC has not blessed a UK-style
// PECR soft opt-in regime, so we do not enable it.
export const NG: CountryData = {
  code: "NG",
  regime: "NDPA",
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
      regime: "none",
      conditions: [
        "NDPA applies to all natural persons; no general B2B carve-out for named-individual business addresses",
      ],
    },
    consentLanguage: { required: ["en"], mustMatchUserLocale: false },
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
    // NDPA s. 31 + s. 65: "child" = under 18 (Child's Rights Act No. 26,
    // 2003); parental/guardian consent required. No 13+ e-services
    // carve-out has been issued under s. 31(5), so under-18 applies
    // uniformly to direct marketing.
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Nigeria Data Protection Act 2023 (NDPA) ss. 25, 26, 31, 36, 65 + NDPC General Application and Implementation Directive 2025 (GAID), Arts. 16-18",
      url: "https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf",
      jurisdiction: "NG",
      subRegime: "NG-NDPA",
      // Verified 2026-07-01 against NDPA text (ss. 25/26/31/36/65) and
      // GAID 2025. Section attributions corrected: consent standard is
      // s. 26 (not s. 25); s. 25 is the lawful-basis menu. Direct-marketing
      // objection is s. 36(3)-(4). Child = under 18 via s. 65 → CRA 2003.
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
      // NDPA s. 36(3)-(4) right to object to direct marketing applies
      // regardless of relationship; no codified soft opt-in, so existing
      // customers still need s. 26 express consent for marketing.
      softOptInAvailable: false,
      softOptInScope: "none",
    },
  },
}
