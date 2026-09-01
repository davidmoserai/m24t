import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Croatia: GDPR (Regulation 2016/679) + Act on Implementation of GDPR
// (Zakon o provedbi Opće uredbe o zaštiti podataka, NN 42/2018) +
// Electronic Communications Act (Zakon o elektroničkim komunikacijama,
// "ZEK", NN 76/2022, with amendments NN 14/2024 and NN 45/2026 — in force
// from 07.05.2026) which transposes the ePrivacy Directive 2002/58/EC.
// Regulator: AZOP (Agencija za zaštitu osobnih podataka). ZEK Art. 50
// ("Neželjene elektroničke komunikacije") governs unsolicited electronic
// communications: Art. 50(1) requires prior obtained consent
// ("prethodno pribavljena privola") for use of automated calling/comm
// systems, fax or e-mail (incl. SMS/MMS) for direct marketing; Art. 50(2)
// is the soft opt-in — a trader may use e-mail addresses collected from
// its own customers for direct marketing of its own similar products or
// services, provided the customer has a clear, free and simple objection
// mechanism both at collection and in every message; Art. 50(4) exempts
// communications to legal persons (pravne osobe) from Art. 50(1)–(2).
// AZOP enforces consent + data protection; HAKOM (telecom regulator)
// co-supervises ZEK. The HR GDPR-impl Act sets the child age of consent
// for information society services at 16 (Art. 19 of NN 42/2018).
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
      // ZEK Art. 50(1)–(2) protections apply to end users / consumers
      // who are natural persons. Art. 50(4) explicitly disapplies
      // Art. 50(1) and (2) to communications directed to legal persons
      // (pravne osobe) for direct marketing purposes, but GDPR still
      // applies to any identifiable individual recipient (named role
      // mailbox, employee). Treat as GDPR-LIA with documented LIA.
      regime: "gdpr-lia",
      conditions: [
        "ZEK Art. 50(1) prior-consent rule applies to natural-person end users",
        "ZEK Art. 50(4): Art. 50(1) and (2) do NOT apply to communications to legal persons for direct marketing",
        "GDPR still applies to any identifiable individual behind a role address (info@, sales@); document LIA",
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
      statute: "Regulation (EU) 2016/679 (GDPR) + Zakon o provedbi Opće uredbe o zaštiti podataka (NN 42/2018) čl. 19 + Zakon o elektroničkim komunikacijama (NN 76/2022, NN 14/2024, NN 45/2026) čl. 50 (Neželjene elektroničke komunikacije)",
      url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2022_07_76_1116.html",
      jurisdiction: "HR",
      subRegime: "HR-ZEK",
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
    "existing-customer": {
      // ZEK Art. 50(2) soft opt-in: a trader may use e-mail addresses
      // collected from its own customers in the context of a sale of a
      // product/service to market its own SIMILAR products/services,
      // provided the customer has a clear, free and simple opportunity
      // to object both at the time of collection and on receipt of
      // every message (unless already refused at collection).
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
    },
  },
}
