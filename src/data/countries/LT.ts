import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Lithuania: GDPR + Law on Electronic Communications (LRES, Lietuvos
// Respublikos elektroninių ryšių įstatymas, Nr. IX-2135) implementing
// ePrivacy Directive 2002/58/EC + Law on Legal Protection of Personal
// Data (Asmens duomenų teisinės apsaugos įstatymas, ADTAĮ).
// Regulator: Valstybinė duomenų apsaugos inspekcija (VDAI / SDPI).
//
// LRES Article 81 governs unsolicited communications: marketing email
// to NATURAL PERSONS requires PRIOR EXPRESS consent of the recipient
// (opt-in). A narrow soft opt-in carve-out applies where the sender
// obtained the contact in the context of a sale of its own similar
// goods/services and the recipient was given a clear, free opt-out at
// collection and in every subsequent message.
//
// April 2026 amendment (Law No. XV-815, adopted 2026-04-16, TAR
// 2026-04-21, effective 2026-07-01) relaxed the regime for direct
// marketing to LEGAL PERSONS (juridiniai asmenys): prior consent is no
// longer required for B2B email/SMS/calls to legal entities, provided
// each message carries a clear and free opt-out and withdrawals are
// honoured immediately with proof kept. Natural-person rules are
// unchanged (still opt-in). Hence b2bExemption is now tagged
// "can-spam-default" with LT-specific conditions.
//
// Child age of consent under ADTAĮ Art. 6(1): 14 years (Lithuania
// used the GDPR Art. 8(1) Member-State derogation to lower from 16).
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
      regime: "can-spam-default",
      conditions: [
        "LRES Art. 81 as amended by Law No. XV-815 (effective 2026-07-01) allows direct marketing to legal persons WITHOUT prior consent",
        "Each B2B message must carry a clear and free opt-out; withdrawal must be honoured immediately",
        "Proof of consent/withdrawal handling must be retained (VDAI guidance, 2026)",
        "Natural-person rules unchanged — Art. 81 still requires prior express consent for individuals",
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
    // ADTAĮ Art. 6(1) sets the GDPR Art. 8 information-society-services
    // age of consent at 14 (Lithuania exercised the Member-State option).
    childAgeOfConsent: 14,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Law on Electronic Communications of the Republic of Lithuania (LRES, Nr. IX-2135) Art. 81, as amended by Law No. XV-815 (2026-04-16, TAR 2026-04-21, in force 2026-07-01) + Law on Legal Protection of Personal Data (ADTAĮ) + Regulation (EU) 2016/679 (GDPR)",
      url: "https://vdai.lrv.lt/",
      jurisdiction: "LT",
      subRegime: "LT-EPRIVACY",
      dataLastUpdated: "2026-09-01",
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
      // LRES Art. 81(2) soft opt-in: own similar goods/services,
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
