import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Finland: GDPR + Laki sähköisen viestinnän palveluista 917/2014 (Electronic
// Communications Services Act, formerly "Tietoyhteiskuntakaari") §§200-203
// — ePrivacy transposition for direct marketing — + Tietosuojalaki 1050/2018.
// Regulator: Tietosuojavaltuutettu (Data Protection Ombudsman, tietosuoja.fi).
// §200(1) "Suoramarkkinointi luonnolliselle henkilölle": direct marketing by
// automated calling systems, fax, email, SMS, voice/sound/picture messages to
// NATURAL PERSONS requires PRIOR CONSENT ("ennalta suostumuksensa"). §200(2):
// existing-customer soft opt-in for the seller's own "same product group" or
// otherwise similar products/services, with clear free opt-out at collection
// and in every subsequent message. §202 "Suoramarkkinointi yhteisölle":
// direct marketing to LEGAL PERSONS (yhteisö) is OPT-OUT — permitted unless
// the recipient has refused, but every message must offer a free, easy
// opt-out. §203: marketing nature must be clearly and unambiguously
// recognisable at receipt. Tietosuojalaki §5 sets the child age of consent
// for information-society services at 13 (Finland took the GDPR Art. 8
// floor).
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
      // §202 (Suoramarkkinointi yhteisölle): direct marketing to legal
      // persons is permitted unless the recipient has separately refused
      // it — opt-out, not opt-in. Named natural-person addresses at a
      // company still fall under §200(1) consent unless the person's
      // position is essentially linked to the goods/services being
      // marketed (Ombudsman's "position-linked" function-address rule).
      // Generic role addresses (info@, sales@) are treated as legal-person
      // addresses. Verified 2026-07-01 vs 917/2014 §§200, 202 and
      // tietosuoja.fi FAQ.
      regime: "function-address",
      conditions: [
        "§202 — marketing to legal persons (yhteisö) is opt-out; every message must offer free easy opt-out",
        "named natural-person addresses at a company (firstname.lastname@co.fi) still require §200(1) consent unless the role is essentially linked to the marketed goods/services",
        "every message must offer a free, simple opt-out mechanism",
        "sender identity and marketing nature must be clearly recognisable (§203)",
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
      // §203 (Suoramarkkinoinnin tunnistaminen): messages sent under §§200
      // and 202 must be clearly and unambiguously recognisable as marketing
      // at receipt; sender must be identifiable. Verified 2026-07-01.
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Tietosuojalaki 1050/2018 §5 (verified 2026-07-01 vs finlex.fi):
    // consent-based processing of a child's data for information-society
    // services offered directly to the child is lawful "jos lapsi on
    // vähintään 13-vuotias" — Finland used the GDPR Art. 8 floor of 13.
    childAgeOfConsent: 13,
    parentalVerificationRequired: false,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      // Statute names verified against finlex.fi 2026-07-01: primary title is
      // now "Laki sähköisen viestinnän palveluista" (917/2014); the older
      // "Tietoyhteiskuntakaari" name is retained parenthetically for
      // continuity. §§200-203 govern direct marketing; §5 of Tietosuojalaki
      // sets child consent at 13.
      statute: "GDPR (EU 2016/679) + Laki sähköisen viestinnän palveluista 917/2014 §§200-203 (formerly Tietoyhteiskuntakaari) + Tietosuojalaki 1050/2018 §5",
      url: "https://tietosuoja.fi/en/faq-direct-marketing",
      jurisdiction: "FI",
      subRegime: "FI-SVPL",
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
    // §200(2): existing-customer soft opt-in for the seller's own products
    // in the "same product group or otherwise similar" (samaan tuoteryhmään
    // kuuluvien tai muuten vastaavien). Address must have been obtained in
    // the context of a sale, opt-out must be offered at collection AND in
    // every subsequent message. Verified 2026-07-01.
    "existing-customer": {
      softOptInAvailable: true,
      softOptInScope: "similar-products",
      requiresCallerSimilarityAssertion: true,
      optIn: "single",
      suggestedTemplate: "single-opt-in",
    },
    // §202: legal-person recipients — opt-out regime. Verified 2026-07-01.
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
