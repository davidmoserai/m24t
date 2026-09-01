import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Finland: GDPR + Act on Electronic Communications Services (Laki
// sähköisen viestinnän palveluista 917/2014, renamed from
// "Tietoyhteiskuntakaari" by Act 68/2018 effective 1 June 2018) §200 —
// ePrivacy transposition for direct marketing — + Data Protection Act
// (Tietosuojalaki 1050/2018). Regulator: Tietosuojavaltuutettu (Data
// Protection Ombudsman, tietosuoja.fi) supervises §200 and §202-204;
// Traficom supervises other electronic-communications matters. §200(1):
// direct marketing by automated calling, fax, email, SMS, voice/audio
// /picture messages to natural persons requires PRIOR CONSENT. §200(3):
// existing-customer soft opt-in for "same product group / otherwise
// similar products" with clear opt-out at collection and in every
// message. §202(1): direct marketing to LEGAL PERSONS (yhteisölle) is
// OPT-OUT (permitted unless the recipient has refused), which makes
// Finland one of the EU MS with a lighter B2B regime. §203: marketing
// must be clearly and unambiguously recognisable as marketing on
// receipt. Tietosuojalaki §5 sets the child age of consent for
// information-society services at 13.
export const FI: CountryData = {
  code: "FI",
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
      // Act on Electronic Communications Services §202(1): direct
      // marketing to legal persons (yhteisölle) is permitted unless
      // the recipient has separately refused it — opt-out, not opt-in.
      // Named natural-person addresses at a company still fall under
      // §200(1) consent per the Data Protection Ombudsman's practice;
      // generic role addresses (info@, sales@) are treated as
      // legal-person addresses.
      regime: "function-address",
      conditions: [
        "Act on Electronic Communications Services §202(1) — marketing to legal persons (yhteisölle) is opt-out",
        "named natural-person addresses at a company (firstname.lastname@co.fi) still require §200(1) consent",
        "§202(2) — every message must offer a free, easy opt-out mechanism",
        "§203 — sender identity and marketing nature must be clearly and unambiguously recognisable on receipt",
      ],
    },
    consentLanguage: {
      // Finland is officially bilingual; consent wording must be
      // intelligible to the data subject. Locale-matching not statutorily
      // mandated for marketing consent but expected by the Ombudsman where
      // the service is offered in FI/SV.
      required: [],
      mustMatchUserLocale: true,
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
      // Act on Electronic Communications Services §203: marketing email
      // /SMS/voice/audio/picture message covered by §200 and §202 must
      // be clearly and unambiguously recognisable as marketing on
      // receipt (sender identity and marketing nature recognisable
      // without opening the message).
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Tietosuojalaki §5: child age of consent for information-society
    // services lowered to 13 (Finland used the GDPR Art. 8 floor).
    childAgeOfConsent: 13,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "GDPR (EU 2016/679) + Act on Electronic Communications Services (Laki sähköisen viestinnän palveluista 917/2014; renamed from Tietoyhteiskuntakaari by Act 68/2018 in force 1 June 2018) §200, §202, §203 + Data Protection Act (Tietosuojalaki 1050/2018) §5",
      url: "https://tietosuoja.fi/en/faq-direct-marketing",
      jurisdiction: "FI",
      subRegime: "FI-ECS",
      dataLastUpdated: "2026-09-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { bundlingAllowed: false, checkboxRequired: true },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    // Act on Electronic Communications Services §200(3): existing
    // customer soft opt-in for own "same product group / otherwise
    // similar" products/services. Address must have been obtained in
    // the context of a sale, opt-out must be offered at collection AND
    // in every subsequent message.
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
      suggestedTemplate: "single-opt-in",
    },
    // Act on Electronic Communications Services §202(1): legal-person
    // recipients — opt-out regime.
    "b2b-cold": {
      optIn: "single",
      checkboxRequired: false,
      suggestedTemplate: "single-opt-in",
    },
    "publicly-listed-business": {
      optIn: "single",
      checkboxRequired: false,
      suggestedTemplate: "single-opt-in",
    },
  },
}
