import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Lithuania: GDPR + Law on Electronic Communications (LRES, Lietuvos
// Respublikos elektroninių ryšių įstatymas) implementing ePrivacy
// Directive 2002/58/EC + Law on Legal Protection of Personal Data
// (Asmens duomenų teisinės apsaugos įstatymas, ADTAĮ).
// Regulator: Valstybinė duomenų apsaugos inspekcija (VDAI / SDPI).
//
// LRES Article 68 (Tiesioginė rinkodara) governs unsolicited
// communications: marketing email requires PRIOR EXPRESS consent of
// the subscriber (opt-in). A narrow soft opt-in carve-out under Art.
// 68(2) applies where the sender obtained the contact in the context
// of a sale of its own similar goods/services and the recipient was
// given a clear, free opt-out at collection and in every subsequent
// message. Art. 68(3) prohibits hiding sender identity or omitting a
// valid opt-out address.
//
// LRES Article 68 makes NO distinction between natural and legal
// persons for direct marketing by email — both require prior consent
// (Lithuania transposed ePrivacy without the optional B2B carve-out).
// Generic role addresses of legal persons are treated lighter in VDAI
// guidance, hence "function-address" tag with strict conditions.
//
// Child age of consent under ADTAĮ Art. 6: 14 years (Lithuania used
// the GDPR Art. 8(1) Member-State derogation to lower from 16).
// Article 6 verified 2026-07-01 against current consolidated redaction.
export const LT: CountryData = {
  code: "LT",
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
      regime: "function-address",
      conditions: [
        "LRES Art. 68 applies to natural AND legal persons — no general B2B exemption",
        "Generic role addresses (info@, sales@) of legal persons treated lighter per VDAI guidance",
        "Sender must offer free opt-out in every message regardless",
      ],
    },
    consentLanguage: {
      // VDAI requires consent be in a language the data subject
      // understands; Lithuanian is mandatory for residents in
      // consumer-facing contexts under the State Language Law.
      required: ["lt"],
      mustMatchUserLocale: true,
    },
    dataResidency: { storageRegion: "eu", crossBorderTransferMechanism: "scc" },
    consentRecordRetentionMonths: 36,
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
    // ADTAĮ Art. 6 sets the GDPR Art. 8 information-society-services
    // age of consent at 14 (Lithuania exercised the Member-State option).
    // Verified 2026-07-01 against primary source (e-seimas.lrs.lt).
    childAgeOfConsent: 14,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Art. 68 (Tiesioginė rinkodara) in the current consolidated
      // redaction of LRES (TAIS.232036 on e-seimas.lrs.lt) — earlier
      // maintainer note cited "Art. 81" which is the pre-2021 numbering
      // superseded by the 1 Dec 2021 recast. Corrected 2026-07-01.
      statute: "Law on Electronic Communications of the Republic of Lithuania (LRES) Art. 68 + Law on Legal Protection of Personal Data (ADTAĮ) Art. 6 + Regulation (EU) 2016/679 (GDPR)",
      url: "https://e-seimas.lrs.lt/portal/legalAct/lt/TAD/TAIS.232036",
      jurisdiction: "LT",
      subRegime: "LT-EPRIVACY",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { bundlingAllowed: false, prechecking: "forbidden" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    "existing-customer": {
      // LRES Art. 68(2) soft opt-in: own similar goods/services,
      // contact obtained in context of sale, free opt-out at collection
      // and in every subsequent message.
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
      suggestedTemplate: "single-opt-in",
    },
  },
}
