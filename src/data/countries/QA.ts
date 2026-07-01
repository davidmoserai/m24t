import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Qatar Law No. 13 of 2016 on Personal Data Privacy Protection (PDPPL).
// Regulator: National Cyber Security Agency (NCSA) — National Cyber
// Governance and Assurance Affairs (assurance.ncsa.gov.qa). Art. 4
// establishes consent as the basis for processing personal data (Art. 5
// confers withdrawal / objection rights); Art. 22 governs direct
// marketing — requires explicit prior consent, sender identification,
// indication that the message is for direct marketing, and a valid
// address the individual can use to stop the messages or withdraw
// consent. Art. 16 classifies children's data as special-nature data
// requiring a processing permit; Art. 17 requires explicit consent
// from the child's guardian for websites directed at children. The law
// applies to natural persons (no formal B2B carve-out). Arabic is the
// official language of Qatar and is required for legally effective
// consumer-facing notices. Verified 2026-07-01 against the official
// Arabic text published by NCSA (assurance.ncsa.gov.qa PDF).
export const QA: CountryData = {
  code: "QA",
  regime: "QA-PDPL",
  defaults: {
    canCollectForMarketing: true,
    // Art. 4: consent is the lawful basis. Art. 22: direct marketing
    // requires express prior consent (single opt-in is the statutory floor).
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    // Art. 22 mandates an effective opt-out mechanism (a valid contact
    // address the individual can use to stop messages) in every message.
    unsubscribeMechanism: "one-click",
    // PDPPL provides no soft opt-in / existing-customer exemption.
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      // PDPPL protects natural persons; corporate addresses fall outside
      // scope, but any identifiable individual at a business is covered.
      regime: "none",
      conditions: [
        "PDPPL applies to personal data of natural persons; no formal B2B exemption for individuals at corporate addresses",
      ],
    },
    // Arabic is the official language of Qatar; consumer-facing consent
    // notices must be available in Arabic to be considered informed.
    consentLanguage: { required: ["ar"], mustMatchUserLocale: true },
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "explicit-consent" },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      // Art. 16 classifies children's data (and health, religious beliefs,
      // etc.) as special-nature personal data requiring a permit; Art. 17
      // requires explicit guardian consent for websites directed at
      // children. Political marketing is treated cautiously by convention
      // (no explicit statutory bar in Law 13/2016, but Art. 16 permits
      // the Minister to add further sensitive categories by decision).
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      // Art. 22 — the electronic communication must include the sender's
      // identity, indicate that it is sent for direct marketing purposes,
      // and carry a valid contact address for opt-out / consent withdrawal.
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Art. 17 — websites directed at children must obtain explicit
    // guardian consent. PDPPL does not set a numeric digital-consent
    // age; default to 18 (Qatar's general age of majority) for
    // marketing purposes.
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Direct marketing = Art. 22 (chapter six of the law: "electronic
      // communications for direct marketing purposes"). Art. 18 in this
      // law is the exemption clause (national security etc.), NOT direct
      // marketing — this citation was corrected on 2026-07-01 against
      // the official Arabic NCSA PDF.
      statute: "Qatar Law No. 13 of 2016 on Personal Data Privacy Protection (PDPPL), Arts. 4, 5, 16, 17, 22",
      url: "https://www.almeezan.qa/LawView.aspx?opt=&LawID=7121&language=ar",
      jurisdiction: "QA",
      subRegime: "QA-PDPL",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: false,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { canCollectForMarketing: false, optIn: "blocked", suggestedTemplate: "blocked" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    // PDPPL provides no soft opt-in for existing customers — Art. 22
    // requires explicit prior consent regardless of prior relationship.
  },
}
