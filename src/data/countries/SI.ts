import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Slovenia: GDPR + Electronic Communications Act (ZEKom-2, in force
// 10 Nov 2022) + Personal Data Protection Act (ZVOP-2, in force
// 26 Jan 2023). Regulator: Informacijski pooblaščenec (IP RS).
//
// ZEKom-2 Art. 226 transposes ePrivacy Art. 13: unsolicited
// electronic mail for direct marketing requires PRIOR EXPRESS consent
// of the subscriber (natural OR legal person — Slovenia did NOT use
// the Member State option to limit Art. 13(5) to naturals, so the
// consent requirement covers B2B as well). A narrow soft opt-in
// carve-out exists where the address was obtained in the context of
// a sale of own similar products/services and the customer was given
// a free, easy refusal option at the time of collection and in every
// message.
//
// ZVOP-2 Art. 8 sets the child age of consent for information society
// services at 15 (Slovenia exercised the GDPR Art. 8 derogation
// downward from 16). Verified 2026-07-01 against Uradni list RS
// št. 163/2022 — Art. 8 (privolitev otroka za uporabo storitev
// informacijske družbe): "je veljavna, če je otrok star 15 let ali več".
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
      // CORRECTION 2026-07-01: verified against Uradni list RS
      // št. 130/2022 (ZEKom-2 gazette text). Art. 226(4) reads
      // "Prvi in tretji odstavek tega člena se uporabljata za
      // naročnike, ki so fizične osebe." — paragraphs 1 (consent)
      // and 3 (other electronic direct marketing) apply ONLY to
      // subscribers who are natural persons. Art. 226(6) further
      // permits use of a natural person's email address where the
      // legal person has publicly published it as its contact
      // address ("javno objavi kot svoj kontaktni elektronski
      // naslov"). Together this maps to `publicly-disclosed`:
      // legal-person addressees fall outside the consent gate, and
      // publicly listed business contact addresses are usable.
      // GDPR still applies to any personal data of natural persons
      // behind role addresses (info@, sales@).
      regime: "publicly-disclosed",
      conditions: [
        "ZEKom-2 Art. 226(4) limits paragraphs 1 and 3 (consent requirement) to subscribers who are natural persons",
        "ZEKom-2 Art. 226(6) permits use of a natural person's email address where a legal person has publicly published it as its contact address",
        "GDPR still governs any personal data of natural persons behind role addresses (info@, sales@); IP RS treats these cautiously",
        "Soft opt-in under Art. 226(2) still requires similar-products limitation and free/easy refusal offered at collection and in every message",
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
    // (Corrected 2026-07-01: earlier citation to Art. 7 was wrong.)
    childAgeOfConsent: 15,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Zakon o elektronskih komunikacijah (ZEKom-2) Art. 226 + Zakon o varstvu osebnih podatkov (ZVOP-2) Art. 8 + Regulation (EU) 2016/679 (GDPR)",
      url: "https://www.ip-rs.si/varstvo-osebnih-podatkov/pravice-posameznika/neposredno-trzenje",
      jurisdiction: "SI",
      subRegime: "SI-ZEKom",
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
    // ZEKom-2 Art. 226(3) soft opt-in: own similar products/services,
    // address obtained at point of sale, easy free refusal offered
    // at collection and in every subsequent message.
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
