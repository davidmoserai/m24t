import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Qatar Law No. 13 of 2016 on Personal Data Privacy Protection (PDPPL).
// Regulator: Competent Department at the Ministry of Transport &
// Communications (per Arts. 1, 7, 26); day-to-day supervision has
// migrated to the National Cyber Security Agency (NCSA). Art. 4 makes
// individual consent the basis for processing personal data (unless a
// Lawful Purpose applies); Art. 5 gives the individual the right to
// withdraw. Art. 22 governs direct marketing — the transmission of
// any electronic communication for direct marketing is forbidden
// except after prior consent, and every message must include the
// originator's identity plus a valid address for opt-out. Art. 17
// requires explicit consent from the child's guardian on child-
// directed websites; Art. 16 classifies children's data as personal
// data of a special nature. The law applies to natural persons
// (Art. 1 definition of "Individual"); no formal B2B carve-out.
// Arabic is the official language of Qatar and is generally required
// for legally effective consumer-facing notices, but note that
// PDPPL itself does not spell out a language rule for consent.
export const QA: CountryData = {
  code: "QA",
  regime: "QA-PDPL",
  defaults: {
    canCollectForMarketing: true,
    // Art. 4: consent is the lawful basis. Art. 22: transmission of any
    // electronic communication for direct marketing is forbidden except
    // after prior consent (express opt-in is the statutory floor).
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    // Art. 22 requires every direct-marketing electronic communication
    // to include a valid address through which the individual can send
    // a request to stop such communications or revoke consent.
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
      // Art. 16 classes children's data (alongside health, ethnic
      // origin, religion, marital status, criminal offences) as data
      // of a special nature — processing requires Competent Department
      // permission. Art. 17 imposes explicit-parental-consent rules on
      // websites addressing children.
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      // Art. 22 — every direct-marketing electronic communication must
      // include the identity of the originator and a valid address for
      // opt-out. The statute does not specify a *physical* address;
      // the "valid address" is best read as any contact address that
      // an individual can effectively use to revoke consent.
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Art. 17 — websites addressing children must obtain explicit
    // consent from the guardian. PDPPL does not define "child" or
    // set a statutory digital-consent age; default to 18 (age of
    // majority in Qatar) for marketing purposes.
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Qatar Law No. 13 of 2016 on Personal Data Privacy Protection (PDPPL), Arts. 4 (consent), 5 (withdrawal), 16-17 (children / special data), 22 (direct marketing)",
      url: "https://www.almeezan.qa/LawView.aspx?opt=&LawID=7121&language=en",
      jurisdiction: "QA",
      subRegime: "QA-PDPL",
      dataLastUpdated: "2026-09-01",
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
    // requires prior consent regardless of prior relationship.
  },
}
