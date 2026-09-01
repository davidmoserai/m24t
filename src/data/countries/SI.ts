import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Slovenia: GDPR + Electronic Communications Act (ZEKom-2, UL RS
// 130/2022 of 11 Oct 2022) + Personal Data Protection Act (ZVOP-2,
// UL RS 163/2022 of 27 Dec 2022, in force 26 Jan 2023). Regulator:
// Informacijski pooblaščenec (IP RS); AKOS also enforces ZEKom-2
// Art. 226.
//
// ZEKom-2 Art. 226 ("neželena komunikacija") transposes ePrivacy
// Art. 13: unsolicited electronic mail for direct marketing requires
// the subscriber's or user's PRIOR consent (para 1). Para 2 provides
// a narrow soft opt-in: own similar products/services, address
// obtained from a customer of the sender, with a clear, free, easy
// refusal option at collection and in every subsequent message.
// Crucially, para 4 states "Prvi in tretji odstavek tega člena se
// uporabljata za naročnike, ki so fizične osebe" — paragraphs 1 and
// 3 apply ONLY to subscribers who are natural persons. Legal-person
// subscribers therefore fall outside the ZEKom-2 consent rule and
// are governed by GDPR alone (LIA + Art. 21 right to object). Para 6
// separately allows use of a legal person's publicly published
// contact email.
//
// ZVOP-2 Art. 8 sets the child age of consent for information society
// services at 15 (Slovenia exercised the GDPR Art. 8 derogation
// downward from 16).
export const SI: CountryData = {
  code: "SI",
  regime: "GDPR",
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
      // ZEKom-2 Art. 226(4) expressly limits the consent rule in
      // paragraphs 1 and 3 to subscribers who are natural persons.
      // For legal-person subscribers, ZEKom-2 does not impose
      // consent; GDPR (legitimate interest + Art. 21 right to object)
      // governs. Para 6 additionally permits use of a legal person's
      // publicly published contact email.
      regime: "gdpr-lia",
      conditions: [
        "ZEKom-2 Art. 226(4) limits the para 1/3 consent requirement to natural-person subscribers",
        "Legal-person subscribers governed by GDPR only (LIA + Art. 21 objection right)",
        "ZEKom-2 Art. 226(6) permits use of a legal person's publicly published contact email",
        "Generic role addresses (info@, sales@) still require a lawful basis under GDPR",
      ],
    },
    consentLanguage: { required: ["sl"], mustMatchUserLocale: true },
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
    // ZVOP-2 Art. 8 — Slovenia set the GDPR Art. 8 child age at 15.
    childAgeOfConsent: 15,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Zakon o elektronskih komunikacijah (ZEKom-2) 226. člen (UL RS 130/2022) + Zakon o varstvu osebnih podatkov (ZVOP-2) 8. člen (UL RS 163/2022) + Regulation (EU) 2016/679 (GDPR)",
      url: "https://www.ip-rs.si/varstvo-osebnih-podatkov/pravice-posameznika/neposredno-trzenje",
      jurisdiction: "SI",
      subRegime: "SI-ZEKom",
      dataLastUpdated: "2026-09-01",
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
    // ZEKom-2 Art. 226(2) soft opt-in: own similar products/services,
    // address obtained from the sender's own customer, easy free
    // refusal offered at collection and in every subsequent message.
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
