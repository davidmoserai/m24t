import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Turkey: Law No. 6698 on the Protection of Personal Data (KVKK) +
// Law No. 6563 on the Regulation of Electronic Commerce + IYS
// (İleti Yönetim Sistemi) Regulation. Marketing email/SMS to natural
// persons requires PRIOR EXPRESS CONSENT registered in the central
// IYS database before any commercial electronic message is sent
// (Law 6563 Art. 6; IYS Regulation). Senders must verify consent
// against IYS before each send and provide an IYS-recognised
// unsubscribe channel. Regulators: KVKK (kvkk.gov.tr) for personal
// data; Ministry of Trade (ticaret.gov.tr) for 6563/IYS enforcement.
// IYS registration creates a confirmation step similar in practice
// to DOI but Law 6563 itself requires only "express" prior consent.
export const TR: CountryData = {
  code: "TR",
  regime: "KVKK",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email", "sms"],
    unsubscribeMechanism: "one-click",
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      // Law 6563 Art. 6: tradesmen (esnaf) and merchants (tacir)
      // registered in the trade registry may be sent commercial
      // electronic messages without prior consent — opt-out regime.
      // Still must be registered in IYS and honour rejection.
      regime: "publicly-disclosed",
      conditions: [
        "Recipient is a tacir/esnaf registered in trade registry (Law 6563 Art. 6)",
        "Sender registers contact and message in IYS",
        "Recipient may opt out at any time via IYS",
      ],
    },
    consentLanguage: { required: ["tr"], mustMatchUserLocale: true },
    dataResidency: {
      // KVKK Art. 9 (as amended by Law 7499, published 12 March 2024
      // in Resmî Gazete No. 32487, in force 1 June 2024): new tiered
      // GDPR-aligned regime. Primary routes: (1) Board adequacy
      // decision (yeterlilik kararı); (2) appropriate safeguards —
      // Board-published standard contracts (standart sözleşme),
      // binding corporate rules, int'l agreements, or Board-approved
      // written undertakings; (3) exceptional/one-off (arızi) cases
      // including informed explicit consent as risk-disclosed. For
      // ongoing marketing data flows the practical route is the
      // Board's standart sözleşme — closest enum is "scc". See
      // https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim
      storageRegion: "local",
      crossBorderTransferMechanism: "scc",
    },
    consentRecordRetentionMonths: 36,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      // Law 6563 Art. 7 + Implementing Regulation: identify sender
      // (MERSIS no. / trade name), provide contact info, and an
      // IYS-recognised rejection channel in every message.
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: true,
    },
    reConsentTriggerMonths: 36,
    // KVKK does not set a specific digital age; Turkish Civil Code
    // sets full capacity at 18. Minors require parental consent for
    // processing of personal data for marketing.
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute:
        "Law No. 6698 on the Protection of Personal Data (KVKK) + Law No. 6563 on the Regulation of Electronic Commerce + Regulation on Commercial Communication and Commercial Electronic Messages (IYS)",
      url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5",
      jurisdiction: "TR",
      subRegime: "TR-IYS",
      // 2026-07-01: re-verified against mevzuat.gov.tr (Law 6563 Art. 6
      // tacir/esnaf carve-out), kvkk.gov.tr (Art. 9 post-Law-7499 tiered
      // transfer regime effective 2024-06-01), and iys.org.tr (mandatory
      // IYS registration for all senders including foreign senders to TR
      // recipients). Cross-border mechanism updated from "explicit-consent"
      // to "scc" to reflect Board standart sözleşme as the primary
      // ongoing-transfer route under amended Art. 9.
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
      // Turkey has NO GDPR/PECR-style soft opt-in for marketing
      // similar products. Law 6563 Art. 6(3) only carves out purely
      // transactional/service messages about goods/services already
      // delivered (use, maintenance, modifications) — that is handled
      // via byContext.transactional. Any actual marketing message,
      // even to an existing customer, requires IYS-registered express
      // prior consent. See https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6563&MevzuatTur=1&MevzuatTertip=5
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
