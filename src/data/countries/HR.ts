import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Croatia: GDPR (Regulation 2016/679) + Act on Implementation of GDPR
// (Zakon o provedbi Opće uredbe o zaštiti podataka, NN 42/2018) +
// Electronic Communications Act (Zakon o elektroničkim komunikacijama,
// "ZEK", NN 76/2022, with amendments NN 14/2024, NN 45/2026) which
// transposes the ePrivacy Directive 2002/58/EC. Regulator: AZOP
// (Agencija za zaštitu osobnih podataka). ZEK Art. 50 ("Neželjene
// elektroničke komunikacije") governs unsolicited electronic
// communications: prior express consent (privola) for natural persons
// (Art. 50(1)); soft opt-in for existing customers re similar own
// products/services with clear free opt-out at collection and in every
// message (Art. 50(2)); Art. 50(4) explicitly disapplies Art. 50(1) and
// (2) to communications toward legal persons. AZOP enforces consent +
// data protection; HAKOM (telecom regulator) co-supervises ZEK. The HR
// GDPR-impl Act sets the child age of consent for information society
// services at 16 (Art. 19(1) of NN 42/2018). Verified 2026-07-01 against
// narodne-novine.nn.hr primary text of NN 76/2022 and NN 42/2018.
export const HR: CountryData = {
  code: "HR",
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
      // ZEK Art. 50(1)/(2) apply to natural persons; Art. 50(4)
      // expressly disapplies those paragraphs to communications to
      // legal persons ("ne primjenjuju se ... prema pravnim osobama u
      // svrhu izravne promidžbe i prodaje"). Legal-person addressees
      // therefore fall outside the ePrivacy consent regime, but GDPR
      // still applies to any identifiable individual (named mailbox,
      // employee). Treat as GDPR-LIA with documented balancing test.
      regime: "gdpr-lia",
      conditions: [
        "ZEK Art. 50(1) express-consent rule applies to natural-person end users",
        "ZEK Art. 50(4) disapplies Art. 50(1)-(2) to communications to legal persons; GDPR still applies to identifiable individuals",
        "Generic role addresses (info@, sales@) treated lighter under HAKOM/AZOP practice; document LIA",
      ],
    },
    consentLanguage: {
      // AZOP requires consent and privacy notices to be intelligible to
      // the data subject. For HR-resident subjects, Croatian is expected
      // for B2C marketing; bilingual HR + EN acceptable.
      required: ["hr"],
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
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: true,
    },
    reConsentTriggerMonths: 24,
    // HR Act on Implementation of GDPR Art. 19: child age of consent
    // for information society services set at 16 (NOT lowered to 13).
    childAgeOfConsent: 16,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Verified 2026-07-01 against primary source at narodne-novine.nn.hr.
      // The consolidated ZEK is NN 76/2022 with amendments NN 14/2024 and
      // NN 45/2026. The unsolicited-communications rule is Art. 50, NOT
      // Art. 152 (Art. 152 governs number portability). Art. 19(1) of the
      // GDPR-Implementation Act (NN 42/2018) sets child consent at 16.
      statute: "Regulation (EU) 2016/679 (GDPR) + Zakon o provedbi Opće uredbe o zaštiti podataka (NN 42/2018) Art. 19 + Zakon o elektroničkim komunikacijama (NN 76/2022, NN 14/2024, NN 45/2026) Art. 50",
      url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2022_07_76_1116.html",
      jurisdiction: "HR",
      subRegime: "HR-ZEK",
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
      // ZEK Art. 50(2) soft opt-in: email addresses obtained from own
      // customers in the context of a sale of a product/service may be
      // used for direct promotion of own similar products or services,
      // provided customers have a clear and unambiguous opportunity to
      // object free of charge, both at collection and in every message,
      // and the customer has not objected up front.
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
