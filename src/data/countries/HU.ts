import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Hungary: GDPR + Act CVIII of 2001 on Electronic Commerce Services
// (Ekertv.) + Act XLVIII of 2008 on Essential Conditions and Certain
// Limitations of Business Communication (Grtv.) + Act CXII of 2011 on
// the Right of Informational Self-Determination and Freedom of
// Information (Infotv.). Direct marketing email requires express prior
// consent under Grtv. §6(1) ("előzetesen egyértelműen és kifejezetten
// hozzájárult"). NAIH is the supervisory authority and has issued
// repeated decisions confirming opt-in is mandatory and pre-checked
// boxes are invalid. Grtv. §6(4) is a narrow postal-mail carve-out
// (addressed advertising mail may be sent without prior consent with
// opt-out); it does NOT apply to email or equivalent electronic means.
// Sender identification for information-society-service providers is
// governed by Ekertv. §4 (name/seat/contact) and Ekertv. §14/A(1) (real
// sender must be disclosed in electronic advertising sent by email).
// Hungary kept the GDPR Article 8 default digital age of consent at 16
// (no lowering rule was issued under Infotv.).
export const HU: CountryData = {
  code: "HU",
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
      // Grtv. §6(1): direct marketing to a natural person — including a
      // sole trader or named employee at a business address — via email
      // or equivalent electronic means requires prior express consent
      // ("előzetesen egyértelműen és kifejezetten hozzájárult"). Generic
      // role addresses (info@, sales@) at a registered legal entity
      // fall outside Grtv.'s "természetes személy" scope and are
      // commonly handled under GDPR legitimate interest with a clear
      // opt-out.
      regime: "function-address",
      conditions: [
        "Grtv. §6(1): named natural persons (incl. sole traders, employees) require prior express consent for email/electronic direct marketing regardless of business context",
        "Generic role addresses at legal entities may rely on GDPR Art. 6(1)(f) legitimate interest with documented LIA and clear opt-out",
      ],
    },
    consentLanguage: { required: ["hu"], mustMatchUserLocale: false },
    dataResidency: { storageRegion: "eu", crossBorderTransferMechanism: "scc" },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      // Ekertv. §4 requires the information-society-service provider to
      // publish name, seat/address and contact details. Ekertv. §14/A(1)
      // additionally requires that electronic advertising sent by email
      // (or equivalent means) disclose the real sender's identity and
      // be clearly recognisable as advertising.
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Hungary did not enact a lowering rule under Infotv., so the GDPR
    // Article 8 default digital age of consent (16) applies for
    // information-society services offered to minors.
    childAgeOfConsent: 16,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Act CVIII of 2001 (Ekertv.) §§4, 14, 14/A + Act XLVIII of 2008 (Grtv.) §6(1) + Act CXII of 2011 (Infotv.) + Regulation (EU) 2016/679 (GDPR)",
      url: "https://njt.hu/jogszabaly/2008-48-00-00",
      jurisdiction: "HU",
      subRegime: "HU-GRTV",
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
    // Grtv. has NO general soft opt-in for existing customers — unlike
    // PECR/UK or many EU member states' ePrivacy implementations,
    // Hungary requires fresh express consent under §6(1) for every
    // direct marketing message to a natural person, regardless of
    // prior commercial relationship. Existing customers therefore
    // collapse back to the default express-consent regime.
    "existing-customer": {
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
