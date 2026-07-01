import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Philippines Data Privacy Act of 2012 (Republic Act No. 10173, "DPA")
// and its Implementing Rules and Regulations (IRR), enforced by the
// National Privacy Commission (NPC). DPA s. 12 lists lawful bases for
// processing personal information; consent (s. 12(a)) means "freely
// given, specific, informed indication of will" evidenced by written,
// electronic or recorded means (s. 3(b)). NPC Circular 2023-04
// (Guidelines on Consent) s. 14 clarifies direct marketing: where the
// processing is limited to personal information (not sensitive PI),
// a PIC MAY rely on legitimate interest (s. 12(f)) after conducting
// an LIA; otherwise consent is required. This library takes the
// conservative express-consent path because NPC decisions (e.g. cases
// against lending apps) have penalised marketing where no LIA was
// documented and rights/freedoms were affected. Direct marketing must
// stop on unsubscribe (Circular 2023-04 s. 21(E)(1)) — no continued
// processing on other lawful bases for direct marketing purposes.
// The DPA protects natural persons — purely legal-person contact data
// is outside scope (s. 3(g)), but care is needed where role addresses
// identify a natural person. A "child" is a person below 18 per NPC
// Advisory 2024-03 (Guidelines on Child-Oriented Transparency),
// citing RA 7610 s. 3(a). Penalties under ss. 25–34 include
// imprisonment and fines up to PHP 5,000,000.
// Verified against primary NPC sources 2026-07-01.
export const PH: CountryData = {
  code: "PH",
  regime: "PH-DPA",
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
        "DPA covers personal information of natural persons; data identifying only a juridical/legal person is outside scope (RA 10173 s. 3(g))",
        "Role-based addresses that still identify an identifiable individual remain personal information",
      ],
    },
    consentLanguage: { required: ["en", "fil"], mustMatchUserLocale: false },
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "scc" },
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
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Primary sources: DPA (RA 10173) s. 3(b) consent, s. 12(a)/(f)
      // bases, s. 13 SPI; NPC Circular 2023-04 (Guidelines on Consent,
      // 07 Nov 2023) esp. s. 14 (Direct Marketing) and s. 21(E)
      // (withdrawal); NPC Advisory 2024-03 (Child-Oriented
      // Transparency, 17 Dec 2024) confirming child = under 18.
      statute: "Republic Act No. 10173 (Data Privacy Act of 2012) and its IRR; NPC Circular No. 2023-04 (Guidelines on Consent); NPC Advisory No. 2024-03 (Guidelines on Child-Oriented Transparency)",
      url: "https://privacy.gov.ph/data-privacy-act/",
      jurisdiction: "PH",
      subRegime: "PH-DPA",
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
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
