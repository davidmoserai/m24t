import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Bulgaria: GDPR + ePrivacy (Dir. 2002/58/EC) transposed via TWO
// separate national statutes:
//   • Electronic Commerce Act (ZET) Art. 6 — unsolicited commercial
//     communications generally (consumer consent + KZP opt-out register
//     for legal persons)
//   • Electronic Communications Act (ZES) Art. 261 — direct marketing
//     via calls/SMS/email (transposes ePrivacy Art. 13, including the
//     "own similar products/services" soft opt-in in ал. 2)
// Regulator: KZLD (cpdp.bg). Express prior consent required for
// e-marketing to consumers (ZET чл. 6 ал. 4 + ZES чл. 261 ал. 1).
// However ZES чл. 261 ал. 2 DOES contain the ePrivacy Art. 13(2)
// "own similar products/services" soft opt-in carve-out — a correction
// from earlier data that stated Bulgaria had not transposed it.
// Sources fetched 2026-09-01:
//   • ZET PDF (Ministry of Innovation): https://www.mi.government.bg/file/2015/09/zet_bg.pdf
//   • ZES PDF (Communications Regulation Commission): https://crc.bg/files/_bg/ZES_2015.pdf
//   • ZZLD PDF (aref.government.bg, consolidated to June 2025)
export const BG: CountryData = {
  code: "BG",
  regime: "GDPR+ePrivacy",
  defaults: {
    canCollectForMarketing: true,
    // ZET чл. 6 ал. 4 (verbatim, fetched 2026-05-03):
    // "Забранява се изпращането на непоискани търговски съобщения на
    //  потребители без предварителното им съгласие."
    // (Sending unsolicited commercial messages to consumers without
    //  their prior consent is prohibited.)
    // https://exlege.bg/normi/zet
    optIn: "express",
    checkboxRequired: true,
    // GDPR Art. 7(2) + EDPB guidance — consent must be unbundled.
    bundlingAllowed: false,
    // CJEU Planet49; GDPR Recital 32 — pre-ticked boxes invalid.
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    // CORRECTED 2026-09-01: Bulgaria DOES have a statutory soft opt-in
    // via ZES чл. 261 ал. 2 (verbatim from crc.bg ZES PDF):
    // "Всяко лице, което е получило при търговска сделка за
    //  предоставяне на продукти или услуги данни, чрез които може да
    //  бъде осъществен контакт с потребителя по електронен път, може
    //  да използва тези данни за изпращане на съобщение за маркетинг
    //  и реклама на негови собствени сходни продукти или услуги, като
    //  дава възможност на всеки потребител безвъзмездно и по лесен
    //  начин: 1. да изразява несъгласие в момента на сключване на
    //  сделката; 2. да изрази несъгласие с бъдещо получаване на
    //  подобни съобщения, когато това не е направено в момента на
    //  сключване на сделката."
    // → Classic ePrivacy Art. 13(2) "own similar products/services"
    //   carve-out; opt-out must be offered at collection AND in every
    //   subsequent message. Overridden per-relationship below.
    softOptInAvailable: true,
    softOptInScope: "similar-products",
    requiresCallerSimilarityAssertion: true,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      // ZET чл. 6 ал. 2 (verbatim from mi.government.bg ZET PDF,
      // fetched 2026-09-01):
      // "Комисията за защита на потребителите води електронен регистър
      //  на електронните адреси на юридическите лица, които не желаят
      //  да получават непоискани търговски съобщения, по ред, определен
      //  с наредба на Министерския съвет."
      // ал. 3: "Забранява се изпращането на непоискани търговски
      //  съобщения на електронни адреси, вписани в регистъра по ал. 2."
      // ал. 4 (consumer prohibition) applies only to потребители
      //  (consumers). Legal persons are otherwise fair game unless
      //  listed on the КЗП opt-out register — an opt-out-based regime
      //  closer in shape to CAN-SPAM than to a "publicly-disclosed"
      //  deemed-address model, but the mailregime enum set has no
      //  dedicated "opt-out-register" tag — closest available is
      //  "publicly-disclosed" (kept for enum stability); conditions[]
      //  carries the real mechanism. Employee personal work mailboxes
      //  remain personal data under GDPR.
      regime: "publicly-disclosed",
      conditions: [
        "Legal persons may register email addresses with КЗП (Commission for Consumer Protection) to refuse unsolicited commercial communications (ZET чл. 6 ал. 2)",
        "Sending to addresses on the КЗП register is prohibited (ZET чл. 6 ал. 3)",
        "ZET чл. 6 ал. 4 consumer-consent prohibition does not extend to legal persons; effectively an opt-out-register regime",
        "Employee personal work addresses still require a GDPR basis",
      ],
    },
    // No primary-source quote located for a Bulgarian-language
    // requirement specific to e-marketing consent; GDPR Art. 12
    // (intelligible language) applies. Marked best-effort.
    consentLanguage: { required: ["bg"], mustMatchUserLocale: true },
    dataResidency: { storageRegion: "eu", crossBorderTransferMechanism: "scc" },
    consentRecordRetentionMonths: 36,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    // ZET Art. 4 (information society services) — provider identity,
    // registered seat / address, contact details must be made available.
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // ZZLD чл. 25в (verbatim, fetched 2026-05-03):
    // "Обработването на данни на субект на данни - лице, ненавършило
    //  14 години, въз основа на съгласие по смисъла на чл. 4, т. 11
    //  от Регламент (ЕС) 2016/679 ... е законосъобразно само ако
    //  съгласието е дадено от упражняващия родителски права родител
    //  или от настойника на субекта на данните."
    // → Bulgaria's GDPR Art. 8 digital age of consent = 14.
    // https://exlege.bg/normi/zzld
    childAgeOfConsent: 14,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Regulation (EU) 2016/679 (GDPR) + Directive 2002/58/EC (ePrivacy) + Bulgarian Electronic Commerce Act (ZET) Art. 6 + Personal Data Protection Act (ZZLD)",
      url: "https://www.cpdp.bg/en/",
      jurisdiction: "BG",
      subRegime: "BG-ZET",
      dataLastUpdated: "2026-05-03",
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
    // Bulgaria did NOT transpose ePrivacy Art. 13(2) soft opt-in into
    // ZET. ZET чл. 6 ал. 4 requires prior consent for any unsolicited
    // commercial email to consumers, with no statutory carve-out for
    // existing customers / similar own products. Relationship therefore
    // does not unlock soft opt-in. (Verified against exlege.bg 2026-05-03.)
  },
}
