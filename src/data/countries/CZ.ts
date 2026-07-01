import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Czech Republic: GDPR + Act No. 480/2004 Coll. on Certain Information
// Society Services (transposes ePrivacy Art. 13) + Act No. 110/2019 Coll.
// on Personal Data Processing. Regulator: Úřad pro ochranu osobních
// údajů (ÚOOÚ). 480/2004 §7(2) requires prior consent for commercial
// communications ("předchozí souhlas"), with a narrow soft opt-in in
// §7(3) for existing customers ("obdobných výrobků nebo služeb" +
// clear free-of-charge opt-out at collection and in every message).
// 480/2004 §7(4) requires the message to be clearly labelled as a
// commercial communication, not conceal sender identity, and carry a
// valid opt-out address. Czech ePrivacy regime applies to BOTH natural
// persons AND legal persons (entrepreneurs/sole traders) — there is no
// general B2B exemption; addresses of legal entities are still covered
// when the recipient is identifiable. Child age of consent under
// 110/2019 §7 is 15 ("dovršením patnáctého roku věku").
// Sources:
//   https://www.zakonyprolidi.cz/cs/2004-480 (Act 480/2004)
//   https://www.zakonyprolidi.cz/cs/2019-110 (Act 110/2019)
//   https://www.uoou.gov.cz/ (ÚOOÚ regulator)
export const CZ: CountryData = {
  code: "CZ",
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
      regime: "none",
      conditions: [
        "Act 480/2004 §2(b) defines electronic contact regardless of natural/legal person — legal entities are NOT exempt",
        "ÚOOÚ guidance: B2B addresses identifying a person (jan.novak@firma.cz) still require consent or soft opt-in",
        "Generic role addresses (info@, sales@) may fall outside personal-data scope but 480/2004 still applies to commercial communications",
      ],
    },
    consentLanguage: { required: ["cs"], mustMatchUserLocale: true },
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
    childAgeOfConsent: 15,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    // 2026-07-01: corrected sender-identification citation from §6 to §7(4)
    // — §6 of Act 480/2004 is safe-harbour / no monitoring duty for ISPs;
    // labelling, non-concealment of sender and valid opt-out address are
    // actually mandated by §7(4)(a)–(c).
    basis: {
      statute: "Regulation (EU) 2016/679 (GDPR) + Act No. 480/2004 Coll. on Certain Information Society Services §7(2) (prior consent for commercial communications), §7(3) (existing-customer soft opt-in — similar products/services) and §7(4) (labelling, sender identification and valid opt-out address) + Act No. 110/2019 Coll. on Personal Data Processing §7 (child age of consent: 15)",
      url: "https://www.zakonyprolidi.cz/cs/2004-480",
      jurisdiction: "CZ",
      subRegime: "CZ-480",
      dataLastUpdated: "2026-07-01",
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
    "existing-customer": {
      // Act 480/2004 §7(3) soft opt-in: address obtained in connection with
      // sale of product/service, similar products only, clear opt-out at
      // each message and at collection.
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
      suggestedTemplate: "single-opt-in",
    },
  },
}
